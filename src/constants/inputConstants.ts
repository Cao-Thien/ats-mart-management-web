import { ReactElement } from 'react';
import { Any, Value, CoreValue, ID, OrPromise } from 'constants/types';

// label will be string or ReactNode, set Any because that some of the components check strict type
export type Option<D = Any> = { label: Any; value: D };

export type SelectOption<D = Any> = Option<D> & {
  disabled?: boolean;
  readonly?: boolean;
  icon?: ReactElement;
  treeDataPath?: ID[];
};

type OnChangeHandler<ChangeValue> = (newValue: ChangeValue) => OrPromise<void>;

export type OnChange<ChangeValue extends Value = CoreValue> = OnChangeHandler<ChangeValue>;
export type OnChangeMultiple<ChangeValue extends CoreValue = CoreValue> = OnChangeHandler<ChangeValue[]>;
