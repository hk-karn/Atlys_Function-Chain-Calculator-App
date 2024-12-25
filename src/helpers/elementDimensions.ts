export const elementDimensions = (elementId: string) => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error(`Element with id ${elementId} not found`);
      return [0, 0];
    }

    const height = element.offsetHeight;
    const width = element.offsetWidth;
  
    return [width, height];
  };