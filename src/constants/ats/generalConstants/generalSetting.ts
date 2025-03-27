import { BaseDto } from '../base';

export enum SettingKey {
  OrderCancellationGradePeriod = 'OrderCancellationGradePeriod',
}

export type SettingValues = {
  [SettingKey.OrderCancellationGradePeriod]: number;
};

export type GeneralSettingDto<Server extends boolean = false> = {
  value: SettingValues[SettingKey];
  valueType: string;
} & BaseDto<Server>;

export type GeneralSettingBody = {
  value: SettingValues[SettingKey];
};
