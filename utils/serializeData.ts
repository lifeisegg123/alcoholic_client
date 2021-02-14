import { InfiniteData } from "react-query";

export const serializeData = (data: InfiniteData<any>) => {
  if (!data) return false;
  const arr = data.pages.reduce((acc, { data }) => {
    acc.push(...data);
    return acc;
  }, []);
  return arr;
};
