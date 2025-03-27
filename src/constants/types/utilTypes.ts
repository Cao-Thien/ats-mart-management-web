export type SetRequired<BaseType, Keys extends keyof BaseType = keyof BaseType> =
  // Pick just the keys that are not required from the base type.
  Pick<BaseType, Exclude<keyof BaseType, Keys>> &
    // Pick the keys that should be required from the base type and make them required.
    Required<Pick<BaseType, Keys>> extends infer InferredType // If `InferredType` extends the previous, then for each key, use the inferred type key.
    ? { [KeyType in keyof InferredType]: InferredType[KeyType] }
    : never;

export type PickRequired<BaseType, Keys extends keyof BaseType = keyof BaseType> = Pick<Required<BaseType>, Keys>;

export type PickKeys<BaseType, Keys extends keyof BaseType> = Keys;

export type IncludesNull<T> = null extends T ? true : false;

export type Diff<T, U> = T extends U ? never : T; // Remove types from T that are assignable to U

export type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U

export type TypeName<T> = T extends string
  ? 'string'
  : T extends number
    ? 'number'
    : T extends boolean
      ? 'boolean'
      : T extends undefined
        ? 'undefined'
        : // eslint-disable-next-line @typescript-eslint/ban-types
          T extends Function
          ? 'function'
          : 'object';
