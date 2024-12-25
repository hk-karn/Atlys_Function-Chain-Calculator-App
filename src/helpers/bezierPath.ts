export const bezierPath = (
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number
  ): string => {
    // Adjustments  
    let path = '';
  
    // Case: Input/Output node (nearby nodes)
    if (Math.abs(sourceX - targetX) <= 70 && Math.abs(sourceY - targetY) <= 70) {
      path = `M${sourceX},${sourceY} ${targetX},${targetY}`;
    } else if (Math.abs(sourceX - targetX) <= 30) {
      // Case: Same X-plane (vertical line)
      const controlPointY = (sourceY + targetY) / 2; // Midpoint for vertical control
      path = `M${sourceX},${sourceY} C${sourceX + 40},${controlPointY} ${sourceX + 40},${controlPointY} ${targetX},${targetY}`;
    } else if (Math.abs(sourceY - targetY) <= 30) {
      // Case: Same Y-plane (horizontal line)
      const controlPointX = (sourceX + targetX) / 2; // Midpoint for horizontal control
      path = `M${sourceX},${sourceY} C${controlPointX},${sourceY + 40} ${controlPointX},${sourceY + 40} ${targetX},${targetY}`;
    } else {
      // General case: Diagonal connection
      const controlPointX = (sourceX + targetX) / 2; // Midpoint for control
      path = `M${sourceX},${sourceY} C${controlPointX},${sourceY} ${controlPointX},${targetY} ${targetX},${targetY}`;
    }
  
    return path;
  };
  