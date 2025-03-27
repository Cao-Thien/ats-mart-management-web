type AtKey<Dto> = Extract<keyof Dto, `${string}At`>;

export type TransformedDto<Dto> = Omit<Dto, AtKey<Dto>> & {
  [K in AtKey<Dto>]: null extends Dto[K] ? Date | null : Date;
};
