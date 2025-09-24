import axios from "axios";

export const useApi = () => {
  const baseURL = "https://dashboard.arabianpaints.sa/api/";

  if(import.meta.client){
    axios.defaults.headers.lang = localStorage.getItem("locale") || "ar";
  }

  return axios.create({
    baseURL,
  });
};