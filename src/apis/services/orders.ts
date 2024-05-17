import axios from "axios";
import { headerUrl } from "./authentication";
import { OrderStatusValues } from "../types";

export const ordersByStatus = async (
  token: string,
  variables?: OrderStatusValues,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const values = variables?.status ? variables : null;

  return await axios
    .post(`${headerUrl}/orders/seller-orders`, values, config)
    .then((res) => res.data);
};

export const singleOrder = async (orderId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${headerUrl}/orders/${orderId}`, config)
    .then((res) => res.data);
};
