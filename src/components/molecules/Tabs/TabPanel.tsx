import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import MuiTabPanel from '@mui/lab/TabPanel';
import { TabProps } from '@mui/material/Tab';

type Props = PropsWithChildren<{
  className?: string;
  value: TabProps['value'];
}>;

const TabPanel = ({ value, className, children }: Props) => {
  return (
    <MuiTabPanel value={value} className={className}>
      {children}
    </MuiTabPanel>
  );
};

const StyledTabPanel = styled(TabPanel)`
  &.MuiTabPanel-root {
    padding: 8px 0;
  }
`;

export default StyledTabPanel;
