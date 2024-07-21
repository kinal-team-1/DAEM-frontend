export const addQueryParams = (searchParams, param, value) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(param, value || "");
  return newSearchParams.toString().replace(/=(?=&|$)/gm, "");
};

export const removeQueryParams = (searchParams, param) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.delete(param);
  return newSearchParams.toString();
};
