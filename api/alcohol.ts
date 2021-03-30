import axios from "axios";
import { backUrl } from "configs/environment";

const url = backUrl + "/alcohols";

export const createAlcoholApi = async (data: FormData) => {
  return await axios.post(url, data);
};

export const getAlcoholsByCategoryIdApi = (
  category?: string,
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

export const getAlcoholDetailApi = (name: string) => async () => {
  const { data } = await axios.get(`${url}/${encodeURI(name)}`);
  return data;
};

export const getRandomList = async () => {
  const { data } = await axios.get(`${url}/random-list`);
  return data;
};
