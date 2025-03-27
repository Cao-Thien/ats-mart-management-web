'use client';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import AtsPaper from '@/components/AtsPaper';
import { FormProvider, useForm } from 'react-hook-form';
import EditStockManagementForm from '../_forms/EditStockManagementForm';

export default function EditStockManagementPage() {
  const methods = useForm();

  return (
    <AtsPaper>
      <Grid xs={12} display="flex" justifyContent="start" alignItems="center" pb={2}>
        <Typography variant="h5" component="h5">
          상품 입고 내역
        </Typography>
      </Grid>
      <Grid container sx={{ width: '100%' }}>
        <Grid component="main" width="100%">
          {/* FORM */}
          <FormProvider {...methods}>
            <EditStockManagementForm />
          </FormProvider>
        </Grid>
      </Grid>
    </AtsPaper>
  );
}
