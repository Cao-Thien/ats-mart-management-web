'use client';
import { Grid2Props } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

interface TableGridCustomProps extends Grid2Props {
  children: React.ReactElement | JSX.Element;
}

const TableHeadCustom = ({ children, ...rest }: TableGridCustomProps) => {
  return (
    <Grid
      xs={3}
      display="flex"
      justifyContent={'center'}
      alignItems="center"
      sx={{
        // borderRight: '1px solid #E0E2EC',
        color: '#fff',
        backgroundColor: '#1853A4',
        borderRight: '1px solid #3C6EB3',
        outline: 'transparent',
      }}
      {...rest}
    >
      {children}
    </Grid>
  );
};

export default TableHeadCustom;
