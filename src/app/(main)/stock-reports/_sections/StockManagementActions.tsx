'use client';

import { Button } from '@mui/material';
import { CreateProductStockForm } from '../_forms/CreateStockManagementForm';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function StockActions() {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  const router = useRouter();
  const handleBack = () => {
    router.push('/stock-reports');
  };
  return (
    <>
      <Button
        variant="contained"
        disableElevation
        size="large"
        color="secondary"
        type="button"
        onClick={handleBack}
        sx={{
          height: '52px',
          borderRadius: '8px',
          width: '120px',
          fontSize: '16px',
          fontWeight: '500',
          border: '1px solid #E0E2EC',
        }}
      >
        취소
      </Button>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        type="submit"
        disabled={isSubmitting}
        form={CreateProductStockForm.name}
        sx={{
          height: '52px',
          borderRadius: '8px',
          width: '120px',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        저장
      </Button>
    </>
  );
}
