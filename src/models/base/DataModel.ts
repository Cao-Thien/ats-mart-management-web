import BaseDataModel from 'utils/dataModel/BaseDataModel';

import { Obj } from 'constants/types';

let clientIdCounter = 1;

abstract class DataModel<Model extends Obj> extends BaseDataModel<Model> {
  /**
   * Temporary id used for creating case
   */
  clientId?: string | number = undefined;

  setClientId() {
    this.clientId = `${this.constructor.name}-${clientIdCounter++}`;
  }

  /**
   * Returns a unique identifier for the object.
   *
   * @return {string} The unique identifier, which is either the object's id or the object's clientId.
   */
  get uniqueId() {
    return `${this.id || this.clientId}`;
  }
}

export default DataModel;
