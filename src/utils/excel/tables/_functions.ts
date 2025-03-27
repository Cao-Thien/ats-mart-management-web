import { CellStyle, TableStyle } from '../constants';

export const createTableStyles = (
  tableStyle: TableStyle | undefined
): [CellStyle | undefined, CellStyle | undefined] => {
  if (!tableStyle) return [undefined, undefined];

  const headerAlignment: CellStyle['alignment'] = {};
  const bodyAlignment: CellStyle['alignment'] = {};

  const { align, verticalAlign, wrapText, border } = tableStyle;

  if (align) {
    if (typeof align === 'string') {
      headerAlignment.horizontal = align;
      bodyAlignment.horizontal = align;
    } else {
      const { header, body } = align;

      if (header) headerAlignment.horizontal = header;
      if (body) bodyAlignment.horizontal = body;
    }
  }

  if (verticalAlign) {
    if (typeof verticalAlign === 'string') {
      headerAlignment.vertical = verticalAlign;
      bodyAlignment.vertical = verticalAlign;
    } else {
      const { header, body } = verticalAlign;

      if (header) headerAlignment.vertical = header;
      if (body) bodyAlignment.vertical = body;
    }
  }

  if (wrapText) {
    if (typeof wrapText === 'boolean') {
      headerAlignment.wrapText = wrapText;
      bodyAlignment.wrapText = wrapText;
    } else {
      const { header, body } = wrapText;

      if (header) headerAlignment.wrapText = header;
      if (body) bodyAlignment.wrapText = body;
    }
  }

  const headerStyle: CellStyle = {};
  const bodyStyle: CellStyle = {};

  if (border) {
    if ('top' in border || 'right' in border || 'bottom' in border || 'left' in border || 'diagonal' in border) {
      headerStyle.border = border;
      bodyStyle.border = border;
    } else if ('header' in border || 'body' in border) {
      const { header, body } = border;

      if (header) headerStyle.border = header;
      if (body) bodyStyle.border = body;
    }
  }

  if (Object.keys(headerAlignment).length) headerStyle.alignment = headerAlignment;
  if (Object.keys(bodyAlignment).length) bodyStyle.alignment = bodyAlignment;

  return [
    Object.keys(headerStyle).length ? headerStyle : undefined,
    Object.keys(bodyStyle).length ? bodyStyle : undefined,
  ];
};
