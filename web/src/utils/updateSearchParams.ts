export function updateSearchParams(
  params: URLSearchParams,
  updates: Record<string, string>,
  setParams: (params: URLSearchParams) => void
) {
  const newParams = new URLSearchParams(params.toString());
  Object.entries(updates).forEach(([key, value]) => {
    if (value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });
  setParams(newParams);
}