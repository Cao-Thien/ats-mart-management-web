import { CoreValue } from 'constants/types';
// import cl from 'clsx';
// import styled from '@emotion/styled';

// COMPONENTS
import Tab, { TabProps } from '@mui/material/Tab';
import TabList, { TabListProps } from '@mui/lab/TabList';

// UTILS
// import { capitalize } from 'utils/general/stringUtils';

// Following https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ implemented by @mui/lab
// TabList needs to be a child of "@mui/lab/TabContext"
// @see https://mui.com/material-ui/react-tabs/#experimental-api

export type TabBarProps = Pick<
  TabListProps,
  'centered' | 'orientation' | 'textColor' | 'indicatorColor' | 'className' | 'variant'
> & {
  items: Array<Pick<TabProps, 'label' | 'value' | 'icon' | 'wrapped' | 'disabled'>>;
  defaultValue?: CoreValue;
  value?: CoreValue;
  onChange?: (value: CoreValue) => void;
} & TabBarUtilityProps;

const TabBar = ({ items, onChange, ...restProps }: TabBarProps) => {
  const handleChange: TabListProps['onChange'] = onChange
    ? (event, newValue) => {
        onChange(newValue);
      }
    : undefined;

  return (
    <TabList
      // className={cl(className, getUtilityClasses({ fullWidth, styleType }))}
      onChange={handleChange}
      {...restProps}
    >
      {items.map(tabProps => (
        <Tab key={tabProps.value} {...tabProps} className="Tab-Item" />
      ))}
    </TabList>
  );
};

type TabBarUtilityProps = {
  fullWidth?: boolean;
  styleType?: 'default' | 'filled';
};

// const getUtilityClasses = ({ fullWidth, styleType }: TabBarUtilityProps) => {
//   const classNames: string[] = [];
//
//   if (fullWidth) classNames.push('Box-fullWidth');
//   if (styleType) classNames.push(`TabBar-style${capitalize(styleType)}`);
//
//   return classNames.join(' ');
// };

// const utilityCss = css`
//   &.TabBar-bordered {
//     border-bottom: 1px solid ${p => p.theme.palette.divider};
//   }
// `;

// const StyledTab = styled(TabBar)`
//   .Tab-Item {
//     @media (max-width: ${p => p.theme.breakpoints.values.sm}px) {
//       min-width: auto !important;
//     }
//   }
//
//   &.TabBar-bordered {
//     border-bottom: 1px solid ${p => p.theme.palette.divider};
//   }
//
//   &.TabBar-styleFilled {
//     @media (min-width: ${p => p.theme.breakpoints.values.sm}px) {
//       border-bottom: 1px solid ${p => p.theme.palette.primary.main};
//     }
//
//     .MuiTabs-flexContainer {
//       @media (min-width: ${p => p.theme.breakpoints.values.sm}px) {
//         gap: 12px;
//       }
//     }
//
//     .MuiTabs-indicator {
//       display: none;
//     }
//
//     .MuiTab-root {
//       width: 50%;
//       background-color: ${p => p.theme.palette.background.paper};
//       color: ${p => p.theme.palette.text.primary};
//
//       @media (min-width: ${p => p.theme.breakpoints.values.sm}px) {
//         width: 160px;
//         font-size: 16px;
//         font-weight: 500;
//         line-height: 1.25;
//         border-radius: 12px 12px 0 0;
//       }
//     }
//
//     .Mui-selected {
//       border-bottom: 2px solid ${p => p.theme.palette.primary.main};
//       color: ${p => p.theme.palette.primary.main};
//
//       @media (min-width: ${p => p.theme.breakpoints.values.sm}px) {
//         background-color: ${p => p.theme.palette.primary.main};
//         color: ${p => p.theme.palette.primary.contrastText};
//       }
//     }
//   }
// `;

export default TabBar;
