import styled from '@emotion/styled';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ResourceType } from 'actions/uploadAction';
import Dialog from './Dialog';
import useOpen from 'hooks/useOpen';
import Image from 'next/image';

import Cropper, { Area } from 'react-easy-crop';
import Box from '@mui/material/Box';
import { Any } from 'constants/types';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export type FileType = {
  previewImage?: string;
  formData: FormData;
  file?: File;
};

type Props = {
  onChange: (file: FileType) => void;
  uploadType: ResourceType;
};

export default function UploadButton({ onChange, uploadType }: Props) {
  const imageRef = useRef<Any>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [openCropImage, openCropImageProps] = useOpen();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppingImage, setCroppingImage] = useState<string>();
  const [previewImageBlob, setPreviewImageBlob] = useState<string>();
  const [fileToSave, setFileToSave] = useState<File>();

  useEffect(
    () => () => {
      resetAll();
    },
    []
  );

  const resetAll = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppingImage(undefined);
    setPreviewImageBlob(undefined);
    imageRef.current = null;
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files || [])[0];

    setCroppingImage(URL.createObjectURL(file));
  };

  const onSubmitCrop = () => {
    const formData = new FormData();

    formData.append('resourceType', uploadType);
    formData.append('files', fileToSave!);

    onChange({
      formData,
      previewImage: previewImageBlob,
      file: fileToSave,
    });

    resetAll();
    openCropImageProps.onClose();
  };

  const onImageLoaded = (e: React.RefObject<HTMLImageElement>) => {
    imageRef.current = e.current;
  };

  const onCropComplete = (cropArea: Area, croppedAreaPixels: Area) => {
    if (croppedAreaPixels && croppingImage && imageRef.current) {
      const image = imageRef.current;
      const canvas = document.createElement('canvas');

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return null;
      }

      // (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob: Blob | null) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }

        const fileUrl = URL.createObjectURL(blob);

        setFileToSave(new File([blob], 'image.png'));
        setPreviewImageBlob(fileUrl);
      });
    }
  };

  return (
    <div>
      <Button component="label" startIcon={<CloudUploadIcon />}>
        업로드
        <VisuallyHiddenInput
          type="file"
          ref={inputRef}
          onChange={e => {
            onFileChange(e);
            openCropImage();
          }}
        />
      </Button>

      <Dialog
        maxWidth="lg"
        title="Crop"
        open={openCropImageProps.open}
        onClose={() => {
          resetAll();
          openCropImageProps.onClose();
        }}
        buttons={[
          {
            label: 'Crop',
            onClick: onSubmitCrop,
          },
        ]}
      >
        <Box width="100vh" height="40vh" position="relative" bgcolor="white">
          <Cropper
            image={croppingImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            setImageRef={onImageLoaded}
          />
        </Box>
        <Box textAlign="center">
          {previewImageBlob && <Image src={previewImageBlob} width={300} height={300} alt="" />}
        </Box>
      </Dialog>
    </div>
  );
}
