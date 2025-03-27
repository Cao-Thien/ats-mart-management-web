'use client';
import { useRouter } from 'next/navigation';
import { useFormContext, useWatch } from 'react-hook-form';

// COMPONENTS
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import FormInput from '@/components/Form/FormInput';

// MODELS
import MartProductStock from 'models/product/MartProductStockReport';

// ACTIONS
import { MartProductType, fetchMartProductList } from 'actions/martProductActions';

// HOOKS
import useOpen from 'hooks/useOpen';
import { useNotification } from 'hooks/useNotification';
import usePreventScannerSubmit from 'hooks/usePreventScannerSubmit';

// CONSTANTS
import { ID, Obj } from 'constants/types';
import { useEffect, useRef, useState } from 'react';
import TableGridBodyCustom from '../_panels/TableGridBodyCustom';
import TableHeadCustom from '../_panels/TableHeadCustom';
import ReactScanBarCode, { ReactScanBarCodeRef } from '@/components/ReactScanBarCode';
import Dialog from '@/components/Dialog';
import MartProduct from 'models/product/MartProduct';
import useResponsive from 'hooks/useResponsive';
import { Box, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import TimePicker from '@/components/atoms/TimePicker';
import DatePicker from '@/components/atoms/DatePicker';
import { createMartStockProduct } from 'actions/martStockProductAction';
import { MartProductStockReportBody } from 'constants/ats/productConstants/martProductStockReport';
import { Html5QrcodeResult } from 'html5-qrcode';

export type DraftFormImage = Record<ID, FormData>;
export enum CreateProductStockForm {
  name = 'CreateProductStockForm',
  searchProduct = 'searchProduct',
}
type Props = {
  onSubmitted?: () => void;
  onDraftItem?: (item: MartProductStock, imagesFormData?: DraftFormImage) => void;
};

const CreateStockManagementForm = ({}: Props) => {
  // REF
  const qrRef = useRef<ReactScanBarCodeRef>(null);

  //HOOKS
  const { replace, refresh } = useRouter();
  const { isMobile } = useResponsive();
  const { error: ErrorMessage } = useNotification();
  const { onEnterKeyDown } = usePreventScannerSubmit();

  //STATE
  const [errorCallbackQR, setErrorCallbackQR] = useState<boolean>(false);
  const [productStock, setProductStock] = useState<MartProduct>();
  const [decodedResults, setDecodedResults] = useState<string | undefined>();

  //FORM HOOKS
  const { control, getValues, setValue, handleSubmit } = useFormContext();
  const stockDate = useWatch({ control, name: 'stockDate' });
  const watchStocked = useWatch({ control, name: 'quantityStocked' });
  const getDatePart = () => (stockDate ? dayjs(stockDate).format('YYYY-MM-DD') : '');
  const getTimePart = () => (stockDate ? dayjs(stockDate).format('HH:mm:ss') : '');

  // DIALOG
  const [openBarcode, openBarcodeProps] = useOpen();
  const [openInputBarCodeManual, openInputBarCodeManualProps] = useOpen();
  const [openDialogError, openDialogErrorProps] = useOpen();
  const { success, error, warning } = useNotification();

  useEffect(() => {
    //IN THE CREATE CASE, SHOULD SET DEFAULT !
    setValue(MartProductStock.fields.stockDate, dayjs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onEnterKeyDown);
    return () => {
      window.removeEventListener('keydown', onEnterKeyDown);
    };
  }, [onEnterKeyDown]);

  useEffect(() => {
    if (watchStocked && getValues('quantityBefore')) {
      const quantityStocked = Number(getValues('quantityStocked')) || 0;
      const quantityBefore = Number(getValues('quantityBefore')) || 0;

      const newValue = quantityStocked + quantityBefore;

      if (newValue !== Number(getValues(MartProductStock.fields.quantityAfter))) {
        setValue(MartProductStock.fields.quantityAfter, newValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchStocked]);

  const onSubmit = async (e: Obj) => {
    const martStockData = new MartProductStock(e);
    martStockData.setClientId();
    if (martStockData.quantityStocked == 0) {
      warning('입고량은 1 이상이어야 합니다');
      return;
    }
    const createStock = async (updatedData: MartProductStockReportBody) => {
      try {
        const response = await createMartStockProduct(updatedData);
        return response;
      } catch (error) {
        return false;
      }
    };
    const response = await createStock(martStockData.toReqBody());
    if (response) {
      success('제품 생성 오류');
      replace('/stock-reports');
      refresh();
    } else {
      error('성공을 창조하다');
    }
    // onSubmitted?.();
  };

  const onNewScanResult = (decodedText: string, decodedResult?: Html5QrcodeResult) => {
    console.info(decodedResult);
    setDecodedResults(decodedText);
  };

  const onClearQueryBarcode = () => {
    setDecodedResults('');
    setErrorCallbackQR(false);
  };

  useEffect(() => {
    if (decodedResults) {
      fetchAndSetProductBaseOnQuery(decodedResults, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedResults]);

  const fetchAndSetProductBaseOnQuery = async (barcode?: string | number, productId?: ID) => {
    try {
      const { list } = await fetchMartProductList(
        MartProductType.MartProduct,
        undefined,
        undefined,
        barcode,
        productId
      );
      if (list.length > 0) {
        //To show on Modal
        setProductStock(list?.[0]);
        setValue(MartProductStock.fields.barCodeDisplay, list[0].barcode);
        setValue(MartProductStock.fields.productName, list[0].name);
        setValue(MartProductStock.fields.productIdDisplay, list[0].productId);
        if (openInputBarCodeManualProps.open) openInputBarCodeManualProps?.onClose();
        return;
      }
      ErrorMessage('No product found');
      setErrorCallbackQR(true);
      openDialogError();
      openInputBarCodeManualProps.onClose();
    } catch (error) {
      ErrorMessage('No product found');
      setErrorCallbackQR(true);
      openDialogError();
      openInputBarCodeManualProps.onClose();
    }
  };

  const onErrorTimeoutCallback = () => {
    setErrorCallbackQR(true);
  };

  const handleChangeDate = (date: Dayjs | null) => {
    const currentTime = getTimePart() || '00:00:00';
    const newDateTime = `${dayjs(date).format('YYYY-MM-DD')} ${currentTime}`;
    setValue('stockDate', newDateTime);
  };

  const handleCloseBarCode = () => {
    openBarcodeProps.onClose();
    setValue(MartProductStock.fields.barCodeDisplay, undefined);
    setValue(MartProductStock.fields.productName, undefined);
    setValue(MartProductStock.fields.productIdDisplay, undefined);
    setValue(MartProductStock.fields.productIdSearch, undefined);
    setDecodedResults(undefined);
    setProductStock(undefined);
    setErrorCallbackQR(false);
  };

  const handleChangeTime = (time: Dayjs | null) => {
    const currentDate = getDatePart() || dayjs().format('YYYY-MM-DD');
    const newDateTime = `${currentDate} ${dayjs(time).format('HH:mm:ss')}`;
    setValue('stockDate', newDateTime);
  };

  const handleOpenBarcode = () => {
    openBarcode();
  };

  const onSearchProductId = (value: Obj) => {
    fetchAndSetProductBaseOnQuery(undefined, value?.productIdSearch);
  };

  const handleRegisterProductStock = () => {
    const fieldsToUpdate: Partial<Record<keyof typeof MartProductStock.fields, typeof MartProductStock.fields>> = {
      [MartProductStock.fields.productId]: productStock?.id,
      [MartProductStock.fields.name]: productStock?.name,
      [MartProductStock.fields.registrationName]: productStock?.registrationName,
      [MartProductStock.fields.quantityBefore]: productStock?.quantity,
      [MartProductStock.fields.quantityAfter]: productStock?.quantity,
      [MartProductStock.fields.quantityStocked]: 0,
    };
    Object.entries(fieldsToUpdate).forEach(([key, value]) => {
      if (key in MartProductStock.fields) {
        setValue(MartProductStock.fields[key as keyof typeof MartProductStock.fields], value);
      }
    });
    handleCloseBarCode();
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
                <Grid xs={6} display="flex" justifyContent="center">
                  <FormInput
                    control={control}
                    fullWidth
                    name={MartProductStock.fields.productId}
                    InputProps={{
                      readOnly: true,
                      style: { cursor: 'pointer' },
                      onClick: handleOpenBarcode,
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
      {openBarcodeProps.open ? (
        <Dialog
          buttons={[
            {
              label: '인식 상품 선택',
              color: 'primary',
              variant: 'contained',
              type: 'button',
              // 'aria-hidden': 'true',
              onClick: handleRegisterProductStock,
              disabled: !productStock?.id,
            },
          ]}
          title="바코드"
          closeAfterTransition={false}
          open={openBarcodeProps.open}
          onClose={handleCloseBarCode}
          fullScreen={isMobile}
          contentsSx={{
            flex: 'unset',
          }}
          actionsSx={{ px: 3 }}
        >
          {/* <Grid xs={12} display="flex" justifyContent="start" alignItems="center" pb={2}>
            <Typography variant="h5" component="h5">
              상품 입고 등록
            </Typography>
          </Grid>{' '} */}
          <ReactScanBarCode
            ref={qrRef}
            fps={10}
            qrbox={250}
            disableFlip={false}
            onResetOutSideState={onClearQueryBarcode}
            qrCodeSuccessCallback={onNewScanResult}
            onErrorTimeoutCallback={onErrorTimeoutCallback}
          />
          {/* INFO PRODUCT WHEN SCAN BARCODE */}
          {/* BAR CODE */}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">바코드</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <FormInput
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: '#f0f0f0', color: '#808080' },
                }}
                control={control}
                name={MartProductStock.fields.barCodeDisplay}
              />
            </TableGridBodyCustom>
          </Grid>
          {/* 상품 ID */}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">상품 ID</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <Grid container direction="row" alignItems="center" sx={{ backgroundColor: '#f0f0f0' }}>
                <Grid xs={6} display="flex" justifyContent="center">
                  <FormInput
                    control={control}
                    fullWidth
                    name={MartProductStock.fields.productIdDisplay}
                    InputProps={{
                      readOnly: true,
                      style: { cursor: 'pointer' },
                    }}
                  />
                </Grid>
                {errorCallbackQR ? (
                  <Grid xs={6} display="flex" justifyContent="end" px={1}>
                    <Button
                      variant="contained"
                      sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
                      onClick={() => {
                        openInputBarCodeManual(), qrRef.current?.stopQR();
                      }}
                    >
                      상품 입고 등록
                    </Button>
                  </Grid>
                ) : (
                  false
                )}
              </Grid>
            </TableGridBodyCustom>
          </Grid>
          {/* DISPLAYNAME */}
          <Grid container xs={12} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">상품 이름</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <FormInput
                fullWidth
                name={MartProductStock.fields.productName}
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: '#f0f0f0', color: '#808080' },
                }}
              />
            </TableGridBodyCustom>
          </Grid>
        </Dialog>
      ) : null}
      <Dialog
        buttons={[
          {
            label: '확인',
            color: 'primary',
            variant: 'contained',
            type: 'submit',
            form: CreateProductStockForm.searchProduct,
          },
        ]}
        title="상품 ID 직접 입력하기"
        open={openInputBarCodeManualProps.open}
        onClose={openInputBarCodeManualProps.onClose}
        closeAfterTransition={false}
        maxWidth={'lg'}
      >
        <form id={CreateProductStockForm.searchProduct} onSubmit={handleSubmit(onSearchProductId)}>
          <Grid container xs={12} width={'480px'} sx={{ border: '1px solid #E0E2EC' }}>
            <TableHeadCustom>
              <Typography variant="inherit">상품 ID</Typography>
            </TableHeadCustom>
            <TableGridBodyCustom>
              <FormInput control={control} fullWidth name={MartProductStock.fields.productIdSearch} />
            </TableGridBodyCustom>
          </Grid>
        </form>
      </Dialog>
      <Dialog
        buttons={[
          {
            label: '확인',
            color: 'primary',
            variant: 'contained',
            onClick: openDialogErrorProps.onClose,
          },
        ]}
        title="알림"
        open={openDialogErrorProps.open}
        hideCancelButton={true}
        onClose={openDialogErrorProps.onClose}
        hideCloseIcon={true}
        closeAfterTransition={false}
        maxWidth={'lg'}
        actionsSx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Typography textAlign="center">
            입력한 ID의 상품이 없습니다.
            <br />
            영업매니저 웹에서 상품을 먼저 등록하세요.
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateStockManagementForm;
