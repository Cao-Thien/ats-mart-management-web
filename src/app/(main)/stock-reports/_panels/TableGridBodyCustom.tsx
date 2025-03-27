'use client';
import { Grid2Props } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

interface TableGridCustomProps extends Grid2Props {
  children: React.ReactElement | JSX.Element;
}

const TableGridBodyCustom = ({ children, ...rest }: TableGridCustomProps) => {
  return (
    <Grid
      xs={9}
      sx={{
        '& .MuiFormControl-root': {
          width: '100%',
        },
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
      }}
      {...rest}
    >
      {children}
    </Grid>
  );
};

export default TableGridBodyCustom;
