import { getUserApi } from "api/auth";
import { useQuery } from "react-query";

export const useUser = () => {
  const { data, isSuccess } = useQuery("user/auth", getUserApi);
  return [data, isSuccess];
};
