import axios from "axios";
import { headerUrl } from "./authentication";

export const filterAuctions = async (query?: any) => {
  const params = new URLSearchParams(query).toString();
  const url = `${headerUrl}/auctions/filter?${params}`;

  return await axios.get(url).then((res) => res.data);
};

export const createBidder = async (variables: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/auctions/create-bidder`, variables, config)
    .then((res) => res.data);
};

export const allSellerAuctions = async (token: string, variables: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .post(`${headerUrl}/auctions/seller-auctions`, variables, config)
    .then((res) => res.data);
};

// ------------ ADMIN ------------
export const updateAuction = async (
  id: number,
  variables: any,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/auctions/update/${id}`, variables, config)
    .then((res) => res.data);
};

export const adminFilterAuctions = async (token: string, query: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const params = new URLSearchParams(query).toString();
  const url = `${headerUrl}/auctions/admin-filter-auctions?${params}`;

  return await axios.get(url, config).then((res) => res.data);
};

export const singleAuction = async (id: number) => {
  const url = `${headerUrl}/auctions/${id}`;

  return await axios.get(url).then((res) => res.data);
};

export const updateAuctionStatus = async (
  id: number,
  variables: any,
  token: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .put(`${headerUrl}/auctions/update-status/${id}`, variables, config)
    .then((res) => res.data);
};

export const randomAuctions = async () => {
  return await axios
    .get(`${headerUrl}/auctions/random`)
    .then((res) => res.data);
};
