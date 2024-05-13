import { ReactNode } from "react";
import { Url } from "url";
import { AlertStatus, ProductStatus } from "./constants";
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
  type: AlertStatus;
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
};

export type Category = {
  id: number;
  title: string;
  description: string;
};
