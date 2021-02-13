import axios from "axios";
import { backUrl } from "configs/environment";
import { Alcohol } from "types";

const url = backUrl + "/alcohol";

export const createAlcoholApi = async (data: FormData) => {
  return await axios.post(url, data);
};
