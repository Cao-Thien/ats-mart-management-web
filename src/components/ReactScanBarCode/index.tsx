import { Button, Grid } from '@mui/material';
import { Html5Qrcode, Html5QrcodeCameraScanConfig, Html5QrcodeResult } from 'html5-qrcode';
import Image from 'next/image';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

type Html5QrcodePluginProps = {
  fps?: number;
  qrbox?: number | ((viewfinderWidth: number, viewfinderHeight: number) => number);
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: (decodedText: string, decodedResult: Html5QrcodeResult) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
  onResetOutSideState?: () => void;
  onErrorTimeoutCallback?: () => void;
};

const qrcodeRegionId = 'html5qr-code-full-region';

const createConfig = (props: Html5QrcodePluginProps) => {
  const config = {} as Html5QrcodePluginProps;
  if (props.fps) config.fps = props.fps;
  if (props.qrbox) config.qrbox = props.qrbox;
  if (props.aspectRatio) config.aspectRatio = props.aspectRatio;
  if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip;
  return config;
};

export type ReactScanBarCodeRef = {
  resetQR: () => void;
  stopQR: () => void;
};

const TIMEOUT_SCANNER = 10000; //10S
const TIMEOUT_SCANNER_ERROR = 4000; //10S

const ReactScanBarCode = forwardRef<ReactScanBarCodeRef, Html5QrcodePluginProps>((props, ref) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState<'scanning' | 'stopped' | 'error'>('stopped');
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMount = useRef(false);

  useEffect(() => {
    startScanQR();
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    if (html5QrCodeRef.current?.isScanning) {
      html5QrCodeRef.current.stop().catch();
    }

    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current = null;
    }
    isMount.current = false;
  }

  useImperativeHandle(ref, () => ({
    resetQR, //Public this method outside to can be use any where
    stopQR,
  }));

  async function startScanQR() {
    // if (!isMount.current) return;
    if (!props.qrCodeSuccessCallback) {
      throw new Error('qrCodeSuccessCallback is required callback.');
    }

    //CHECK IF IS SCANNING => STOP
    if (html5QrCodeRef.current && html5QrCodeRef.current?.isScanning) {
      await html5QrCodeRef.current.stop().catch(console.error);
    }
    const html5QrCode = new Html5Qrcode(qrcodeRegionId);
    html5QrCodeRef.current = html5QrCode;
    const config = createConfig(props);

    setStatus('scanning');

    try {
      const devices = await Html5Qrcode.getCameras();
      if (!devices.length) {
        throw new Error('No camera found');
      }

      const cameraId = devices[0].id; //GET THE FIRST CAMERA
      removeScannedClass();

      timeoutRef.current = setInterval(() => {
        // setStatus('error');
        props.onErrorTimeoutCallback?.();
        addErrorNotRecognize();
        errorTimeoutRef.current = setTimeout(() => {
          removeErrorNotRecognize();
        }, TIMEOUT_SCANNER_ERROR);
      }, TIMEOUT_SCANNER);

      await html5QrCode.start(
        cameraId,
        config as Html5QrcodeCameraScanConfig,
        (decodedText, decodedResult) => {
          // clearTimeout(timeoutId);
          // removeErrorNotRecognize();
          if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
            timeoutRef.current = null;
          }

          if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
            errorTimeoutRef.current = null;
          }

          const videoElement = document.getElementsByTagName('video');
          if (videoElement) {
            videoRef.current = videoElement[0] as HTMLVideoElement;
          }
          setStatus('stopped'); // 🛑 STOP
          addScannedClass();
          // addErrorNotRecognize();
          props.qrCodeSuccessCallback(decodedText, decodedResult);
          captureImage();
          // 🛑 STOP IMMEDIATELY WHEN SUCCESS
          html5QrCode
            .stop()
            .then(() => {
              removeErrorNotRecognize();
              if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current);
                errorTimeoutRef.current = null;
              }
            })
            .catch(error => {
              console.error('ERROR:', error);
              setStatus('error');
              props?.onResetOutSideState?.();
            });
        },
        props.qrCodeErrorCallback
      );
    } catch (error) {
      setStatus('error');
      props?.onResetOutSideState?.();
    }
  }

  function captureImage() {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setScannedImage(canvas.toDataURL('image/png')); // Save Temp base64
      }
    }
  }

  function removeScannedClass() {
    document.getElementById('html5qr-code-full-region')?.classList.remove('html5qr-code-full-region-no-animation');
  }

  function addScannedClass() {
    document.getElementById('html5qr-code-full-region')?.classList.add('html5qr-code-full-region-no-animation');
  }

  function addErrorNotRecognize() {
    document.getElementById('qr-error-message')?.classList.add('qr-error-visible');
  }

  function removeErrorNotRecognize() {
    document.getElementById('qr-error-message')?.classList.remove('qr-error-visible');
  }

  async function resetQR() {
    removeScannedClass();
    removeErrorNotRecognize();
    props?.onResetOutSideState?.();
    setScannedImage(null);
    setStatus('stopped');
    await startScanQR();
  }

  async function stopQR() {
    addScannedClass();
    // props?.onResetOutSideState?.();
    setScannedImage(null);
    setStatus('stopped');
    reset();
  }

  return (
    <>
      <div id={qrcodeRegionId} style={{ display: scannedImage ? 'none' : '' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div id="qr-error-message" className="qr-error-message">
        QR Code is not recognized!
      </div>
      {scannedImage && (
        <Image
          src={scannedImage}
          alt="Scanned QR Code"
          width={400}
          height={300}
          style={{ maxWidth: '100%', height: 'auto' }}
          priority
          unoptimized={false}
        />
      )}
      <Grid xs={12} py={2} container justifyContent="flex-end">
        <Button variant="contained" onClick={() => resetQR()} disabled={status == 'scanning'}>
          다시 인식하기
        </Button>
      </Grid>
    </>
  );
});
ReactScanBarCode.displayName = 'ReactScanBarCode';
export default ReactScanBarCode;
