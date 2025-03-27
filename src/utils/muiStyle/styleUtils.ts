// Make array from keys of a map
// The map is used to check if a value is missing
// Example:
//   { primary: true, secondary: true } => ['primary', 'secondary']
export const mapKeysToArray = <Key extends string>(map: Record<Key, true>) => Object.keys(map) as Key[];

// Uppercase the first letter of a string
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
