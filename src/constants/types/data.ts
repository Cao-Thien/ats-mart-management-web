import { Obj } from './common';

export type ID = string | number;

// For readable ID reason
export type StrID = string;
export type NumID = number;

export type WithId<Attrs> = { id: ID } & Attrs;

export type ByKey<O extends Obj, K extends keyof O> = { [key in O[K]]: O };

export type ById<O extends Obj> = ByKey<O, 'id'>;

export type MethodExcludedProperties<T> = Pick<
  T,
  {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;

export type OrPromise<Result> = Result | Promise<Result>;

// JavaScript has 8 Datatypes
// 1. String
// 2. Number
// 3. Bigint
// 4. Boolean
// 5. Undefined
// 6. Null
// 7. Symbol
// 8. Object
//
// The Object Datatype
// The object data type can contain:
//
// 8-1. An object
// 8-2. An array
// 8-3. A date

// Core value to use in most cases
export type CoreValue = string | number;

export type NullableCoreValue = CoreValue | null;

// Basic value to use
export type Value = CoreValue | boolean;

export type NullableValue = Value | null;

// Non-null value
export type PrimitiveValue = Value | bigint | symbol;

// An object which value is same as key
export type Field<F extends string> = Record<F, F>;

// Same as Field but extract keys from a model and take them as key and value
export type AttrField<Model, Key extends keyof Model> = Record<keyof Pick<Model, Key>, keyof Pick<Model, Key>>;

export type TreeItem<I = Obj> = I & {
  id: ID;
  depth: number;
  children: TreeItem<I>[];
};

export type DraftTreeItem<I = Obj> = I & {
  depth?: number;
  children?: DraftTreeItem<I>[];
};
