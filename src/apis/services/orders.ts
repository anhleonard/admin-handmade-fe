import axios from "axios";
import { headerUrl } from "./authentication";
import { CancelOrderValues, UpdateOrderValues } from "../types";

export const ordersByStatus = async (
  token: string,
  variables?: UpdateOrderValues,
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

export const updateReadyForAdmin = async (orderId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/orders/update-ready-delivery/${orderId}`, null, config)
    .then((res) => res.data);
};

export const cancelOrder = async (
  orderId: number,
  token: string,
  variables: CancelOrderValues,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/orders/cancel/${orderId}`, variables, config)
    .then((res) => res.data);
};

// ADMIN
export const adminOrders = async (token: string, query?: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const params = new URLSearchParams(query).toString();
  const url = `${headerUrl}/orders/admin-filter-orders?${params}`;

  return await axios.get(url, config).then((res) => res.data);
};

export const updateOrder = async (
  orderId: number,
  token: string,
  variables: UpdateOrderValues,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/orders/update/${orderId}`, variables, config)
    .then((res) => res.data);
};
