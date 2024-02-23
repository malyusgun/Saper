import clsx from "clsx";
import { FaBomb } from "react-icons/fa";
import { FieldProps, cellCoords } from "../lib/types";
import { middleButtonDown, openCell, updateStatus } from "../lib/utils";
import { useAppDispatch } from "../lib/store/redux";

const Field: React.FC<FieldProps> = ({
  gameCells,
  settings,
  gameState,
  setGameCells,
  setGameState,
  flagsCount,
  setFlagsCount,
  timer,
  wasClick,
  setWasClick,anchor, setAnchor
}) => {
  let cellsNearby: Set<cellCoords>;
  const dispatch = useAppDispatch();
  return (
    <>
      {gameCells.map((cell) => (
        <div
          className={clsx(
            `cell relative inline-block w-[14px] h-[14px] border-[1px] md:w-[20px] md:h-[20px] md:border-2 lg:w-[28px] lg:h-[28px] lg:border-[3px] xl:w-[32px] xl:h-[32px] xl:border-4 bg-gradient-to-br from-gray-50 to-gray-400 border-slate-500 border-t-slate-200 border-l-slate-200 border-solid text-center text-xs md:text-sm lg:text-base xl:text-base font-bold select-none after:w-[12px] after:h-[12px] md:after:w-[16px] md:after:h-[16px] lg:after:w-[24px] lg:after:h-[24px]`,
            {
              "before:hidden": cell.opened,
              "before:opacity-50": cell.highlight,
              "pointer-events-none": gameState !== "play",
              "after:hidden": cell.status.find((i) => i.isActive)?.status === "none",
              "cursor-default after:block":
                cell.status.find((i) => i.isActive)?.status !== "none",
              "after:bg-[url('./flag.png')]":
                cell.status.find((i) => i.isActive)?.status === "flag",
              "after:bg-[url('./unknown.png')]":
                cell.status.find((i) => i.isActive)?.status === "unknown",
              "text-transparent": cell.content === 0,
              "text-blue-500": cell.content === 1,
              "text-green-500": cell.content === 2,
              "text-red-500": cell.content === 3,
              "text-blue-800": cell.content === 4,
              "text-amber-800": cell.content === 5,
              "text-teal-400": cell.content === 6,
              "text-black": cell.content === 7,
              "text-white": cell.content === 8,
            }
          )}
          key={Math.random()}
          onMouseDown={(e) => {
            if (e.button === 0) {
              if (cell.status.find((item) => item.isActive)?.status === "none")
                openCell(
                  settings,
                  cell,
                  gameCells,
                  setGameCells,
                  setGameState,
                  (cellsNearby = new Set()),
                  dispatch,
                  timer,
                  wasClick,
                  setWasClick,
                  anchor,
                  setAnchor
                );
            } else if (e.button === 1)
              middleButtonDown(
                cell,
                gameCells,
                setGameState,
                setWasClick,
                anchor,
                setAnchor
              );
          }}
          onContextMenu={(e) => {
            // в mobile вызывается при удержании клика в течение 1 сек
            e.preventDefault();
            if (!cell.opened)
              updateStatus(
                cell,
                settings,
                flagsCount,
                setFlagsCount,
                setGameState,
                dispatch,
                timer,
                setWasClick
              );
          }}
        >
          {cell.bomb ? <FaBomb className="text-black inline" /> : cell.content}
        </div>
      ))}
    </>
  );
};

export default Field;
