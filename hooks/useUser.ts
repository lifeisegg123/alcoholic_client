import { getUserApi } from "api/user";
import { useQuery } from "react-query";

export const useUser = () => {
  const { data, isSuccess } = useQuery("user/auth", getUserApi, {
    cacheTime: Infinity,
    retry: false,
  });
  return [data, isSuccess];
};
