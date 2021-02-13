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

export const getUserApi = async () => {
  return await axios.get(url);
};
