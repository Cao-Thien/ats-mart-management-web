// COMPONENTS
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import StockManagementSearchBar from './_sections/StockManagementSearchBar';
import StockManagementTable from './_tables/StockManagementTable';
import { fetchMartStockProducts } from 'actions/martStockProductAction';
import { Typography } from '@mui/material';

export default async function StockManagementPage({ searchParams: { name } }: { searchParams: { name: string } }) {
  const { list: martStockProductList } = await fetchMartStockProducts(name);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid xs={12} display="flex" justifyContent="start" alignItems="center" pb={2}>
        <Typography variant="h5" component="h5">
          입고 현황
        </Typography>
      </Grid>
      <Grid container component="main" width="100%" rowGap={2}>
        <>
          <Grid xs={12}>
            <Paper sx={{ p: 2 }}>
              <StockManagementSearchBar defaultSearchString={name || ''} />
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Paper sx={{ p: 2 }}>
              <StockManagementTable martStockProductList={martStockProductList?.map(item => item.json())} />
            </Paper>
          </Grid>
        </>
      </Grid>
    </Box>
  );
}
