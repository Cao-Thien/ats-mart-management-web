'use client';

// COMPONENTS
import { GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import AtsDataGrid, { GridInitialState, useColumns } from '@/components/molecules/AtsDataGrid';

// ASSETS
import { Add } from '@mui/icons-material';

// MODELS
import { usePathname, useRouter } from 'next/navigation';
import { ID } from 'constants/types';
import { useState } from 'react';
import { MartProductStockAttrs } from 'models/product/MartProductStockReport';
import dayjs from 'dayjs';

const PAGE_SIZE = 20;

const INITIAL_STATE: GridInitialState = {
  pagination: {
    paginationModel: { pageSize: PAGE_SIZE },
  },
};

export type StockManagementOrderChangeParams = {
  StockManagementId: ID;
  priority: number;
};

type Props = {
  martStockProductList: MartProductStockAttrs[];
};

const StockManagementTable = ({ martStockProductList = [] }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const [parentPathName] = useState(pathName);

  const goToCreateStock = () => {
    router.push(`${parentPathName}/create-stock`);
  };

  const columnsStock: GridColDef[] = useColumns(
    [
      {
        field: 'stockDate', //arrivalDate
        headerName: '입고일',
        minWidth: 150,
        maxWidth: 200,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => dayjs(params?.value)?.format('YYYY-MM-DD'),
      },
      {
        field: 'product',
        headerName: '상품 이름',
        minWidth: 150,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => params?.value?.name,
      },
      {
        field: 'quantityStocked',
        headerName: '입고 수량',
        minWidth: 150,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'id',
        headerName: 'ID',
        headerAlign: 'center',
        flex: 1,
        minWidth: 150,
        align: 'center',
      },
    ],
    []
  );

  return (
    <Grid container rowGap={4}>
      <Grid xs={12}>
        <AtsDataGrid
          rows={martStockProductList}
          columns={columnsStock}
          getRowId={row => row.id}
          initialState={INITIAL_STATE}
          hideFooter={martStockProductList.length <= PAGE_SIZE}
          autoHeight
          onCellClick={params => {
            if (params.field === 'id') {
              router.push(`/stock-reports/${params.value}`);
            }
          }}
        />
      </Grid>
      <Grid xs={12} container justifyContent="flex-end">
        <Button variant="contained" endIcon={<Add />} onClick={() => goToCreateStock()}>
          상품 입고 등록
        </Button>
      </Grid>
    </Grid>
  );
};

export default StockManagementTable;
