// Duplicate a prop string
export type OneOfSamePropWithSpace<Prop extends string, Max extends number> = Max extends 2
  ? Prop | `${Prop} ${Prop}`
  : Max extends 3
    ? Prop | `${Prop} ${Prop}` | `${Prop} ${Prop} ${Prop}`
    : Max extends 4
      ? Prop | `${Prop} ${Prop}` | `${Prop} ${Prop} ${Prop}` | `${Prop} ${Prop} ${Prop} ${Prop}`
      : never;

export type OneOfDiffPropWithSpace<
  First extends string,
  Second extends string | undefined = undefined,
  Third extends string | undefined = undefined,
  Fourth extends string | undefined = undefined,
> = Second extends undefined
  ? First
  : Third extends undefined
    ? First | Second | `${First} ${Second}`
    : Fourth extends undefined
      ? First | Second | Third | `${First} ${Second}` | `${Second} ${Third}` | `${First} ${Second} ${Third}`
      :
          | First
          | Second
          | Third
          | Fourth
          | `${First} ${Second}`
          | `${First} ${Third}`
          | `${First} ${Fourth}`
          | `${Second} ${Third}`
          | `${Second} ${Fourth}`
          | `${Third} ${Fourth}`
          | `${First} ${Second} ${Third}`
          | `${First} ${Second} ${Fourth}`
          | `${First} ${Third} ${Fourth}`
          | `${Second} ${Third} ${Fourth}`
          | `${First} ${Second} ${Third} ${Fourth}`;
