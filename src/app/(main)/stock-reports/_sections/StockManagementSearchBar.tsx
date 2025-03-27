'use client';

import { useState } from 'react';

// COMPONENTS
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// HOOKS
import { useInputQuery } from 'hooks/router';

// CONSTANTS
import AtsTextField from '@/components/AtsTextField';
import { Divider, IconButton, InputAdornment, Typography } from '@mui/material';

type Props = {
  defaultSearchString?: string;
};

export default function StockManagementHeader({ defaultSearchString }: Props) {
  const [_searchStringQuery, setSearchStringQuery] = useInputQuery('name', defaultSearchString);
  const [searchString, setSearchString] = useState<string | undefined>();
  const handleSearch = () => {
    setSearchStringQuery(searchString);
  };

  const handleClearQuery = () => {
    setSearchStringQuery('');
    setSearchString('');
  };

  return (
    <Grid container spacing={2} xs={12} alignItems="center" width="100%">
      <Grid>
        <Typography variant="headline1">상품 이름 검색</Typography>
      </Grid>
      <Grid xs>
        <AtsTextField
          sx={{ maxWidth: '480px', width: '100%' }}
          placeholder="상품 이름 검색"
          defaultValue={defaultSearchString}
          value={searchString}
          onChange={event => setSearchString(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 24, mx: 0.5 }} orientation="vertical" />
                <IconButton onClick={handleClearQuery}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}
