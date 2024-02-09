import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { FaBomb } from "react-icons/fa";
import {
  FieldProps,
  cellCoords,
  cellProps,
  flagsAmountProps,
  settingsProps,
} from "../../lib/types";
import { findFrontCell, openCell, updateStatus } from "../../lib/utils";

const Field: React.FC<FieldProps> = ({
  frontCells,
  setFrontCells,
  backCells,
  settings,
  gameState,
  setGameState,
  flagsCount,
  setFlagsCount,
}) => {
  let cellsNearby: Set<cellCoords>;

  return (
    <>
      {backCells.map((cell) => (
        <div
          className={clsx(
            `cell relative inline-block w-[32px] h-[32px] bg-gradient-to-br from-gray-50 to-gray-400 border-4 border-slate-500 border-t-slate-200 border-l-slate-200 border-solid text-center text-base font-bold select-none`,
            {
              "before:hidden": !findFrontCell(cell, frontCells),
              "pointer-events-none": gameState !== "play",
              "cursor-default after:block":
                cell.status.find((i) => i.isActive)?.status !== "none",
              "after:bg-[url('/flag.png')]":
                cell.status.find((i) => i.isActive)?.status === "flag",
              "after:bg-[url('/unknown.png')]":
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
          onClick={() =>
            cell.status.find((item) => item.isActive)?.status === "none"
              ? openCell(
                  settings,
                  setFrontCells,
                  cell,
                  backCells,
                  setGameState,
                  (cellsNearby = new Set())
                )
              : ""
          }
          onContextMenu={(e) => {
            if (!cell.opened)
              return updateStatus(
                e,
                cell,
                settings,
                flagsCount,
                setFlagsCount,
                setGameState
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
