// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export type Obj<V = Any> = Record<string, V>;

export type ObjMap<V = Any, F extends string | number = string> = { [key in F]?: V };

export type AndMore<V extends Obj> = V & Obj;

export type MaybeMore<T extends Obj> = Partial<T> & Obj;

export type OneOrMany<T> = T | T[];

export type PickProps<T, K extends keyof T> = Required<Pick<T, K>>;

export type PropsAttr<T, K extends keyof T> = Required<T>[K];

export type OrResultFunc<Rs, Params = undefined> = Rs | ((params?: Params) => Rs);
