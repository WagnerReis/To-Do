import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getConfig = () => {
  const token = Cookies.get("user_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};

export const getUser = async () => {
  return api
    .get("/auth/profile", getConfig())
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
