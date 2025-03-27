import { BaseDto } from '../base';
import { MartProductType } from './martProduct';

export type MartProductCategoryDto<Server extends boolean = false> = {
  name: string;
  type: MartProductType;
  description?: string;
} & BaseDto<Server>;

export type MartProductCategoryBody = {
  name: string;
  type: MartProductType;
  description?: string;
};
