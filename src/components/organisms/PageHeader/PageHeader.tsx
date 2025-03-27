import { ReactNode } from 'react';

import { AppBar, Toolbar } from '@mui/material';

type Props = {
  toolbar?: ReactNode;
};

export default function PageHeader({ toolbar }: Props) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        borderRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        bgcolor: '#fff',
        color: '#74777F',
        left: '240px',
        width: '100%',
        height: '88px',
        zIndex: 999,
        px: '40px',
      }}
    >
      {toolbar && (
        <Toolbar
          sx={{
            columnGap: '48px',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          {toolbar}
        </Toolbar>
      )}
    </AppBar>
  );
}
