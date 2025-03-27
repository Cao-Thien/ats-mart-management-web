import { InputBase, Paper } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AtsInputFieldLogin(props: any) {
  const { InputBaseProps = {}, IconProps = {}, sx = {}, ...other } = props;
  const { isMobile } = useResponsive();
  return (
    <Paper
      {...other}
      sx={{
        display: 'flex',
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: isMobile ? '368px' : '468px',
        width: '100%',
        height: '56px',
        p: '0 8px',
        borderTopLeftRadius: 0,
        borderTopRightRadius: '8px',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: '8px',
        borderLeft: '4px solid #1853A4',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.04)',
        ...sx,
      }}
    >
      {IconProps.src && <Image alt="Icon" width={48} height={48} {...IconProps}></Image>}
      <InputBase
        fullWidth
        {...InputBaseProps}
        sx={{
          height: '24px',
          flex: '1 0 0',
          ...InputBaseProps.sx,
        }}
      ></InputBase>
    </Paper>
  );
}
