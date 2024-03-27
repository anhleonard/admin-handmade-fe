import { ReactNode } from "react";
import { Url } from "url";

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
