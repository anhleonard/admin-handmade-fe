import axios from "axios";
import { headerUrl } from "./authentication";

export const getCategories = async () => {
  return await axios.get(`${headerUrl}/categories/`).then((res) => res.data);
};

export const createCategory = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/categories/create`, variables, config)
    .then((res) => res.data);
};
