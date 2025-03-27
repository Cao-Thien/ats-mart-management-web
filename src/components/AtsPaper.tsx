'use client';
import { Box, Paper, PaperProps, Typography } from '@mui/material';
import useResponsive from 'hooks/useResponsive';

export default function AtsPaper(props: PaperProps) {
  const { title, children, sx = {}, ...other } = props;
  const { isMobile } = useResponsive();
  return (
    <Paper
      className="AtsPaper"
      elevation={0}
      {...other}
      sx={{
        p: isMobile ? 1.5 : 3,
        borderRadius: '12px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.04)',
        ...sx,
      }}
    >
      {title && (
        <Typography variant="subtitle1" component="h6">
          {title}
        </Typography>
      )}

      <Box mt={1.5} height="100%" width="100%">
        {children}
      </Box>
    </Paper>
  );
}
