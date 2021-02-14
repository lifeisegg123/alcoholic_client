import axios from "axios";
import { backUrl } from "configs/environment";
import { Review } from "types";

const url = backUrl + "/review";

export const addReviewApi = async ({ desc, alcoholId }: Review) => {
  console.log("addReviewApi", desc, alcoholId);
  const { data } = await axios.post(url, { desc, alcoholId });
  return data;
};
