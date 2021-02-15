import axios from "axios";
import { backUrl } from "configs/environment";
import { Alcohol } from "types";

const url = backUrl;

export const getNotConfirmedListApi = async () => {
  const { data } = await axios.get(url + "/alcohol/admin");
  return data;
};

export const updateAndConfirmAlcoholApi = async ({
  id,
  body,
}: {
  id: string;
  body: FormData;
}) => {
  const { data } = await axios.patch(url + `/alcohol/${id}`, body);
  return data;
};

export const deleteAlcoholApi = async (id: string) => {
  const { data } = await axios.delete(url + `/alcohol/${id}`);
  return data;
};
