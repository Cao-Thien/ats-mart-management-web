import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const BarcodeIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" {...props}>
      <path d="M23 4.5V8h-1V4.5A1.502 1.502 0 0 0 20.5 3H17V2h3.5A2.503 2.503 0 0 1 23 4.5zM4.5 22A1.502 1.502 0 0 1 3 20.5V17H2v3.5A2.503 2.503 0 0 0 4.5 23H8v-1zM22 20.5a1.502 1.502 0 0 1-1.5 1.5H17v1h3.5a2.503 2.503 0 0 0 2.5-2.5V17h-1zM3 4.5A1.502 1.502 0 0 1 4.5 3H8V2H4.5A2.503 2.503 0 0 0 2 4.5V8h1zM10 19V6H9v13zM6 6v13h2V6zm8 13V6h-2v13zm3-13v13h2V6zm-2 0v13h1V6z" />
      <path fill="none" d="M0 0h24v24H0z" />
    </SvgIcon>
  );
};
