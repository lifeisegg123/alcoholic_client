import axios from "axios";
import { backUrl } from "configs/environment";
import { User } from "types";

const url = backUrl + "/user";

export const signupApi = async (data: User) => {
  return await axios.post(url + "/signup", data);
};

export const checkEmailApi = async (email: string) => {
  return await axios.get(url + "/checkEmail", {
    params: {
      email,
    },
  });
};

export const loginWithEmailApi = async (data: User) => {
  return await axios.post(url + "/loginLocal", data);
};

export const logoutApi = async () => {
  return await axios.post(url + "/logout");
};

export const getUserApi = async () => {
  const { data } = await axios.get(url);
  return data;
};

export const getUserByIdApi = (id: string) => async () => {
  const { data } = await axios.get(url + `/${id}`);
  return data;
};

export const changeNickNameApi = async ({ nickname }: { nickname: string }) => {
  const { data } = await axios.patch(url + "/nickname", { nickname });
  return data;
};
