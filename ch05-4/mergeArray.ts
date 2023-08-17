export const mergeArray = <T>(...arrays: readonly T[][]): T[] => {
  let result: T[] = []
  for (let index = 0; index < arrays.length; index++){
    const array: T[] = arrays[index]
    /* result와 array 배열을 각각 전개하고 결합해야 T[] 타입 배열을 생성할 수 있다. */
    result = [...result, ...array]
  }
  return result
}