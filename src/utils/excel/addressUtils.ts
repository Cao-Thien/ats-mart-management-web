import { CellAddress, CellNumbers, CellOrRangeAddress, RangeAddress, RangeNumbers } from './constants';
import { isArray } from 'lodash';

// Convert column to A1 style letter
export const toColLetter = (col: number) => {
  let temp;
  let letter = '';
  while (col > 0) {
    temp = (col - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    col = (col - temp - 1) / 26;
  }
  return letter;
};

// Convert A1 style letter to column number
export const toColNumber = (letter: string) => {
  let column = 0;
  const length = letter.length;
  for (let i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
};

// Convert to A1 style letters from cell address
export const toCellLetters = (colRow: CellAddress) => {
  if (typeof colRow === 'string') {
    return colRow;
  }

  const [col, row] = colRow;
  return toColLetter(col) + row;
};

// Convert to [Row, Column] tuple from cell address
export const toCellNumbers = (address: CellAddress): CellNumbers => {
  if (Array.isArray(address)) {
    return address;
  }

  let hasCol = false;
  // let col = ''; // column address 'AA'
  let colNumber = 0;
  let hasRow = false;
  // let row = ''; // row address '2'
  let rowNumber = 0;

  for (let i = 0, char; i < address.length; i++) {
    char = address.charCodeAt(i);
    // col should before row
    if (!hasRow && char >= 65 && char <= 90) {
      // 65 = 'A'.charCodeAt(0)
      // 90 = 'Z'.charCodeAt(0)
      hasCol = true;
      // col += address[i];
      // colNumber starts from 1
      colNumber = colNumber * 26 + char - 64;
    } else if (char >= 48 && char <= 57) {
      // 48 = '0'.charCodeAt(0)
      // 57 = '9'.charCodeAt(0)
      hasRow = true;
      // row += address[i];
      // rowNumber starts from 0
      rowNumber = rowNumber * 10 + char - 48;
    } else if (hasRow && hasCol && char !== 36) {
      // 36 = '$'.charCodeAt(0)
      break;
    }
  }

  return [rowNumber, colNumber];
};

export const toRangeNumbers = (cellOrRange: CellOrRangeAddress): RangeNumbers => {
  if (isArray(cellOrRange)) {
    return cellOrRange.length > 2 ? (cellOrRange as RangeNumbers) : ([...cellOrRange, ...cellOrRange] as RangeNumbers);
  } else {
    // eslint-disable-next-line prefer-const
    let [startCellLetters, endCellLetters] = cellOrRange.split(':');
    return [...toCellNumbers(startCellLetters), ...toCellNumbers(endCellLetters ? endCellLetters : startCellLetters)];
  }
};

export const getRowNumber = (cellOrRow: CellAddress | number) =>
  typeof cellOrRow === 'number' ? cellOrRow : toCellNumbers(cellOrRow)[0];

export const getColNumber = (cellOrCol: CellAddress | number) =>
  typeof cellOrCol === 'number' ? cellOrCol : toCellNumbers(cellOrCol)[1];

export const isRange = (cellOrRange: CellOrRangeAddress): cellOrRange is RangeAddress =>
  Array.isArray(cellOrRange) ? cellOrRange.length > 2 : cellOrRange.includes(':');
