import { useEffect, useState } from "react";

type FunctionConnectorProps = {
    id: string;
  };

  export const FunctionConnector = ({ id }: FunctionConnectorProps) => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  
    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [windowSize]);
    return (
      <div
        id={id}
        className="flex w-3 h-3 items-center justify-center border border-2 border-[#dbdbdb] rounded-[50%]"
      >
        <div className="w-[7px] h-[7px] bg-[#66a3ff] rounded-[50%]"></div>
      </div>
    );
  };