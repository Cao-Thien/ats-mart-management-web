'use client';
// COMPONENTS
import Grid from '@mui/material/Unstable_Grid2';
import CreateStockManagementForm from '../_forms/CreateStockManagementForm';
import { FormProvider, useForm } from 'react-hook-form';
import StockActions from '../_sections/StockManagementActions';
import { Stack, Typography } from '@mui/material';
import AtsPaper from '@/components/AtsPaper';

export default function CreateStockManagementPage() {
  const methods = useForm();
  return (
    <AtsPaper>
      <Grid xs={12} display="flex" justifyContent="start" alignItems="center" pb={2}>
        <Typography variant="h5" component="h5">
          상품 입고 등록
        </Typography>
      </Grid>
      <Grid container sx={{ width: '100%' }}>
        <Grid component="main" width="100%">
          {/* FORM */}
          <FormProvider {...methods}>
            <CreateStockManagementForm onSubmitted={() => {}} onDraftItem={() => {}} />
            {/* ACTIONS */}
            <Grid xs={12} py={2} component={Stack} flexDirection="row" justifyContent="flex-end" columnGap={2}>
              <StockActions />
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </AtsPaper>
  );
}
