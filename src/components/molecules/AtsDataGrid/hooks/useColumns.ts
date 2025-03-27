import { useMemo, DependencyList } from 'react';
import { get } from 'lodash';
import {
  GridActionsColDef as MuiGridActionsColDef,
  GridColDef,
  GridValueGetter,
} from '@mui/x-data-grid/models/colDef/gridColDef';
import convertDateColumn from '../columns/dateColumn';
import convertCheckboxColumn, { GridCheckboxColDef } from '../columns/checkboxColumn';
import convertActionColumn, { GridActionsColDef } from '../columns/actionColumn';

const useColumns = (
  columns: Array<Exclude<GridColDef, MuiGridActionsColDef> | GridCheckboxColDef | GridActionsColDef>,
  deps: DependencyList = []
): GridColDef[] =>
  useMemo(
    () =>
      columns.map(column => {
        if (column.field.includes('.') && !column.valueGetter) {
          column.valueGetter = ((_value, row) => get(row, column.field)) as GridValueGetter;
        }

        if (column.type) {
          switch (column.type) {
            case 'date':
            case 'dateTime':
              return convertDateColumn(column);

            case 'checkbox':
              return convertCheckboxColumn(column);

            case 'actions':
              return convertActionColumn(column as GridActionsColDef);
          }
        }

        return column;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

export default useColumns;
