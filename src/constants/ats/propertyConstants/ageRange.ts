import { BaseDto } from '../base';

export type AgeRangeDto<Server extends boolean = false> = {
  name: string;
  naverName: string | null;
  fromAge: number;
  toAge: number;
  imageUrl: string | null;
  appliedStartDate: string | null;
  appliedEndDate: string | null;
  description: string | null;
  noPublic: boolean;
  printedName?: string;
} & BaseDto<Server>;

export type AgeRangeBody = {
  name: string;
  naverName?: string;
  fromAge: number;
  toAge: number;
  appliedStartDate?: string;
  appliedEndDate?: string;
  description?: string;
  clientId?: string | number;
  noPublic: boolean;
  printedName?: string;
};
