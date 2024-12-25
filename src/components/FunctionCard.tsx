import React from "react";
import { ChevronDownIcon, DragDropIcon } from "./icons";
import { Path } from "./Path";
import { FunctionConnector } from "./FunctionConnector";

type FunctionCardProps = {
  id: number;
  currentFunctionName: string;
  nextFunctionName?: string;
  nextFunctionId?: number;
  equation: string;
  setFunctionEquation: (id: number, equation: string) => void;
};

export const FunctionCard = ({
  id,
  currentFunctionName,
  nextFunctionName,
  nextFunctionId,
  equation,
  setFunctionEquation,
}: FunctionCardProps) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Allow only x, numbers, and operators
    const regex = /^[0-9x+\-*/.^]*$/;

    if (regex.test(inputValue)) {
      setFunctionEquation(id, inputValue); // Update value if valid
    }
  };

  return (
    <>
      <div
        id={`card-${id}`}
        className="w-[235px] h-[251px] pt-3 px-4 pb-[18px] border border-[#DFDFDF] rounded-[15px] drop-shadow-[0_0_6px_0_black]"
      >
        <div className="flex gap-[7px] items-center">
          <DragDropIcon />
          <div className="text-base font-semibold text-[#a5a5a5] leading-[16.94px]">
            Function: {currentFunctionName}
          </div>
        </div>
        <div className="flex flex-col gap-[4px] mt-4 text-sm text-[#252525] font-medium ">
          <label className="text-left leading-[14.52px]">Equation</label>
          <input
            className="w-full h-[33px] border border-[#D3D3D3] px-[11px] py-[9px] rounded-[8px] bg-white leading-[14.52px]"
            type="text"
            value={equation}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-[4px] mt-[17px] text-sm text-[#252525] font-medium">
          <label className="text-left leading-[14.52px]">Next Function</label>
          <div className="relative">
            <input
              className="w-full h-[33px] border border-[#D3D3D3] px-[11px] py-[9px] rounded-[8px] bg-white disabled:bg-[#f5f5f5] leading-[14.52px] opacity-30"
              type="text"
              value={
                nextFunctionName ? `Function: ${nextFunctionName}` : "..."
              }
              disabled={true}
            />
            <span className="absolute top-[9px] right-[10px]">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        <div className="mt-[45px] flex justify-between leading-[12.1px]">
          <div className="flex gap-1">
            <FunctionConnector id={`card${id}-input__connector`} />
            <span className="text-[#585757] text-xs font-semibold">
              input
            </span>
          </div>

          <div className="flex gap-1">
            <span className="text-[#585757] text-xs font-semibold">
              output
            </span>
            <FunctionConnector id={`card${id}-output__connector`} />
          </div>
        </div>
      </div>
      {id && nextFunctionId && (
        <Path
          source={`card${id}-output__connector`}
          target={`card${nextFunctionId}-input__connector`}
        />
      )}
    </>
  );
};