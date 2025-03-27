import { Box, MenuItem, Select, Typography, SelectChangeEvent, SelectProps, BoxProps } from '@mui/material';
import { Any } from 'constants/types';
import CloseIcon from '@mui/icons-material/Close';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export type AtsSelectProps = SelectProps<Any> &
  BoxProps & {
    data?: Any[];
    focused?: boolean;
    hiddenCloseIcon?: boolean;
    onClearSelected?: () => void;
  };

export default function AtsSelect(props: AtsSelectProps) {
  const {
    label,
    value,
    placeholder,
    hiddenCloseIcon = true,
    data = [],
    onChange = () => {},
    sx = {},
    onClearSelected = () => {},
    disabled = false,
    ...other
  } = props;

  return (
    <Box
      {...other}
      position="relative"
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
    >
      {label && <Typography sx={{ fontWeight: 500 }}>{label}</Typography>}
      <Select
        value={value}
        displayEmpty
        onChange={onChange}
        disabled={disabled}
        sx={{
          ml: label ? '16px' : '',
          width: '210px',
          // borderRadius: '9999px',
          color: '#2D3038',
          fontSize: '14px',
          fontWeight: 500,
          px: '6px',
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #E0E2EC',
          },
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #D0D2DC',
            },
          },
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08), 0px 12px 20px 0px rgba(0, 0, 0, 0.04)',
              },
            },
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderValue={(selected: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const item = data.find((item: any) => item.value === selected);
          return <span style={{ color: '#74777F' }}>{item?.name || placeholder}</span>;
        }}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.map((item: any) => (
          <MenuItem
            value={item.value}
            key={item.value}
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              height: '56px',
              '&:not(:last-child)': {
                borderBottom: '1px solid #E0E2EC',
              },
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {value !== undefined && !hiddenCloseIcon && (
        <CloseIcon
          onClick={onClearSelected}
          fontSize="small"
          color="error"
          sx={{ cursor: 'pointer', mx: 2, position: 'absolute', right: 20 }}
        />
      )}
    </Box>
  );
}

export type { SelectChangeEvent };
