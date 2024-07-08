import { CreateRefundPaymentValues } from "@/enum/defined-type";
import axios from "axios";
import { headerUrl } from "./authentication";

export const createRefundPayment = async (
  variables: CreateRefundPaymentValues,
) => {
  return await axios
    .post(`${headerUrl}/payment/refund`, variables)
    .then((res) => res.data);
};
