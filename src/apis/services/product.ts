import axios from "axios";
import { headerUrl } from "./authentication";

export const uploadImages = async (files: any) => {
  return await axios
    .post(`${headerUrl}/products/uploads`, files)
    .then((res) => res.data);
};

export const createProduct = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/products/create`, variables, config)
    .then((res) => res.data);
};
