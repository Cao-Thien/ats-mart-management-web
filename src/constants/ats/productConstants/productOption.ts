import { AndMore } from 'constants/types';
import { BaseDto } from '../base';

export enum ProductOptionType {
  Choice = 'CHOICE',
  Value = 'VALUE',
}

export type ChoiceOptions = {
  label: string;
  isDefault: boolean;
  price: number;
};

export type ValueOptions = {
  name: string;
  defaultValue: number;
  min: number;
  max: number;
  price: number;
};

export type ProductOptionDto<Server extends boolean = false> = {
  name: string;
  type: ProductOptionType;
  options: (ChoiceOptions | ValueOptions)[];

  choiceOptions?: ChoiceOptions[];
  valueOption?: AndMore<Omit<ValueOptions, 'name'>>;
} & BaseDto<Server>;

export type ProductOptionBody = {
  name: string;
  type: ProductOptionType;
  // options: (ChoiceOptions | ValueOptions)[];
  choiceOptions?: ChoiceOptions[];
  valueOption?: AndMore<Omit<ValueOptions, 'name'>>;
};
