import axios from "axios";
import { backUrl } from "configs/environment";

const url = backUrl + "/alcohol";

export const createAlcoholApi = async (data: FormData) => {
  return await axios.post(url, data);
};

export const getAlcoholsByCategoryIdApi = (
  category: string,
  sortBy?: string,
  searchKey?: string
) => async ({ pageParam = 0 }) => {
  const { data } = await axios.get(url, {
    params: {
      category,
      searchKey,
      sortBy,
      limit: 12,
      offset: pageParam,
    },
  });
  return data;
};

export const getAlcoholDetailApi = (id: number | string) => async () => {
  const { data } = await axios.get(`${url}/${id}`);
  console.log(data);
  return data;
};
