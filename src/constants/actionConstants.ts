import { ID } from 'constants/types';

export type BatchCRUDProcessParams<Model> = {
  create?: Model[];
  update?: Model[];
  delete?: ID[];
};
