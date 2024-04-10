export function trimValues(
  obj: Record<string, string>
): Record<string, string> {
  return Object.entries(obj).reduce(
    (acc: Record<string, string>, [key, value]) => {
      acc[key] = value.trim();
      return acc;
    },
    {}
  );
}
