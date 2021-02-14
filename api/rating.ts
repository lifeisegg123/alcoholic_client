import axios from "axios";
import { backUrl } from "configs/environment";
import { Rating } from "types";

const url = backUrl + "/rating";

export const addRatingApi = async ({ rating, alcoholId }: Rating) => {
  const { data } = await axios.post(url, { rating, alcoholId });
  return data;
};
