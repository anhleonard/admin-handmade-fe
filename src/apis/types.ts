import { EnumOrderStatus } from "@/enum/constants";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type OrderStatusValues = {
  status: EnumOrderStatus;
};

export type CancelOrderValues = {
  isCanceled: boolean;
  canceledReason: string;
};

export type CreateBidderValues = {
  auctionId: number;
  bidderMoney: string;
  estimatedDay: string;
  selfIntroduce: string;
};
