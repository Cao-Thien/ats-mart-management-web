import { Obj } from './common';

// For internal define use only
// eslint-disable-next-line @typescript-eslint/ban-types
type Func = Function;

type FuncAttrNames<T> = {
  [K in keyof T]: T[K] extends Func ? K : never;
}[keyof T];
export type Methods<T> = Pick<T, FuncAttrNames<T>>;

type NonFuncAttrNames<T> = {
  [K in keyof T]: T[K] extends Func ? never : K;
}[keyof T];

export type Attributes<T> = Pick<T, NonFuncAttrNames<T>>;

// todo: remove getter without setter
export type ConstructorAttributes<T> = Partial<Attributes<T>> & Obj;

// Type for WritableAttributes, not working
// type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;
//
// type WritableAttrNames<T> = {
//   [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>;
// }[keyof T];
//
// export type WritableAttributes<T> = Pick<T, WritableAttrNames<T>>;
