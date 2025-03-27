import { SxProps, Theme } from '@mui/material';
import { DataGrid, DataGridProps, gridClasses, GridRenderCellParams } from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import deepmerge from 'deepmerge';

export type { GridInitialStateCommunity as GridInitialState, GridRenderCellParams };

export default function AtsDataGrid({ sx = {}, initialState = {}, ...restProps }: DataGridProps) {
  return (
    <DataGrid
      disableColumnMenu
      initialState={deepmerge<GridInitialStateCommunity>(
        {
          pagination: {
            paginationModel: { pageSize: 20 },
          },
        },
        initialState
      )}
      pageSizeOptions={[10, 20, 30]}
      {...restProps}
      sx={deepmerge<SxProps<Theme> | undefined>(
        {
          fontSize: '14px',
          lineHeight: '20px',
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
          [`& .${gridClasses.columnHeader}`]: {
            color: '#fff',
            backgroundColor: '#1853A4',
            borderRight: '1px solid #3C6EB3',
            outline: 'transparent',
            '&:first-child': {
              borderTopLeftRadius: '8px',
            },
            '&:last-child': {
              borderTopRightRadius: '8px',
              borderRight: 0,
            },
            '&:focus-within': {
              outline: 'none',
            },
          },
          [`& .${gridClasses.cell}`]: {
            outline: 'transparent',
            borderRight: '1px solid #E0E2EC',
            '&:focus-within': {
              outline: 'none',
            },
            '&:last-child': {
              borderRight: 0,
            },
          },
        },
        sx
      )}
    />
  );
}
