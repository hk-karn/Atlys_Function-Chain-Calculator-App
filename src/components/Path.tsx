import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getElementCordinates, calculateBezierPath } from "../helpers";

type PathProps = {
  source: string;
  target: string;
};

export const Path = ({ source, target }: PathProps) => {
  const [path, setPath] = useState("");
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

  const calculatePath = () => {
    let [sourceX, sourceY] = getElementCordinates(source);
    let [targetX, targetY] = getElementCordinates(target);

    const connectorWidth = 15;
    const connectorHeight = 15;

    // Move the source and target to the center of the connector
    sourceX = sourceX + connectorWidth / 2;
    sourceY = sourceY + connectorHeight / 2;
    targetX = targetX + connectorWidth / 2;
    targetY = targetY + connectorHeight / 2;

    console.log("sourceX", sourceX, "sourceY", sourceY, "targetX", targetX, "targetY", targetY);
    // Use the helper function for Bezier path calculation
    return calculateBezierPath(sourceX, sourceY, targetX, targetY);
  };

  useEffect(() => {
    const path = calculatePath();
    console.log("path", path);
    setPath(path);
  }, [calculatePath]);

  return createPortal(
    <svg
      style={{
        overflow: "visible",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 5,
      }}
    >
      <path d={path} fill="none" stroke="#0066FF4F" strokeWidth="7" />
    </svg>,
    document.body
  );
};