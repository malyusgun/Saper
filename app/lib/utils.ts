import { Dispatch, MouseEvent, SetStateAction } from "react";
import {
  cellCoords,
  cellProps,
  flagsAmountProps,
  settingsProps,
} from "./types";

function shuffleArray(arr: cellProps[]) {
  for (let i = arr.length - 1; i > -1; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createBackCells(settings: settingsProps) {
  let cells: cellProps[] = [];
  for (let i = 0; i < settings.cellsAmount; i++) {
    cells.push({
      content: 0,
      x: 0,
      y: 0,
      opened: false,
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
    });
  }
  for (let i = 0; i < settings.bombsAmount; i++) {
    cells[i].bomb = true;
  }
  cells = shuffleArray(cells); // Перетасовываем бомбы в массиве
  for (let i = 0; i < settings.cellsAmount; i++) {
    cells[i].x = i % settings.width;
    cells[i].y = Math.floor(i / settings.width)
  }
  cells = addContent(cells); // Добавляем числа-количество бомб вокруг
  return cells;
}

function createFrontCells(
  settings: settingsProps,
  backCells: cellProps[]
): Set<cellCoords> {
  let cells: Set<cellCoords> = new Set();
  for (let i = 0; i < settings.cellsAmount; i++) {
    cells.add({
      x: backCells[i].x,
      y: backCells[i].y,
    });
  }
  return cells;
}

function editFieldAfterClick() {}

function addContent(cells: cellProps[]) {
  cells.forEach((cell) => {
    cell.bomb ? (cell.content = 0) : (cell.content = countBombs(cell, cells));
  });
  return cells;
}

function countBombs(cell: cellProps, cells: cellProps[]) {
  // return cells.filter((item) => {
  //   item.bomb &&
  //     Math.abs(item.x - cell.x) <= 1 &&
  //     Math.abs(item.y - cell.y) <= 1 &&
  //     (item.x !== cell.x || item.y !== cell.y);
  // }).length;
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

function findFrontCell(cell: cellProps, frontCells: Set<cellCoords>) {
  let target;
  frontCells.size &&
    frontCells.forEach((item) => {
      if (item.x === cell.x && item.y === cell.y) target = item;
    });
  return target;
}

function openCell(
  setFrontCells: Dispatch<SetStateAction<Set<cellCoords>>>,
  cell: cellProps,
  backCells: cellProps[],
  setGameState: Dispatch<SetStateAction<string>>,
  cellsNearby: Set<cellCoords>
) {
  cellsNearby.add({ x: cell.x, y: cell.y }); // Добавляем ячейку в коллекцию ячеек квадрата 3 на 3, центром которого является ячейка, по которой кликнули
  setFrontCells((prev) => {
    const newState = new Set(prev);
    const curFrontCell = findFrontCell(cell, newState);
    newState.delete(curFrontCell!);
    return newState;
  });
  if (!cell.content && !cell.bomb) {
    // Если сама ячейка и (!) её соседние ячейки (content === 0) не содержат бомб
    backCells
      .filter(
        // Фильтруем, оставляя только соседние ячейки
        (item) =>
          Math.abs(item.x - cell.x) <= 1 &&
          Math.abs(item.y - cell.y) <= 1 &&
          (cell.x !== item.x || cell.y !== item.y)
      )
      .forEach((cellItem) => {
        if (!findFrontCell(cellItem, cellsNearby)) {
          // Если по этой ячейке ещё не проходили (иначе она лежит в 'cellsNearby')
          openCell(
            setFrontCells,
            cellItem,
            backCells,
            setGameState,
            cellsNearby
          );
        }
      });
  }
  cell.opened = true
  if (cell.bomb) {
    // Если ячейка, по которой кликнули, содержит бомбу
    setGameState("lose");
  }
}

function updateStatus(
  e: MouseEvent,
  cell: cellProps,
  settings: settingsProps,
  flagsCount: flagsAmountProps,
  setFlagsCount: Dispatch<SetStateAction<flagsAmountProps>>,
  setGameState: Dispatch<SetStateAction<string>>
) {
  e.preventDefault();
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
  }
  setFlagsCount(newState);
}

export {
  createBackCells,
  createFrontCells,
  findFrontCell,
  updateStatus,
  openCell,
};
