/* eslint-disable no-unused-vars */

export const asyncForEach = async <T>(
    array: T[],
    callback: (item: T, index: number, array: T[]) => Promise<void>
): Promise<void> => {
  
    await Promise.all(array.map(callback));
};  

