import { memo } from 'react';

// COMPONENTS
import {
  GridColDef,
  GridRenderCellParams,
  useGridApiContext,
  GridRenderEditCellParams,
  GridValidRowModel,
} from '@mui/x-data-grid';
import Checkboxes from '@/components/atoms/Checkboxes';
import { GridBaseColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import Box from '@mui/material/Box';

// CONSTANTS
import { Any, CoreValue } from 'constants/types';

// Edit Renderer
const GridEditCheckboxCell = memo(
  ({ id, field, value, colDef }: GridRenderEditCellParams) => {
    const apiRef = useGridApiContext();

    const { valueOptions, isNumber } = colDef as unknown as GridCheckboxColDef;

    const handleValueChange = (newValue: CoreValue[]) => {
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return <Checkboxes options={valueOptions} value={value} isNumber={isNumber} row onChange={handleValueChange} />;
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

GridEditCheckboxCell.displayName = 'GridEditCheckboxCell';

const defaultRenderEditCell = (params: GridRenderEditCellParams) => <GridEditCheckboxCell {...params} />;

// View Renderer
const GridCheckboxCell = memo(
  ({ value, colDef }: GridRenderCellParams) => {
    const { valueOptions } = colDef as unknown as GridCheckboxColDef;

    return (
      <Box display="flex" alignItems="center" height="100%">
        <Checkboxes options={valueOptions} value={value} row disabled size="small" />
      </Box>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

GridCheckboxCell.displayName = 'GridCheckboxCell';

const defaultRenderCell = (params: GridRenderCellParams) => <GridCheckboxCell {...params} />;

export type GridCheckboxColDef<
  Row extends GridValidRowModel = GridValidRowModel,
  Value = Any,
  FormattedValue = Value,
> = Omit<GridBaseColDef<Row, Value, FormattedValue>, 'type'> & {
  type: 'checkbox';
  valueOptions: Array<{ label: string; value: Any }>;
  isNumber?: boolean;
};

const convertCheckboxColumn = ({
  type: _type,
  renderCell = defaultRenderCell,
  renderEditCell = defaultRenderEditCell,
  ...column
}: GridCheckboxColDef): GridColDef => {
  return {
    renderCell,
    renderEditCell,
    ...column,
  };
};

export default convertCheckboxColumn;
