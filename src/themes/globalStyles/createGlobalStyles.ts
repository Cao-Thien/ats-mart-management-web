import scrollbarStyle from './scrollbarStyle';
import resetStyle from './resetStyle';
import dateCalendarStyle from './dateCalendarStyle';

const globalStyles = `
  ${resetStyle}
  
  ${scrollbarStyle}

  ${dateCalendarStyle}
`;

export function createGlobalStyles(additionalStyles?: string[]) {
  return `
    ${globalStyles}
    
    ${(additionalStyles || []).join(' ')}
  `;
}
