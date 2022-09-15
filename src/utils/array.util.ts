export function generateMap<T>(
  arry: any[],
  key: keyof T
): { [key: string]: T } {
  try {
    return (
      arry?.reduce(
        (acc: { [key: string]: T }, item) => ({
          ...acc,
          [item?.[key]]: item,
        }),
        {}
      ) || []
    );
  } catch (error) {
    return {};
  }
}

export function addIfTrue<T>(condition: boolean, item: T) {
  return condition ? [item] : [];
}
