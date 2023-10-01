import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getConfig = () => {
  const token = Cookies.get("user_token");
  const userId = Cookies.get("user_id");
  const config = {
    params: {
      user_id: userId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};
