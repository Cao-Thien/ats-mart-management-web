import { Obj } from 'constants/types';

export const isSameFieldValueInArray = <D extends Obj, K extends keyof D>(arrayObj: D[], fieldName: keyof Pick<D, K>) =>
  arrayObj.every(obj => obj[fieldName] === arrayObj[0][fieldName]);
