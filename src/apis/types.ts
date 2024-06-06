import {
  EnumOrderStatus,
  EnumScore,
  ProductStatus,
  StoreStatus,
  TypeScore,
} from "@/enum/constants";

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

export type UpdateOrderValues = {
  status?: EnumOrderStatus;
  isMinusPoint?: boolean;
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

export type CreateProgressValues = {
  auctionId: number;
  comment: string;
  percentage?: number;
};

export type UpdateProgressValues = {
  comment: string;
};

export type RejectFormValues = {
  rejectReason: string;
  editHint: string;
};

export type CreateCategoryValues = {
  title: string;
  description: string;
};

export type RejectAuctionValues = {
  isAccepted: boolean;
  additionalComment: string;
};

export type StoreStatusValues = {
  status: StoreStatus;
  bannedReason?: string;
  notApproveReason?: string;
};

export type StoreScoreValues = {
  storeId: number;
  type: TypeScore;
  amount: EnumScore;
};

export type ReportProductValues = {
  status: ProductStatus;
  rejectReason: string;
  editHint: string;
};
