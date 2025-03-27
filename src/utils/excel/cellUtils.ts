import { getRowNumber, toCellNumbers } from './addressUtils';
import { Worksheet, Cell, CellValue, CellStyle, CellAddress, RowStyle, CellProps, RangeAddress } from './constants';

// Set value to cell or cell range.
// If position is cell range, it will be merged
export const setCell = (worksheet: Worksheet, cellAddr: CellAddress, value?: CellValue, style?: Partial<CellStyle>) => {
  let cell: Cell;

  if (Array.isArray(cellAddr)) {
    cell = worksheet.getCell(cellAddr[0], cellAddr[1]);
  } else {
    cell = worksheet.getCell(cellAddr);
  }

  if (value !== undefined) cell.value = value;

  if (style !== undefined) mergeStyle(cell, style);
  // if (style !== undefined) Object.assign(cell, style);
};

export const setRange = (worksheet: Worksheet, range: RangeAddress, value?: CellValue, style?: Partial<CellStyle>) => {
  let cell: Cell;

  if (Array.isArray(range)) {
    worksheet.mergeCells(range);
    cell = worksheet.getCell(range[0], range[1]);
  } else {
    worksheet.mergeCells(range);
    cell = worksheet.getCell(range.split(':')[0]);
  }

  if (value !== undefined) cell.value = value;

  if (style !== undefined) mergeStyle(cell, style);
};

export const mergeStyle = <O extends object>(object: O, source: Partial<O>) => {
  let key: keyof O;
  for (key in source) {
    if (typeof source[key] === 'object') {
      if (object[key]) {
        Object.assign(object[key]!, source[key]);
      } else {
        object[key] = Object.assign({}, source[key]);
      }
    } else {
      // @ts-ignore
      object[key] = source[key];
    }
  }
};

export const setRowStyle = (worksheet: Worksheet, cellOrRow: CellAddress | number, style: RowStyle) => {
  const row = worksheet.getRow(getRowNumber(cellOrRow));

  mergeStyle(row, style);
};

export const mergeColSpan = (worksheet: Worksheet, cell: CellAddress, colSpan: number) => {
  const [rowNumber, colNumber] = toCellNumbers(cell);
  worksheet.mergeCells(rowNumber, colNumber, rowNumber, colNumber + colSpan - 1);
};

export const mergeRowSpan = (worksheet: Worksheet, cell: CellAddress, rowSpan: number) => {
  const [rowNumber, colNumber] = toCellNumbers(cell);
  worksheet.mergeCells(rowNumber, colNumber, rowNumber + rowSpan - 1, colNumber);
};

export const setRow = (
  worksheet: Worksheet,
  cellOrRow: CellAddress | number,
  cells: CellProps[],
  overallStyle?: CellStyle
) => {
  const rowNumber = getRowNumber(cellOrRow);
  const row = worksheet.getRow(rowNumber);

  cells.forEach((cellProps, colNumber) => {
    const cell = row.getCell(colNumber);

    if (overallStyle) mergeStyle(cell, overallStyle);

    if (cellProps != null && typeof cellProps === 'object' && 'value' in cellProps) {
      const { value, style, colSpan } = cellProps;
      if (colSpan) {
        mergeColSpan(worksheet, [rowNumber, colNumber], colSpan);
      }

      cell.value = value;

      if (style) mergeStyle(cell, style);
    } else {
      cell.value = cellProps;
    }
  });

  row.commit();

  return row;
};

export const setRows = (
  worksheet: Worksheet,
  cellOrRow: CellAddress | number,
  cellsArray: CellProps[][],
  overallStyle?: CellStyle
) => {
  const rowPos = getRowNumber(cellOrRow);

  return cellsArray.map((values, index) => setRow(worksheet, rowPos + index, values, overallStyle));
};
