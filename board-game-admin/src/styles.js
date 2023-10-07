import colorPalette from './colorPalette';

export const scrollbarStyles = `
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colorPalette.GRAY3}; 
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${colorPalette.BLUE5}; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colorPalette.BLUE4}; 
  }
`;
