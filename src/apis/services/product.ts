import axios from "axios";
import { headerUrl } from "./authentication";

export const uploadImages = async (files: any) => {
  return await axios
    .post(`${headerUrl}/products/uploads`, files)
    .then((res) => res.data);
};

export const uploadSingleImage = async (image: any) => {
  return await axios
    .post(`${headerUrl}/products/upload-image`, image)
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

export const getPendingProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/products/pending-products`, null, config)
    .then((res) => res.data);
};

export const singleProduct = async (id: number) => {
  return await axios.get(`${headerUrl}/products/${id}`).then((res) => res.data);
};
