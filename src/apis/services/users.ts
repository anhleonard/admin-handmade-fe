import axios from "axios";
import { headerUrl } from "./authentication";

export const adminFilterUsers = async (token: string, query?: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const params = new URLSearchParams(query).toString();
  const url = `${headerUrl}/users?${params}`;

  return await axios.get(url, config).then((res) => res.data);
};
