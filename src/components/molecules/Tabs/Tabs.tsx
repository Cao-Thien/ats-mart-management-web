import { PropsWithChildren } from 'react';

// COMPONENTS
import TabContext from '@mui/lab/TabContext';
import TabBar, { TabBarProps } from 'components/molecules/Tabs/TabBar';
export { useTabContext } from '@mui/lab/TabContext';

// HOOKS
// import useActiveItem from 'hooks/element/useActiveItem';
import useInputQuery from 'hooks/router/useInputQuery';

export type TabsProps = PropsWithChildren<Omit<TabBarProps, 'value' | 'onChange'>> & {
  tabQuery: string;
};

const Tabs = ({ tabQuery, defaultValue, className, children, ...restProps }: TabsProps) => {
  const [activeTab, onActiveTabChange] = useInputQuery(tabQuery, defaultValue);

  return (
    <TabContext value={activeTab!}>
      <div>
        <TabBar value={activeTab!} onChange={onActiveTabChange} className={className} {...restProps} />

        {children}
      </div>
    </TabContext>
  );
};

export default Tabs;
