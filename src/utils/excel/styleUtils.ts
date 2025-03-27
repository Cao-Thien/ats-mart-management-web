import { toRangeNumbers } from './addressUtils';
import { setCell } from './cellUtils';
import type { Border, Borders } from 'exceljs';
import { Worksheet, CellOrRangeAddress, BorderStyle } from './constants';

export type BorderSide = 'left' | 'right' | 'top' | 'bottom' | 'leftRight' | 'topBottom' | 'outside' | 'all';

// Excel-like set border function
export const setBorder = (
  worksheet: Worksheet,
  cellOrRange: CellOrRangeAddress,
  borderSide: BorderSide,
  borderStyle: BorderStyle,
  borderColor?: string
) => {
  const border: Partial<Border | undefined> = borderStyle !== 'none' ? { style: borderStyle } : undefined;
  if (borderColor && border) {
    border.color = { argb: borderColor };
  }

  const [startRowPos, startColPos, endRowPos, endColPos] = toRangeNumbers(cellOrRange);

  if (borderSide === 'all') {
    const style = { border: { top: border, right: border, bottom: border, left: border } };

    for (let rowPos = startRowPos; rowPos <= endRowPos; rowPos++) {
      for (let colPos = startColPos; colPos <= endColPos; colPos++) {
        setCell(worksheet, [rowPos, colPos], undefined, style);
      }
    }
    return;
  }

  // Some sides need to draw horizontal borders
  if (['outside', 'topBottom', 'top', 'bottom'].includes(borderSide)) {
    const topBorderStyle = { border: { top: border } };
    const bottomBorderStyle = { border: { bottom: border } };

    for (let colPos = startColPos; colPos <= endColPos; colPos++) {
      // Draw TOP border
      if (['outside', 'topBottom', 'top'].includes(borderSide)) {
        setCell(worksheet, [startRowPos, colPos], undefined, topBorderStyle);
      }

      // Draw BOTTOM border
      if (['outside', 'topBottom', 'bottom'].includes(borderSide)) {
        setCell(worksheet, [endRowPos, colPos], undefined, bottomBorderStyle);
      }
    }
  }

  // Some sides need to draw vertical borders
  if (['outside', 'leftRight', 'left', 'right'].includes(borderSide)) {
    const leftBorderStyle = { border: { left: border } };
    const rightBorderStyle = { border: { right: border } };

    for (let rowPos = startRowPos; rowPos <= endRowPos; rowPos++) {
      // Draw LEFT border
      if (['outside', 'leftRight', 'left'].includes(borderSide)) {
        setCell(worksheet, [rowPos, startColPos], undefined, leftBorderStyle);
      }

      // Draw RIGHT border
      if (['outside', 'leftRight', 'right'].includes(borderSide)) {
        setCell(worksheet, [rowPos, endColPos], undefined, rightBorderStyle);
      }
    }
  }
};

// Set outside borders from a range
export const setOutsideBorder = (worksheet: Worksheet, cellOrRange: CellOrRangeAddress, borders: Partial<Borders>) => {
  const topBorderStyle = 'top' in borders ? { border: { top: borders.top } } : undefined;
  const bottomBorderStyle = 'bottom' in borders ? { border: { bottom: borders.bottom } } : undefined;
  const leftBorderStyle = 'left' in borders ? { border: { left: borders.left } } : undefined;
  const rightBorderStyle = 'right' in borders ? { border: { right: borders.right } } : undefined;

  const [startRowPos, startColPos, endRowPos, endColPos] = toRangeNumbers(cellOrRange);

  for (let colPos = startColPos; colPos <= endColPos; colPos++) {
    // Draw TOP border
    if (topBorderStyle) setCell(worksheet, [startRowPos, colPos], undefined, topBorderStyle);

    // Draw BOTTOM border
    if (bottomBorderStyle) setCell(worksheet, [endRowPos, colPos], undefined, bottomBorderStyle);
  }

  for (let rowPos = startRowPos; rowPos <= endRowPos; rowPos++) {
    // Draw LEFT border
    if (leftBorderStyle) setCell(worksheet, [rowPos, startColPos], undefined, leftBorderStyle);

    // Draw RIGHT border
    if (rightBorderStyle) setCell(worksheet, [rowPos, endColPos], undefined, rightBorderStyle);
  }
};

type AutoWidthOptions = {
  minWidth?: number;
  maxWidth?: number;
};

// Auto adjust width based on value
export const autoWidth = (worksheet: Worksheet, { minWidth = 10, maxWidth }: AutoWidthOptions = {}) => {
  worksheet.columns.forEach(column => {
    let maxLength = minWidth;

    column.eachCell?.(cell => {
      // todo: calculate length merged cells
      if (cell.isMerged) {
        return;
      }

      const valueLength = cell.value?.toString()?.length ?? 0;
      if (valueLength > maxLength) {
        maxLength = valueLength;
      }
    });

    if (maxWidth && maxLength > maxWidth) {
      maxLength = maxWidth;
    }

    column.width = maxLength;
  });
};

export const setHeight = (worksheet: Worksheet, rowOrRange: number | [number, number], height: number) => {
  const [startRowPos, endRowPos] = Array.isArray(rowOrRange) ? rowOrRange : [rowOrRange, rowOrRange];

  for (let rowPos = startRowPos; rowPos <= endRowPos; rowPos++) {
    worksheet.getRow(rowPos).height = height;
  }
};

export const setWidth = (worksheet: Worksheet, colOrRange: number | [number, number], width: number) => {
  const [startColPos, endColPos] = Array.isArray(colOrRange) ? colOrRange : [colOrRange, colOrRange];

  for (let colPos = startColPos; colPos <= endColPos; colPos++) {
    worksheet.getColumn(colPos).width = width;
  }
};
