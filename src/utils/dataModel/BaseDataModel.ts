import { Obj, ID, Any, AttrField, Attributes } from 'constants/types';
import { cloneDeep } from 'lodash';

abstract class BaseDataModel<Model extends Obj> {
  // ID
  id: ID = 0;

  // Auto generate created date
  createdAt?: string = undefined;

  updatedAt?: string = undefined;

  deletedAt?: string | null = undefined;

  protected static _baseField: AttrField<BaseDataModel<Obj>, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  };

  // Data loaded from BackEnd
  loaded = false;

  changedFields: (keyof Model)[] = [];
  // changedFields: (keyof Attributes<Model>)[] = [];

  // Init data in constructor
  protected init(obj: Obj) {
    for (const propertyKey in this) {
      if (!['$'].includes(propertyKey[0]) && obj[propertyKey] !== undefined) {
        this[propertyKey] = obj[propertyKey];
      }
    }
  }

  // Assign values to current model, exclude id, createdAt, updatedAt
  // This method is fast but does not check type
  public assign<Attr extends keyof Model>(newValues: Record<Attr, Model[Attr]>) {
    for (const attr in newValues) {
      if (attr in this && !['id', 'createdAt', 'updatedAt'].includes(attr)) {
        // @ts-ignore
        this[attr] = newValues[attr];
      }
    }

    return this;
  }

  // Assign values from an object
  // "attrFieldMap" is used to map from object to model, key is attribute name of model, value is field name of object
  // "attrParserMap" is used to format and/or transform value from object to model
  protected _assignFromObject<ValueObj extends Obj>(
    valueObj: ValueObj,
    attrFieldMap: { [attr in keyof Model]?: keyof ValueObj },
    attrParserMap?: {
      [attr in keyof Model]?: { type: 'item' | 'array'; transform: (value: Any) => Any } | { type: 'number' };
    }
  ) {
    let attr: keyof Model;
    for (attr in attrFieldMap) {
      const field = attrFieldMap[attr] as keyof ValueObj;
      const value = valueObj[field];

      if (value === undefined || !(attr in this)) {
        continue;
      }

      if (attrParserMap?.[attr] && value != null) {
        switch (attrParserMap[attr]?.type) {
          case 'item':
            // @ts-ignore
            this[attr] = attrParserMap[attr].transform(value);
            continue;

          case 'array':
            // @ts-ignore
            this[attr] = value.map(attrParserMap[attr].transform);
            continue;

          case 'number':
            // @ts-ignore
            this[attr] = Number(value);
            continue;
        }
      }

      // @ts-ignore
      this[attr] = value;
    }
  }

  // Extract current model to a plant object
  public json(): Attributes<Model> {
    const obj: Obj = {};

    for (const propertyKey in this) {
      if (this[propertyKey] && typeof this[propertyKey] === 'object') {
        if (Array.isArray(this[propertyKey])) {
          // @ts-ignore
          obj[propertyKey] = this[propertyKey].map(item => {
            if (typeof item === 'object' && 'json' in item) {
              return item.json();
            }

            return item;
          });

          continue;
        }

        // @ts-ignore
        if ('json' in this[propertyKey]) {
          // @ts-ignore
          obj[propertyKey] = this[propertyKey].json();
          continue;
        }
      }

      obj[propertyKey] = this[propertyKey];
    }

    return obj as Attributes<Model>;
  }

  // Map from server response payload
  protected _fromBaseResDto(payload: Obj): this {
    if (payload.id) {
      this.id = payload.id;
    }
    if (payload.createdAt) {
      this.createdAt = payload.createdAt;
    }
    if (payload.updatedAt) {
      this.updatedAt = payload.updatedAt;
    }
    this.loaded = true;

    return this;
  }

  // Self clone
  clone(): this {
    return cloneDeep(this);
  }

  /**
   * Set new values to the model and track the changed fields.
   *
   * @param newValues - The new values to set on the model.
   */
  set(newValues: Partial<Attributes<Model>>) {
    let field: keyof Attributes<Model>;
    for (field in newValues) {
      if (
        field in this &&
        !['id', 'createdAt', 'updatedAt'].includes(field) &&
        !field.startsWith('_') &&
        // @ts-ignore
        newValues[field] !== this[field]
      ) {
        if (!this.changedFields.includes(field)) {
          this.changedFields.push(field);
        }

        // @ts-ignore
        this[field] = newValues[field];
      }
    }
  }

  get hasChanged() {
    return this.changedFields.length > 0;
  }
}

export default BaseDataModel;
