import axios from "axios";
import { backUrl } from "configs/environment";
import { User } from "types";

const url = backUrl + "/users";
const authUrl = backUrl + "/auth";

export const signupApi = async (data: User) => {
  return await axios.post(url, data);
};

export const checkEmailApi = async (email: string) => {
  return await axios.get(url + "/checkEmail", {
    params: {
      email,
    },
  });
};

export const loginWithEmailApi = async (data: User) => {
  return await axios.post(authUrl + "/login", data);
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
  const { data } = await axios.put(url, { nickname });
  return data;
};
