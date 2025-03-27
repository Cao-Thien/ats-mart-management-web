import { toCellNumbers } from '../addressUtils';
import { setRange, setRows, setCell, mergeStyle } from '../cellUtils';
import { setOutsideBorder } from '../styleUtils';
import { CellObject, Worksheet, VerticalTableProps } from '../constants';
import { createTableStyles } from 'utils/excel/tables/_functions';

type NextRowColNumbers = [number, number];

const insertVerticalTable = (
  worksheet: Worksheet,
  { rows, startAddress, tableStyle, tableName, columnQuantity }: VerticalTableProps
): NextRowColNumbers => {
  const [headStyle, bodyStyle] = createTableStyles(tableStyle);

  const [startRow, startCol] = toCellNumbers(startAddress);

  let currRow = startRow;
  const hasHeader = rows.some(({ headerName }) => !!headerName);

  let lastCol = hasHeader ? startCol + 1 : startCol;

  const sheetRows: Array<CellObject[]> = [];

  // Add table name row
  if (tableName) {
    if (typeof tableName === 'string') {
      setRange(worksheet, [currRow, startCol, currRow, startCol + (columnQuantity ?? 0)], tableName, headStyle);
    } else {
      const { value, style } = tableName;
      setRange(worksheet, [currRow, startCol, currRow, startCol + (columnQuantity ?? 0)], value, style ?? headStyle);
    }
    currRow++;
  }

  rows.forEach(({ headerName, bodyValues, headerStyle, cellStyle, colSpan }, rowIndex) => {
    const rowCells: CellObject[] = [];

    // Set header column
    if (hasHeader) {
      const style = headStyle ?? {};

      if (headerStyle) mergeStyle(style, headerStyle);

      setCell(worksheet, [currRow + rowIndex, startCol], headerName ?? '', style);
    }

    // Accumulate body columns
    if (bodyValues) {
      bodyValues.forEach((value, index) => {
        const currCol = startCol + index + (hasHeader ? 1 : 0);
        rowCells[currCol] = { value, style: cellStyle, colSpan };
      });

      const endCol = startCol + bodyValues.length + (hasHeader ? 1 : 0);

      if (endCol > lastCol) {
        lastCol = endCol;
      }
    }

    sheetRows.push(rowCells);
  });

  setRows(worksheet, currRow, sheetRows, bodyStyle);

  if (tableStyle?.outsideBorder) {
    const { outsideBorder } = tableStyle;

    if (
      'top' in outsideBorder ||
      'right' in outsideBorder ||
      'bottom' in outsideBorder ||
      'left' in outsideBorder ||
      'diagonal' in outsideBorder
    ) {
      setOutsideBorder(worksheet, [startRow, startCol, startRow + rows.length - 1, lastCol - 1], outsideBorder);
    } else if ('header' in outsideBorder || 'body' in outsideBorder) {
      const headerEndRow = 1;

      if (outsideBorder.header) {
        setOutsideBorder(
          worksheet,
          [startRow, startCol, startRow + headerEndRow - 1, lastCol - 1],
          outsideBorder.header
        );
      }

      if (outsideBorder.body) {
        setOutsideBorder(
          worksheet,
          [startRow + headerEndRow, startCol, startRow + rows.length - 1, lastCol - 1],
          outsideBorder.body
        );
      }
    }
  }

  return [startRow + rows.length, lastCol + 1];
};

export default insertVerticalTable;
