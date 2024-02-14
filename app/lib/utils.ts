import { Dispatch, SetStateAction } from "react";
import {
  cellCoords,
  cellProps,
  flagsAmountProps,
  settingsProps,
} from "./types";
import { addNewRecord } from "./store/reducers/ResultsSlice";

function shuffleArray(arr: cellProps[]) {
  for (let i = arr.length - 1; i > -1; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createGameCells(settings: settingsProps = {
  level: 'easy',
  width: 8,
  height: 8,
  cellsAmount: 64,
  bombsAmount: 10,
}) {

  let cells: cellProps[] = [];
  for (let i = 0; i < settings.cellsAmount; i++) { // Заполняем массив дефолтными значениями ячеек
    cells.push({
      content: 0,
      x: 0,
      y: 0,
      highlight: false,
      opened: false,
      timer: 0,
      bomb: false,
      status: [
        {
          status: "none",
          isActive: true,
        },
        {
          status: "flag",
          isActive: false,
        },
        {
          status: "unknown",
          isActive: false,
        },
      ],
      nextStatus() {
        let cur = this.status.find((item) => item.isActive)!;
        let index = this.status.indexOf(cur);
        this.status[index].isActive = false;
        this.status[(index + 1) % 3].isActive = true;
      },
      setDefaultStatus() {
        if (!this.status[0].isActive) {
          this.status.forEach(i => i.isActive = false)
          this.status[0].isActive = true
        }
      }
    });
  }

  for (let i = 0; i < settings.bombsAmount; i++) { // Добавляем бомбы в начало массива
    cells[i].bomb = true;
  }

  cells = shuffleArray(cells); // Перетасовываем бомбы в массиве

  for (let i = 0; i < settings.cellsAmount; i++) { // Добавляем координаты
    cells[i].x = i % settings.width;
    cells[i].y = Math.floor(i / settings.width)
  }

  cells = addContent(cells);

  return cells;
}

function middleButtonDown(cell: cellProps, gameCells: cellProps[],setGameState: Dispatch<SetStateAction<string>>, setWasClick: Dispatch<SetStateAction<boolean>>,flagsCount:flagsAmountProps,setFlagsCount:Dispatch<SetStateAction<flagsAmountProps>>) {
  cell.timer = Date.now()
  let neighboringCells:cellProps[] = findNeigboringCells(cell, gameCells)
  neighboringCells.filter(cell => !cell.status[1].isActive)
  neighboringCells.forEach(cell => cell.highlight = true)
  addEventListener("mouseout", () => {
    neighboringCells.forEach(cell => cell.highlight = false)
  });
  addEventListener("mouseup", () => {
    let timeEnd = Date.now()
    neighboringCells.forEach(cell => cell.highlight = false)
    let bombsCountAround = neighboringCells.filter(cell => cell.bomb).length
    let flagsCountAround = neighboringCells.filter(cell => cell.status[1].isActive).length
    if (timeEnd - cell.timer < 1000 && bombsCountAround === flagsCountAround) {
      neighboringCells.forEach(cell => {
        if (!cell.status[1].isActive) {
          cell.opened = true
          cell.setDefaultStatus()
        }
        if (cell.bomb && !cell.status[1].isActive) {
          setGameState("lose")
          setWasClick(false)
        }
      })
    }
    const same = {...flagsCount} 
    setFlagsCount(same)
  });
  const same = {...flagsCount} // Просто костыль для избавления от задержки, которая появляется при 
  setFlagsCount(same)         // нажатии на ячейку, причину которой я так и не смог выяснить
}

function findNeigboringCells(cell:cellProps, gameCells:cellProps[]) {
  let cells:cellProps[] = []
  gameCells.forEach((otherCell) => {
    if (
      Math.abs(otherCell.x - cell.x) <= 1 &&
      Math.abs(otherCell.y - cell.y) <= 1 &&
      (otherCell.x !== cell.x || otherCell.y !== cell.y)
    ) {
      cells.push(otherCell)
    }
  });
  return cells
}

function addContent(cells: cellProps[]) {
  cells.forEach((cell) => {
    cell.bomb ? (cell.content = 0) : (cell.content = countBombs(cell, cells));
  });
  return cells;
}

function countBombs(cell: cellProps, cells: cellProps[]) {
  let content = 0;
  cells.forEach((otherCell) => {
    if (
      otherCell.bomb &&
      Math.abs(otherCell.x - cell.x) <= 1 &&
      Math.abs(otherCell.y - cell.y) <= 1 &&
      (otherCell.x !== cell.x || otherCell.y !== cell.y)
    ) {
      content++;
    }
  });
  return content;
}

function findCell(cell: cellProps, cells: Set<cellCoords>) {
  let target;
  cells.size &&
    cells.forEach((item) => {
      if (item.x === cell.x && item.y === cell.y) target = item;
    });            
  return target;   
}                  

function openCell( 
  settings: settingsProps,
  cell: cellProps,
  gameCells: cellProps[],
  setGameCells: Dispatch<SetStateAction<cellProps[]>>,
  setGameState: Dispatch<SetStateAction<string>>,
  cellsNearby: Set<cellCoords>,
  dispatch: any,
  timer: number,
  wasClick:boolean,
  setWasClick: Dispatch<SetStateAction<boolean>>,
  flagsCount:flagsAmountProps,
  setFlagsCount: Dispatch<SetStateAction<flagsAmountProps>>,
) {
  if (!wasClick && cell.bomb) {
    let copy = [...gameCells]
    let indexCur = gameCells.indexOf(cell)
    let indexWithoutBomb = gameCells.findIndex(cell => !cell.bomb);
    [copy[indexCur],copy[indexWithoutBomb]] = [copy[indexWithoutBomb],copy[indexCur]]
    for (let i = 0; i < settings.cellsAmount; i++) {
      copy[i].x = i % settings.width;
      copy[i].y = Math.floor(i / settings.width)
    }
    copy = addContent(copy); 
    setGameCells(copy)
    cell = copy[indexCur]
    setWasClick(true)
  } 
  setWasClick(true)
  cellsNearby.add({ x: cell.x, y: cell.y }); // Добавляем ячейку в коллекцию ячеек квадрата 3 на 3, центром которого является ячейка, по которой кликнули
  if (!cell.content && !cell.bomb) {
    // Если сама ячейка и (!) её соседние ячейки (content === 0) не содержат бомб
    gameCells
      .filter(
        // Фильтруем, оставляя только соседние ячейки
        (item) =>
          Math.abs(item.x - cell.x) <= 1 &&
          Math.abs(item.y - cell.y) <= 1 &&
          (cell.x !== item.x || cell.y !== item.y)
      )
      .forEach((cellItem) => {
        if (!findCell(cellItem, cellsNearby)) {
          // Если по этой ячейке ещё не проходили (иначе она лежит в 'cellsNearby')
          openCell(
            settings,
            cellItem,
            gameCells,
            setGameCells,
            setGameState,
            cellsNearby,
            dispatch,
            timer,
            wasClick,
            setWasClick,
            flagsCount,
            setFlagsCount,
          );
        }
      });
  }

  cell.opened = true
  cell.setDefaultStatus()
  if (gameCells.filter(cell => !cell.opened).length === settings.bombsAmount) {
    // Если количество закрытых ячеек равно количеству бомб (все ячейки без бомб открыты)
    setGameState("win")
    setWasClick(false)
    dispatch(addNewRecord({timer}))
  }
  if (cell.bomb) {
    // Если ячейка, по которой (!) кликнули, содержит бомбу
    setGameState("lose");
    setWasClick(false)
  }
  const same = {...flagsCount} // Просто костыль для избавления от задержки, которая появляется при 
  setFlagsCount(same)         // нажатии на ячейку, причину которой я так и не смог выяснить
}

function updateStatus(
  cell: cellProps,
  settings: settingsProps,
  flagsCount: flagsAmountProps,
  setFlagsCount: Dispatch<SetStateAction<flagsAmountProps>>,
  setGameState: Dispatch<SetStateAction<string>>,
  dispatch: any,
  timer: number,
  setWasClick: Dispatch<SetStateAction<boolean>>
) {
  cell.nextStatus(); //  -> [none, flag, unknown] ->
  const newState = { ...flagsCount };
  const curStatus = cell.status.find((item) => item.isActive)!.status;
  switch (curStatus) {
    case "none":
      break;
    case "flag": // Если поставили флаг
      newState.all++;
      cell.bomb ? newState.withBomb++ : "";
      break;
    case "unknown": // Если поставили "?" и, тем самым, убрали флаг
      newState.all--;
      cell.bomb ? newState.withBomb-- : "";
      break;
  }
  if (
    newState.all === newState.withBomb &&
    newState.withBomb === settings.bombsAmount
  ) {
    setGameState("win");
    setWasClick(false)
    dispatch(addNewRecord({timer}))
  }
  setFlagsCount(newState); //! ИМЕННО ЭТА СТРОКА! Если именно её закомментировать - смена статуса правой кнопкой мыши обретёт задержку (которая была при openCell, middleButtonDown и middleButtonUp)
} // (понимаю, что дёргаю компонент Game, но как это связано с задержкой - не знаю)
export {
  createGameCells,
  updateStatus,
  openCell,
  middleButtonDown,
  findCell,
};
