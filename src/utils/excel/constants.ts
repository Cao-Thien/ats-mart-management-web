import ExcelJS from 'exceljs';
import type { Alignment, BorderStyle as ExcelBorderStyle } from 'exceljs';

export type Cell = ExcelJS.Cell;
export type CellValue = ExcelJS.CellValue;
export type ExcelStyle = ExcelJS.Style;
export type CellStyle = Partial<ExcelJS.Style>;
export type Workbook = ExcelJS.Workbook;
export type Worksheet = ExcelJS.Worksheet;
export type Row = ExcelJS.Row;
export type RowStyle = Partial<Pick<Row, 'height' | 'hidden' | 'outlineLevel'> & ExcelStyle>;

// 'thin' | 'dotted' | 'hair' | 'medium' | 'double' | 'thick' | 'dashed' | 'dashDot' | 'dashDotDot' | 'slantDashDot'
// 'mediumDashed' | 'mediumDashDotDot' | 'mediumDashDot' | 'none'
export type BorderStyle = ExcelBorderStyle | 'none';

export type CellObject = {
  value: CellValue;
  style?: CellStyle;
  colSpan?: number;
};
export type CellProps = CellValue | CellObject;

export type RowNumber = number;
export type ColNumber = number;
type TopNumber = RowNumber;
type BottomNumber = RowNumber;
type LeftNumber = ColNumber;
type RightNumber = ColNumber;

export type CellNumbers = [RowNumber, ColNumber]; // [row, col] 1-based indexes
export type CellLetters = string; // A1 style letters

export type CellAddress = CellNumbers | CellLetters;

export type RangeNumbers = [TopNumber, LeftNumber, BottomNumber, RightNumber]; // [top, left, bottom, right] 1-based indexes
export type RangeLetters = `${string}:${string}`; // A1:D9 style letters

export type RangeAddress = RangeNumbers | RangeLetters;

export type CellOrRangeAddress = CellAddress | RangeAddress;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Obj<V = any> = Record<string, V>;

export type ID = string | number;

export type ValueGetterParams<R = Obj> = {
  row: R;
  column: TableColumn<R>;
  groupingIds?: ID[];
  currentGroupingField?: string;
  currentChildRow?: Obj;
};

export type StyleGetterParams<R = Obj> = {
  row: R;
  value: CellValue;
};

export type TableColumn<Data = Obj> = {
  field: string;
  headerName?: string | number;
  headerStyle?: CellStyle;
  valueGetter?: (params: ValueGetterParams<Data>) => CellValue;
  cellStyle?: CellStyle | ((params: StyleGetterParams<Data>) => CellStyle);
  colSpan?: number;
};

type ColumnGroupingItem = {
  headerName: string;
  startField: string;
  endField: string;
  style?: CellStyle;
};

type BaseTableProps = {
  startAddress: CellAddress;
  tableStyle?: TableStyle;
};

export type TableStyle = {
  align?: Alignment['horizontal'] | Partial<Record<'header' | 'body', Alignment['horizontal']>>;
  verticalAlign?: Alignment['vertical'] | Partial<Record<'header' | 'body', Alignment['vertical']>>;
  wrapText?: Alignment['wrapText'] | Partial<Record<'header' | 'body', Alignment['wrapText']>>;
  border?: ExcelStyle['border'] | Partial<Record<'header' | 'body', ExcelStyle['border']>>;
  outsideBorder?: ExcelStyle['border'] | Partial<Record<'header' | 'body', ExcelStyle['border']>>;
};

export type DataTableProps<Data = Obj> = BaseTableProps & {
  columns: TableColumn<Data>[];
  columnGrouping?: Array<ColumnGroupingItem>;
  rows?: Data[];
  tableName?:
    | string
    | {
        value: string;
        style?: CellStyle;
      };
  groupingFields?: string[];
};

type ValueType = 'number' | 'percentage';

export type VerticalTableRow = {
  headerName?: string;
  headerStyle?: CellStyle;
  bodyValues?: CellValue[];
  type?: ValueType;
  cellStyle?: CellStyle;
  colSpan?: number;
};

export type VerticalTableProps = BaseTableProps & {
  tableName?: string | { value: string; style?: CellStyle };
  columnQuantity?: number;
  rows: VerticalTableRow[];
  defaultTypeFormat?: { [type in ValueType]?: string };
};

export enum NumFormat {
  Percentage = '0%',
  Number = 'General;[Red](General);0',
}
