import axios from "axios";
import { backUrl } from "configs/environment";
import { Rating } from "types";

const url = backUrl + "/ratings";

export const addRatingApi = async ({ rating, alcoholId }: Rating) => {
  const { data } = await axios.post(url, { rating, alcoholId });
  return data;
};

export const updateRatingApi = async ({ rating, alcoholId }: Rating) => {
  const { data } = await axios.put(url, { rating, alcoholId });
  return data;
};
