import {
  newWorkBook,
  setCell,
  setRange,
  insertDataTable,
  insertVerticalTable,
  setBorder,
  autoWidth,
  setWidth,
  setHeight,
  border,
  alignment,
  font,
  fill,
  Workbook,
  Worksheet,
  CellOrRangeAddress,
  CellValue,
  CellStyle,
  DataTableProps,
  VerticalTableProps,
  NumFormat,
  CellAddress,
  BorderSide,
  BorderStyle,
  TableStyle,
  RangeAddress,
} from 'utils/excel';
import { downloadFile } from 'utils/file/downloadUtils';
import { Obj } from 'constants/types';

abstract class ExcelModel {
  // Main Work Book to export
  protected _book?: Workbook;

  // Current sheet which is working on
  protected _currentSheet?: Worksheet;

  protected _utils = { border, alignment, font, fill } as const;

  // Function to return file name only without extension
  protected abstract _fileName(): string;

  // Main function to process data and generate excel
  protected abstract _process(): void;

  // Open a sheet, create new if not existed
  protected _openSheet(name: string, options?: Parameters<Workbook['addWorksheet']>[1]) {
    if (!this._book) throw new Error('Book is not created');

    let sheet = this._book.getWorksheet(name);
    if (!sheet) {
      sheet = this._book.addWorksheet(name, options);
    }

    this._currentSheet = sheet;
    return this._currentSheet;
  }

  // Close an open sheet
  protected _closeSheet() {
    this._currentSheet = undefined;
  }

  protected _getCurrentSheet() {
    if (!this._currentSheet) throw new Error('Sheet is not open');
    return this._currentSheet;
  }

  protected _setCell(cell: CellAddress, value?: CellValue, style?: Partial<CellStyle>) {
    setCell(this._getCurrentSheet(), cell, value, style);
  }

  protected _setRange(cellOrRange: RangeAddress, value?: CellValue, style?: Partial<CellStyle>) {
    setRange(this._getCurrentSheet(), cellOrRange, value, style);
  }

  protected _autoWidth() {
    autoWidth(this._getCurrentSheet());
  }

  protected _setWidth(colOrRange: number | [number, number], width: number) {
    setWidth(this._getCurrentSheet(), colOrRange, width);
  }

  protected _setHeight(rowOrRange: number | [number, number], width: number) {
    setHeight(this._getCurrentSheet(), rowOrRange, width);
  }

  protected _setBorder(
    cellOrRange: CellOrRangeAddress,
    borderSide: BorderSide,
    borderStyle: BorderStyle,
    borderColor?: string
  ) {
    setBorder(this._getCurrentSheet(), cellOrRange, borderSide, borderStyle, borderColor);
  }

  protected _insertDataTable<Row extends Obj = Obj>(tableProps: DataTableProps<Row>) {
    return insertDataTable(this._getCurrentSheet(), tableProps);
  }

  protected _insertVerticalTable({ ...restTableProperties }: VerticalTableProps) {
    return insertVerticalTable(this._getCurrentSheet(), {
      ...restTableProperties,
      defaultTypeFormat: {
        number: NumFormat.Number,
        percentage: NumFormat.Percentage,
      },
    });
  }

  protected _defaultTableStyle(overrideTableStyle?: TableStyle): TableStyle {
    return {
      align: 'center',
      border: this._utils.border('thin'),
      outsideBorder: { body: this._utils.border('medium'), header: this._utils.border('medium') },
      ...overrideTableStyle,
    };
  }

  // Download excel file in BROWSER
  public async downloadExcelFile() {
    this._book = newWorkBook();

    this._process();

    // Reset
    this._closeSheet();

    // Extract to download excel file
    const buffer = await this._book.xlsx.writeBuffer();

    downloadFile(buffer, `${this._fileName()}.xlsx`);
  }
}

export type { DataTableProps, VerticalTableProps };

export default ExcelModel;
