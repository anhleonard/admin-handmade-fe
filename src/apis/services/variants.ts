import axios from "axios";
import { headerUrl } from "./authentication";

export const createVariants = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/variants/create`, variables, config)
    .then((res) => res.data);
};

export const deleteVariant = async (id: number) => {
  return await axios
    .delete(`${headerUrl}/variants/delete/${id}`)
    .then((res) => res.data);
};
