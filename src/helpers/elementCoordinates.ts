export const elementCoordinates = (elementId: string) => {
    const element = document.getElementById(elementId);
  
    if (!element) {
      console.error(`Element with id ${elementId} not found`);
      return [0, 0];
    }
  
    const rect = element.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;
  
    return [x, y];
  };