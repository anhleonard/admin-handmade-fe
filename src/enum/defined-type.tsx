import { ReactNode } from "react";
import { Url } from "url";
import { AlertStatus, ProductStatus, Role } from "./constants";
import { Item } from "@/libs/select";

export type ColTabItem = {
  href: any;
  label: string;
  icon: ReactNode;
};

export type RowTabItem = {
  href: any;
  label: string;
};

export type RadioItem = {
  label: string;
  value: string;
  index: number;
};

export type ClassifiedOptionInformation = {
  index: number;
  previewImg: string;
  setPreviewImg: any;
  value: string;
};

export type ClassifiedList = {
  options: Array<ClassifiedOptionInformation>;
  name: string;
};

// Modal
export type ModalState = {
  isOpen?: boolean;
  title: string;
  content: React.ReactNode;
  screen?: string;
};

export type ClassifiedItem = {
  idItem: string;
  value: string;
  inventory_numbers: number;
  money: string;
  urlImg: string;
};

export type ClassifiedClass = {
  idClass: string;
  name: string;
  items: Array<ClassifiedItem>;
};

// Confirm
export type ConfirmState = {
  isOpen?: boolean;
  title: string;
  message: string;
  feature: string;
  onConfirm?: () => void;
};

export type AlertState = {
  isOpen: boolean;
  title: string;
  message: string;
  type: AlertStatus | string;
};

// VD: {Kích cỡ: {value: 29, label: '4XL'}}
export interface SelectedItem {
  [key: string]: { value: number; label: string };
}

//Product
export type VariantCategory = {
  id: number;
  variantName: string;
  variantItems: Array<VariantItem>;
};

//item format to fit select lib
export type ItemVariantCategory = {
  id: number;
  variantName: string;
  variantItems: Array<Item>;
};

export type VariantItem = {
  id: number;
  name: string;
  variantCategory?: VariantCategory;
};

export type Variant = {
  id: number;
  unitPrice: number;
  inventoryNumber: number;
  image: string;
  variantItems: Array<VariantItem>;
};

export type Product = {
  id: number;
  productName: string;
  productCode: string;
  description: string;
  materials: string;
  mainColors: string;
  uses: string;
  productionDate?: Date;
  expirationDate?: Date;
  isHeavyGood: boolean;
  isMultipleClasses: boolean;
  inventoryNumber?: number;
  price?: number;
  images: string[];
  discount?: number;
  variants: Variant[];
  isAccepted: boolean;
  status: ProductStatus;
  createdAt: any;
  updatedAt: any;
  expirationAt: any;
  category: Category[];
  soldNumber: number;
  profitMoney: number;
  rejectReason: string;
  editHint: string;
  store: Store;
};

export type Category = {
  id: number;
  title: string;
  description: string;
  products: Product[];
};

export type Store = {
  id: number;
  name: string;
  avatar: string;
  isBanned: boolean;
  description: string;
  mainBusiness: string;
  productAmount: number;
  avgStoreRating: number;
  followerAmount: number;
  owner: User;
};

export type OrderProduct = {
  id: number;
  code: string;
  productUnitPrice: string;
  productQuantity: number;
  isSelected: boolean;
  numberSelectedItem: number; // số lượng product thay đổi
  amountMoney: number; // số tiền thay đổi sau khi change numberSelectedItem
  variant: Variant;
  product: Product;
};

export type Shipping = {
  id: number;
  phone: string;
  name: string;
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
  isDefaultAddress: boolean;
  receivePlace: string;
  companyName?: string;
};

export type Order = {
  id: number;
  code: string;
  totalAmountItem: number;
  provisionalAmount: number;
  discountAmount: number;
  totalPayment: number;
  orderAt: Date;
  updatedAt: Date;
  processingAt: Date;
  isCanceled: boolean;
  canceledReason: string;
  isPaid: boolean;
  deliveryFee: number;
  status: string;
  shippedAt: Date;
  deliveredAt: Date;
  shippingAddress: Shipping;
  orderProducts: OrderProduct[];
  store: Store;
  client: User;
  updatedBy: User;
  isReadyDelivery: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  phoneNumber: string;
  dateOfBirth: Date;
  role: Role;
};

export type FilterTime = {
  id: string;
  name: string;
  min?: number;
  max?: number;
};

export type Auction = {
  id: number;
  isAccepted: boolean;
  additionalComment: string;
  name: string;
  description: string;
  images: string[];
  requiredNumber: number;
  maxAmount: number;
  createdAt: Date;
  updatedAt: Date;
  closedDate: Date;
  maxDays: number;
  deposit: number;
  readyToLaunch: boolean;
  status: string;
  owner: User;
  shipping: Shipping;
  candidates: Bidder[];
  progresses: Progress[];
  canceledBy: User;
};

export type Bidder = {
  id: number;
  bidderMoney: number;
  estimatedDay: number;
  selfIntroduce: string;
  isSelected: boolean;
  store: Store;
  acceptedAt: Date;
};

export type Progress = {
  id: number;
  percentage: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};
