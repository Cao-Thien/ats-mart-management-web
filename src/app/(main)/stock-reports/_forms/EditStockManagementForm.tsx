'use client';
import { useParams, useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

// COMPONENTS
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FormInput from '@/components/Form/FormInput';
import StockActions from '../_sections/StockManagementActions';
import { Box, Button, Stack, Typography } from '@mui/material';

// MODELS
import MartProductStock from 'models/product/MartProductStockReport';

// HOOKS
import { useNotification } from 'hooks/useNotification';
import usePreventScannerSubmit from 'hooks/usePreventScannerSubmit';

// CONSTANTS
import { ID, Obj } from 'constants/types';
import { useEffect, useState } from 'react';
import TableGridBodyCustom from '../_panels/TableGridBodyCustom';
import TableHeadCustom from '../_panels/TableHeadCustom';
import { FetchStatus } from 'constants/types/requestStatus';

// ACTIONS
import {
  deleteMartStockProduct,
  fetchMartStockProductById,
  updateMartStockProduct,
} from 'actions/martStockProductAction';
import dayjs, { Dayjs } from 'dayjs';
import DatePicker from '@/components/atoms/DatePicker';
import TimePicker from '@/components/atoms/TimePicker';
import { MartProductStockReportBody } from 'constants/ats/productConstants/martProductStockReport';
import useOpen from 'hooks/useOpen';
import Dialog from '@/components/Dialog';

export type DraftFormImage = Record<ID, FormData>;
export enum CreateProductStockForm {
  name = 'CreateProductStockForm',
}
type Props = {
  onSubmitted?: () => void;
};

const EditStockManagementForm = ({ onSubmitted }: Props) => {
  const { refresh, replace } = useRouter();
  const { control, watch, setValue, handleSubmit } = useFormContext();
  const { stockId } = useParams();
  const stockDate = watch('stockDate');
  const getDatePart = () => (stockDate ? dayjs(stockDate).format('YYYY-MM-DD') : '');
  const getTimePart = () => (stockDate ? dayjs(stockDate).format('HH:mm:ss') : '');
  const [loading, setLoading] = useState<FetchStatus>();
  const { onEnterKeyDown } = usePreventScannerSubmit();
  const { success, error } = useNotification();
  const [openConfirmDelete, openConfirmDeleteProps] = useOpen();

  useEffect(() => {
    getStockDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockId]);

  useEffect(() => {
    window.addEventListener('keydown', onEnterKeyDown);
    return () => {
      window.removeEventListener('keydown', onEnterKeyDown);
    };
  }, [onEnterKeyDown]);

  async function getStockDetail() {
    try {
      if (!stockId) return;
      if (loading === FetchStatus.LOADING) return;
      setLoading(FetchStatus.LOADING);
      const data = await fetchMartStockProductById(stockId as string);
      setValue(MartProductStock.fields.stockDate, data.stockDate, { shouldDirty: true });
      setValue(MartProductStock.fields.productId, data.productId);
      setValue(MartProductStock.fields.name, data.product?.name);
      setValue(MartProductStock.fields.registrationName, data.product?.registrationName);
      setValue(MartProductStock.fields.quantityBefore, data.quantityBefore);
      setValue(MartProductStock.fields.quantityAfter, data.quantityAfter);
      setValue(MartProductStock.fields.quantityStocked, data.quantityStocked, { shouldDirty: true });
      setLoading(FetchStatus.SUCCESS);
    } catch (error) {
      setLoading(FetchStatus.FAILED);
    } finally {
      setLoading(FetchStatus.IDLE);
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deleteMartStockProduct(stockId as ID);
      if (!res) {
        error('제품 생성 오류');
      } else {
        success('성공을 창조하다');
        replace('/stock-reports');
        refresh();
      }
    } catch (err) {
      error('제품 생성 오류');
    }
  };

  const onSubmit = async (e: Obj) => {
    const martStockData = new MartProductStock(e);
    martStockData.setClientId();
    const updateSingleProduct = async (productId: ID, updatedData: MartProductStockReportBody) => {
      try {
        const response = await updateMartStockProduct(productId, updatedData);
        return response;
      } catch (error) {
        return false;
      }
    };
    const response = await updateSingleProduct(stockId as ID, martStockData.toReqBody());
    if (!response) {
      error('제품 생성 오류');
    } else {
      success('성공을 창조하다');
      refresh();
    }
    onSubmitted?.();
    return;
  };

  const handleChangeDate = (date: Dayjs | null) => {
    const currentTime = getTimePart() || '00:00:00';
    const newDateTime = `${dayjs(date).format('YYYY-MM-DD')} ${currentTime}`;
    setValue('stockDate', newDateTime);
  };

  const handleChangeTime = (time: Dayjs | null) => {
    const currentDate = getDatePart() || dayjs().format('YYYY-MM-DD');
    const newDateTime = `${currentDate} ${dayjs(time).format('HH:mm:ss')}`;
    setValue('stockDate', newDateTime);
  };

  return (
    <>
      <form id={CreateProductStockForm.name} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {/* Stock Date  */}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">입고일</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <DatePicker
                value={stockDate ? dayjs(stockDate) : dayjs()}
                onChange={newValue => handleChangeDate(newValue)}
                format="YYYY-MM-DD"
              />
            </TableGridBodyCustom>
          </Grid>

          {/* Stock Time  */}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit" textAlign={'center'}>
                입고 시간
              </Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <TimePicker
                value={stockDate ? dayjs(stockDate) : dayjs()}
                onChange={(newValue: dayjs.Dayjs | null) => handleChangeTime(newValue)}
                format="HH:mm:ss"
              />
            </TableGridBodyCustom>
          </Grid>

          {/* 상품 ID */}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">상품 ID</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <Grid container direction="row" alignItems="center">
                <Grid xs={6} display="flex" justifyContent="start">
                  <FormInput
                    control={control}
                    fullWidth
                    name={MartProductStock.fields.productId}
                    value={'오징어 다리'}
                    InputProps={{
                      readOnly: true,
                      style: { cursor: 'pointer' },
                      // onClick: () => openBarcode(),
                    }}
                  />
                </Grid>
              </Grid>
            </TableGridBodyCustom>
          </Grid>

          {/* 상품 이름 DisplayName */}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">상품 이름</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <FormInput
                control={control}
                disabled
                fullWidth
                name={MartProductStock.fields.name}
                value={'오징어 다리'}
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: '#f0f0f0', color: '#808080' },
                }}
              />
            </TableGridBodyCustom>
          </Grid>

          {/* 상품 등록 이름  registrationName*/}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">상품 등록 이름</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <FormInput
                control={control}
                fullWidth
                name={MartProductStock.fields.registrationName}
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: '#f0f0f0', color: '#808080' },
                }}
              />
            </TableGridBodyCustom>
          </Grid>

          {/* 입고전 재고  quantityBeforeStock*/}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">입고전 재고</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <FormInput
                control={control}
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: '#f0f0f0', color: '#808080' },
                }}
                fullWidth
                name={MartProductStock.fields.quantityBefore}
              />
            </TableGridBodyCustom>
          </Grid>

          {/* 입고후 재고  quantityAfterStock*/}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">입고후 재고</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <FormInput
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: '#f0f0f0', color: '#808080' },
                }}
                control={control}
                fullWidth
                name={MartProductStock.fields.quantityAfter}
              />
            </TableGridBodyCustom>
          </Grid>

          {/* 입고량  quantityStocked*/}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">입고량</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <FormInput control={control} fullWidth name={MartProductStock.fields.quantityStocked} />
            </TableGridBodyCustom>
          </Grid>
        </Grid>
      </form>
      {/* ACTIONS */}
      <Grid xs={12} py={2} component={Stack} flexDirection="row" justifyContent="flex-end" columnGap={2}>
        <Button
          variant="contained"
          disableElevation
          color="error"
          type="button"
          sx={{
            height: '52px',
            borderRadius: '8px',
            width: '100%',
            // width: '120px',
            fontSize: '16px',
            fontWeight: '500',
          }}
          onClick={openConfirmDelete}
        >
          입고 등록 취소
        </Button>
        <StockActions />
      </Grid>
      <Dialog
        buttons={[
          {
            label: '확인',
            color: 'primary',
            variant: 'contained',
            onClick: handleDelete,
          },
        ]}
        title="알림"
        open={openConfirmDeleteProps.open}
        // hideCancelButton={true}
        onClose={openConfirmDeleteProps.onClose}
        hideCloseIcon={true}
        closeAfterTransition={false}
        maxWidth={'lg'}
        actionsSx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          이 제품을 삭제하시겠습니까?
        </Box>
      </Dialog>
    </>
  );
};

export default EditStockManagementForm;
