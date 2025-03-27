import React, { useEffect, useState } from 'react';
import { Box, Backdrop } from '@mui/material';
import Image from 'next/image';
import amazonLogo from 'assets/images/logo/amazonlogo_final.svg';

type AtsLoadingProps = {
  open: boolean;
};

const AtsLoading = ({ open }: AtsLoadingProps) => {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    if (open) {
      setTimeout(() => setOpacity(1), 100);
    } else {
      setOpacity(0);
    }
  }, [open]);

  if (!open) return;

  return (
    <Backdrop open={open} sx={{ zIndex: 9999, color: '#fff' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* <Image alt="loading" width={280} height={100} src={amazonLogo} /> */}
        <Box
          sx={{
            opacity,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <Image alt="loading" width={280} height={100} src={amazonLogo} />
        </Box>
        {/* <CircularProgress color="inherit" /> */}
      </Box>
    </Backdrop>
  );
};

export default AtsLoading;
