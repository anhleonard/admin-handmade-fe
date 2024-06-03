import axios from "axios";
import { headerUrl } from "./authentication";
import { StoreScoreValues, StoreStatusValues } from "../types";

export const singleStore = async (storeId: number) => {
  const url = `${headerUrl}/stores/${storeId}`;
  return await axios.get(url).then((res) => res.data);
};

export const adminFilterStores = async (token: string, query?: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const params = new URLSearchParams(query).toString();
  const url = `${headerUrl}/stores/admin-filter-stores?${params}`;

  return await axios.get(url, config).then((res) => res.data);
};

export const updateStoreStatus = async (
  storeId: number,
  variables: StoreStatusValues,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${headerUrl}/stores/update-store/${storeId}`;
  return await axios.put(url, variables, config).then((res) => res.data);
};

export const updateScore = async (
  variables: StoreScoreValues,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${headerUrl}/stores/update-score`;
  return await axios.put(url, variables, config).then((res) => res.data);
};
