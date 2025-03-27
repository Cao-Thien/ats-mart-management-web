export type ID = string | number;

export type OneOrMany<T> = T | T[];

// eslint-disable-next-line
export type Any = any;

export type Obj<V = Any> = Record<string, V>;
