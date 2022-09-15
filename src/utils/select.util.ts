export function handleSearch(input: string, option: any) {
  return (
    option?.children?.[1]?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
  );
}
