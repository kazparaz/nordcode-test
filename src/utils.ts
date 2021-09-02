export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function isOneOf<T extends string | number | boolean>(
  value: string | number | boolean | undefined,
  array: T[] | readonly T[]
): value is T {
  return typeof value !== 'undefined' && array.includes(value as T)
}
