import axios from "axios";
import { backUrl } from "configs/environment";
import { Review } from "types";

const url = backUrl + "/review";

export const addReviewApi = async ({ desc, alcoholId }: Review) => {
  const { data } = await axios.post(url, { desc, alcoholId });
  return data;
};

export const updateReviewApi = async ({ id, desc }: Review) => {
  const { data } = await axios.patch(url + `/${id}`, { desc });
  return data;
};

export const deleteReviewApi = async ({ id }: Review) => {
  const { data } = await axios.delete(url + `/${id}`);
  return data;
};

export const getUserReview = async () => {
  const { data } = await axios.get(url);
  return data;
};
