export const EFF_FILTER = `function filter<Type = any>(
  arr: Type[],
  callback: (value: Type) => boolean
): Type[] {
  const newArray = [];
  const totalLength = arr.length;
  const isOddLength = totalLength % 2 !== 0;

  let index = ~~(totalLength / 2);
  if (isOddLength) {
    if (callback(arr[index + 1])) newArray.push(arr[index + 1]);
  }

  while (index > 0) {
    const forwardIndex = (totalLength - index) + 1;
    const backwardIndex = index;
    if (arr[forwardIndex] !== undefined && callback(arr[forwardIndex])) {
      newArray.push(arr[forwardIndex]);
    }
    if (arr[backwardIndex] !== undefined && callback(arr[backwardIndex])) {
      newArray.unshift(arr[backwardIndex]);
    }
    index -= 1;
  }

  return newArray;
}`;

export const EFF_MAP = `function map<Type = any,ReturnType=any>(
  arr: Type[],
  callback: (value: Type) => ReturnType
): ReturnType[] {
  const newArray = [];
  const totalLength = arr.length;
  const isOddLength = totalLength % 2 !== 0;

  let index = ~~(totalLength / 2);
  if (isOddLength) {
    newArray.push(callback(arr[index + 1]));
  }

  while (index >= 0) {
    const forwardIndex = (totalLength  - index) + 1;
    const backwardIndex = index;
    if (arr[forwardIndex]) {
       newArray.push(callback(arr[forwardIndex])); 
    }

    newArray.unshift(callback(arr[backwardIndex]));
    index -= 1;
  }

  return newArray;
}`;

export const UNORDERED_EFF_FOR_EACH = `function forEach<Type = any>(
  arr: Type[],
  callback: (value: Type) => void
): void {
  const totalLength = arr.length;
  const isOddLength = totalLength % 2 !== 0;

  let index = ~~(totalLength / 2);
  if (isOddLength) {
    callback(arr[index + 1]);
  }

  while (index > 0) {
    const forwardIndex = (totalLength - index) + 1;
    const backwardIndex = index;
    if (arr[forwardIndex] !== undefined) {
      callback(arr[forwardIndex])
    }
    if (arr[backwardIndex] !== undefined) {
      callback(arr[backwardIndex])
    }
    index -= 1;
  }
}`;
