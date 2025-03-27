import { toCellNumbers } from '../addressUtils';
import { setRange, setRow, setRows } from '../cellUtils';
import { setOutsideBorder } from '../styleUtils';
import { get } from 'lodash';
import { Obj, Worksheet, TableColumn, ValueGetterParams, DataTableProps, CellObject } from '../constants';
import { createTableStyles } from './_functions';

type NextRowColNumbers = [number, number];

const insertDataTable = <Row extends Obj = Obj>(
  worksheet: Worksheet,
  { columns, columnGrouping, rows, tableName, startAddress, groupingFields, tableStyle }: DataTableProps<Row>
): NextRowColNumbers => {
  const [headStyle, bodyStyle] = createTableStyles(tableStyle);
  const [startRow, startCol] = toCellNumbers(startAddress);

  let currRow = startRow;
  const columnLength = columns.reduce((length, { colSpan }) => length + (colSpan || 1), 0);

  // Add table name row
  if (tableName) {
    if (typeof tableName === 'string') {
      setRange(worksheet, [currRow, startCol, currRow, startCol + columnLength - 1], tableName, headStyle);
    } else {
      const { value, style } = tableName;
      setRange(worksheet, [currRow, startCol, currRow, startCol + columnLength - 1], value, style ?? headStyle);
    }
    currRow++;
  }

  // Header grouping
  if (columnGrouping) {
    columnGrouping.forEach(({ startField, endField, headerName, style }) => {
      const startIndex = columns.findIndex(column => column.field === startField);
      const endIndex = columns.findIndex(column => column.field === endField);

      if (startIndex === -1 || endIndex === -1) {
        throw new Error('Cannot find column');
      }

      setRange(
        worksheet,
        [currRow, startCol + startIndex, currRow, startCol + endIndex],
        headerName,
        style ?? headStyle
      );
    });
    currRow++;
  }

  // Add table header row
  const headerCells: CellObject[] = [];

  let headerAccumulatedSpanNumber = 0;
  columns.forEach(({ headerName, headerStyle, colSpan }, index) => {
    if (headerName != null) {
      headerCells[startCol + headerAccumulatedSpanNumber + index] = {
        value: headerName,
        style: headerStyle,
        colSpan,
      };
    }

    if (colSpan) headerAccumulatedSpanNumber += colSpan - 1;
  });

  if (headerCells.length > 0) {
    setRow(worksheet, currRow++, headerCells, headStyle);
  }

  // Get value of each rows
  if (rows?.length) {
    const bodyRows: Array<CellObject[]> = [];

    rows.forEach((row: Row) => {
      const rowCells: CellObject[] = [];
      let pushed = false;

      let accumulatedSpanNumber = 0;
      columns.forEach((column, index) => {
        const { field, valueGetter, cellStyle, colSpan } = column;

        const cellObj: CellObject = { value: undefined, colSpan };
        if (valueGetter) {
          const getterParams: ValueGetterParams<Row> = { row, column };

          if (groupingFields) {
            const [firstGroupingKey] = groupingFields;
            const children = row[firstGroupingKey];

            if (children?.length) {
              getterParams.groupingIds = [children[0].id];
            }
          }

          cellObj.value = valueGetter(getterParams);
        } else if (field.includes('.')) {
          cellObj.value = get(row, field);
        } else {
          cellObj.value = row[field];
        }

        if (cellStyle) {
          cellObj.style = typeof cellStyle === 'function' ? cellStyle({ row, value: cellObj.value }) : cellStyle;
        }

        rowCells[startCol + accumulatedSpanNumber + index] = cellObj;

        if (colSpan) accumulatedSpanNumber += colSpan - 1;
      });

      // todo: new column def not tested with grouping yet
      if (groupingFields) {
        const groupingRows = generateGroupingRows(row, columns, startCol, groupingFields);

        if (groupingRows.length) {
          const [firstRow, ...restGroupingRows] = groupingRows;
          firstRow.forEach((cell, childIndex) => {
            if (cell != null) rowCells[childIndex] = cell;
          });

          bodyRows.push(rowCells);
          pushed = true;

          bodyRows.push(...restGroupingRows);
        }
      }

      if (!pushed) {
        bodyRows.push(rowCells);
      }
    });

    const insertedRows = setRows(worksheet, currRow, bodyRows, bodyStyle);

    currRow += insertedRows.length;
  }

  if (tableStyle?.outsideBorder) {
    const { outsideBorder } = tableStyle;

    if (
      'top' in outsideBorder ||
      'right' in outsideBorder ||
      'bottom' in outsideBorder ||
      'left' in outsideBorder ||
      'diagonal' in outsideBorder
    ) {
      setOutsideBorder(worksheet, [startRow, startCol, currRow - 1, startCol + columnLength - 1], outsideBorder);
    } else if ('header' in outsideBorder || 'body' in outsideBorder) {
      let headerEndRow = 1;
      if (tableName) headerEndRow++;
      if (columnGrouping) headerEndRow++;

      if (outsideBorder.header) {
        setOutsideBorder(
          worksheet,
          [startRow, startCol, startRow + headerEndRow - 1, startCol + columnLength - 1],
          outsideBorder.header
        );
      }

      if (outsideBorder.body) {
        setOutsideBorder(
          worksheet,
          [startRow + headerEndRow, startCol, currRow - 1, startCol + columnLength - 1],
          outsideBorder.body
        );
      }
    }
  }

  // Return next row number and col number
  return [currRow, startCol + columnLength];
};

const generateGroupingRows = <Row = Obj>(
  parentRow: Obj,
  columns: TableColumn<Row>[],
  startCol: number,
  groupingFields: string[]
) => {
  const rsGroupingRows: Array<CellObject[]> = [];
  const [currentGroupingField, ...restGroupingKeys] = groupingFields;
  const childRows = parentRow[currentGroupingField];

  if (childRows?.length) {
    childRows.forEach((childRow: Obj) => {
      const childRowCells: CellObject[] = [];
      let pushed = false;

      columns.forEach((column, colIndex) => {
        const { field, valueGetter, cellStyle, colSpan } = column;

        const cellObj: CellObject = { value: undefined, colSpan };
        cellObj.value = valueGetter
          ? valueGetter({
              row: {} as Row, // set empty to avoid value getter parent row
              column,
              groupingIds: [childRow.id],
              currentGroupingField,
              currentChildRow: childRow,
            })
          : childRow[field];

        if (cellStyle) {
          cellObj.style =
            typeof cellStyle === 'function' ? cellStyle({ row: childRow as Row, value: cellObj.value }) : cellStyle;
        }

        if (cellObj.value != null) {
          childRowCells[startCol + colIndex] = cellObj;
        }
      });

      // Get deeper 1 level children cells
      if (restGroupingKeys.length) {
        const nestedChildRows = generateGroupingRows(childRow, columns, startCol, restGroupingKeys);

        if (nestedChildRows.length > 0) {
          const [firstNestedChildRow, ...restChildRows] = nestedChildRows;
          firstNestedChildRow.forEach((value, childColIndex) => {
            if (value != null) {
              childRowCells[childColIndex] = value;
            }
          });

          rsGroupingRows.push(childRowCells);
          pushed = true;

          if (restChildRows.length) {
            rsGroupingRows.push(...restChildRows);
          }
        }
      }

      if (!pushed) {
        rsGroupingRows.push(childRowCells);
      }
    });
  }

  return rsGroupingRows;
};

export default insertDataTable;
