import { memo, ReactElement } from 'react';

// COMPONENTS
import { GridColDef, GridRenderCellParams, GridValidRowModel, GridActionsCellItem } from '@mui/x-data-grid';
import { GridActionsColDef as MuiGridActionsColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import Stack from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';

// CONSTANTS
import { Any } from 'constants/types';
import { GridRowParams } from '@mui/x-data-grid/models/params/gridRowParams';
import { GridActionsCellItemProps } from '@mui/x-data-grid/components/cell/GridActionsCellItem';

export type GridActionsButtonProps = Omit<ButtonProps, 'children'> & {
  label: string | ReactElement;
};

export type ActionsButtonRowParams = Omit<GridRowParams, 'columns'>;

// View Renderer
const GridButtonsCell = memo(
  ({
    id,
    row,
    getButtons,
  }: GridRenderCellParams & {
    getButtons: (params: Omit<GridRowParams, 'columns'>) => GridActionsButtonProps[];
  }) => {
    return (
      <Stack spacing={1} direction="row">
        {getButtons({ id, row }).map(({ label, ...buttonProps }, index) => (
          <Button key={index} {...buttonProps}>
            {label}
          </Button>
        ))}
      </Stack>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

GridButtonsCell.displayName = 'GridButtonsCell';

export type GridActionsColDef<Row extends GridValidRowModel = Any, Value = Any, FormattedValue = Value> = Omit<
  MuiGridActionsColDef<Row, Value, FormattedValue>,
  'getActions'
> &
  (
    | {
        getActions: (params: GridRowParams<Row>) => GridActionsCellItemProps[];
        // getActions: (params: GridRowParams<Row>) => ReactElement<GridActionsCellItemProps>[]; // original
      }
    | {
        getButtons: (params: Omit<GridRowParams<Row>, 'columns'>) => GridActionsButtonProps[];
      }
  );

const convertActionColumn = (colDef: GridActionsColDef): GridColDef => {
  if ('getButtons' in colDef) {
    const { type: _type, getButtons } = colDef;

    return {
      ...colDef,
      renderCell: params => <GridButtonsCell {...params} getButtons={getButtons} />,
      sortable: false,
      editable: false,
    };
  }

  return {
    ...colDef,
    getActions: (params: GridRowParams) =>
      colDef.getActions(params).map((itemProps, index) => <GridActionsCellItem key={index} {...itemProps} />),
    sortable: false,
    editable: false,
  };
};

export default convertActionColumn;
