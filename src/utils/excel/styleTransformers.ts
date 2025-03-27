import { ExcelStyle } from './constants';
import type { BorderStyle, Alignment, FillPatterns } from 'exceljs';
import { OneOfSamePropWithSpace, OneOfDiffPropWithSpace } from 'constants/types';

// "i" for initial, it means not set any
// todo: support for unset border
type ExtendedBorderStyle = BorderStyle | 'i';

type BorderStr = OneOfSamePropWithSpace<ExtendedBorderStyle, 4>;

// Border string rule will be same as CSS border and "i" for not set
// Color string rule will be same as Border string but value is argb code
export const border = (borderStr: BorderStr, colorStr?: string): ExcelStyle['border'] => {
  const borderStyle: ExcelStyle['border'] = {};

  // Convert border css style to excel style
  // eslint-disable-next-line prefer-const
  let [topBorder, rightBorder, bottomBorder, leftBorder] = borderStr.split(' ') as ExtendedBorderStyle[];

  if (!rightBorder) {
    leftBorder = bottomBorder = rightBorder = topBorder;
  } else if (!bottomBorder) {
    bottomBorder = topBorder;
    leftBorder = rightBorder;
  } else if (!leftBorder) {
    leftBorder = rightBorder;
  }

  if (topBorder !== 'i') borderStyle.top = { style: topBorder };
  if (rightBorder !== 'i') borderStyle.right = { style: rightBorder };
  if (leftBorder !== 'i') borderStyle.left = { style: leftBorder };
  if (bottomBorder !== 'i') borderStyle.bottom = { style: bottomBorder };

  // Convert color string to excel color
  if (colorStr) {
    // eslint-disable-next-line prefer-const
    let [topColor, rightColor, bottomColor, leftColor] = colorStr.split(' ');

    if (!rightColor) {
      leftColor = bottomColor = rightColor = topColor;
    } else if (!bottomColor) {
      bottomColor = topColor;
      leftColor = rightColor;
    } else if (!leftColor) {
      leftColor = rightColor;
    }

    if (borderStyle.top && topColor !== 'i') borderStyle.top.color = { argb: topColor };
    if (borderStyle.right && rightColor !== 'i') borderStyle.right.color = { argb: rightColor };
    if (borderStyle.bottom && bottomColor !== 'i') borderStyle.bottom.color = { argb: bottomColor };
    if (borderStyle.left && leftColor !== 'i') borderStyle.left.color = { argb: leftColor };
  }

  return borderStyle;
};

type HorizontalAlignment = Alignment['horizontal'];
type VerticalAlignment =
  | Exclude<Alignment['vertical'], 'distributed' | 'justify'>
  | 'verticalDistributed'
  | 'verticalJustify';

type TextFit = 'wrapText' | 'shrinkToFit';
type TextFitStr = OneOfDiffPropWithSpace<'wrapText', 'shrinkToFit'>;

type TextRotation = 'rotateVertical';

type AlignmentStr = OneOfDiffPropWithSpace<HorizontalAlignment, VerticalAlignment, TextFitStr, TextRotation>;

export const alignment = (alignmentStr: AlignmentStr): ExcelStyle['alignment'] => {
  const alignmentStyle: ExcelStyle['alignment'] = {};

  alignmentStr.split(' ').forEach(term => {
    switch (term as HorizontalAlignment | VerticalAlignment | TextFit | TextRotation) {
      case 'left':
      case 'center':
      case 'right':
      case 'fill':
      case 'justify':
      case 'centerContinuous':
      case 'distributed':
        alignmentStyle.horizontal = term as Alignment['horizontal'];
        break;

      case 'top':
      case 'middle':
      case 'bottom':
        alignmentStyle.vertical = term as Alignment['vertical'];
        break;

      case 'verticalDistributed':
        alignmentStyle.vertical = 'distributed';
        break;

      case 'verticalJustify':
        alignmentStyle.vertical = 'justify';
        break;

      case 'wrapText':
        alignmentStyle.wrapText = true;
        break;

      case 'shrinkToFit':
        alignmentStyle.shrinkToFit = true;
        break;

      case 'rotateVertical':
        alignmentStyle.textRotation = 'vertical';
        break;
    }
  });

  return alignmentStyle;
};

// 100% — FF | 95% — F2 | 90% — E6 | 85% — D9 | 80% — CC | 75% — BF | 70% — B3 | 65% — A6 | 60% — 99 | 55% — 8C
// 50% — 80 | 45% — 73 | 40% — 66 | 35% — 59 | 30% — 4D | 25% — 40 | 20% — 33 | 15% — 26 | 10% — 1A | 5% — 0D | 0% — 00
const toArgb = (color: string) => (color.startsWith('#') ? color.replace('#', 'FF') : color);

// todo: support more for ExcelStyle['font']
type FontDecorStr = OneOfDiffPropWithSpace<'bold', 'italic', 'underline'>;

export const font = (size?: number, color?: string, decorStr?: FontDecorStr): ExcelStyle['font'] => {
  const fontStyle: ExcelStyle['font'] = {};

  if (size != null) fontStyle.size = size;
  if (color != null) fontStyle.color = { argb: toArgb(color) };

  if (decorStr) {
    decorStr.split(' ').forEach(term => {
      switch (term) {
        case 'bold':
          fontStyle.bold = true;
          break;

        case 'italic':
          fontStyle.italic = true;
          break;

        case 'underline':
          fontStyle.underline = true;
          break;
      }
    });
  }

  return fontStyle;
};

// Transform fill pattern
export const fill = (fgColor: string, pattern: FillPatterns = 'solid', bgColor?: string): ExcelStyle['fill'] => {
  const fillStyle: ExcelStyle['fill'] = { type: 'pattern', pattern, fgColor: { argb: toArgb(fgColor) } };

  if (bgColor) {
    fillStyle.bgColor = { argb: toArgb(bgColor) };
  }

  return fillStyle;
};
