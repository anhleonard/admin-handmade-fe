import axios from "axios";
import { headerUrl } from "./authentication";

export const createStoreEmbedding = async (storeId: number) => {
  const variables = {
    storeId: storeId,
  };
  const url = `${headerUrl}/embeddings/create`;
  return await axios.post(url, variables).then((res) => res.data);
};
