import { ReactNode, ReactElement } from 'react';
import { Any, CoreValue, ID, OrPromise } from 'constants/types';

// label will be string or ReactNode, set Any because that some of the components check strict type
export type Option<D = Any> = { label: Any; value: D };

export type SelectOption<D = Any> = Option<D> & {
  disabled?: boolean;
  readonly?: boolean;
  icon?: ReactElement;
  treeDataPath?: ID[];
};

export type SearchSelectOption<D = Any> = SelectOption<D> & {
  searchText?: string;
  avatar?: ReactElement;
  groupKey?: string;
};

export type DropdownOption = {
  label: Any;
  onClick?: () => void;
  disabled?: boolean;
};

export type MenuItem = {
  label?: Any;
  icon?: ReactNode;
  hidden?: boolean;
} & (
  | {
      linkTo: string;
    }
  | {
      onClick: () => void;
    }
);

export type MenuGroup = {
  label: Any;
  icon?: ReactNode;
  baseLink?: string;
  children: MenuItem[];
};

export type MenuItemOrGroup = MenuItem | MenuGroup;

type OnChangeHandler<Value> = (newValue: Value, prevValue: Value, ...args: Any) => OrPromise<void>;

export type OnChange<Value extends CoreValue = CoreValue> = OnChangeHandler<Value>;
export type OnChangeMultiple<Value extends CoreValue = CoreValue> = OnChangeHandler<Value[]>;
export type OnChangeBoolean = OnChangeHandler<boolean>;
