export enum ColorState {
  primary = "bg-primary-c800 text-white text-xs font-medium",
  error = "bg-support-c50 text-support-c500 text-xs font-medium",
  success = "bg-success-c50 text-success-c700 text-xs font-medium",
  warning = "bg-primary-c100 text-primary-c900 text-xs font-medium",
  progress = "bg-blue-c50 text-blue-c900 text-xs font-medium",
}

export const itemStatuses = [
  {
    label: "Tất cả",
    value: "ALL",
    href: "/",
  },
  {
    label: "Đang bán",
    value: "SELLING",
    href: "/",
  },
  {
    label: "Hết hàng",
    value: "OUT_STOCK",
    href: "/",
  },
  {
    label: "Nháp",
    value: "DRAFT",
    href: "/",
  },
  {
    label: "Chờ duyệt",
    value: "PENDING",
    href: "/",
  },
  {
    label: "Vi phạm",
    value: "VIOLATE",
    href: "/",
  },
  {
    label: "Tắt bởi Nhà bán",
    value: "TURN_OFF",
    href: "/",
  },
];

export const mainCategories = [
  {
    label: "Tất cả",
    value: "ALL",
  },
  {
    label: "Đồ ăn",
    value: "FOOD",
  },
  {
    label: "Quà tặng",
    value: "GIFT",
  },
];

export const yesNoOptions = [
  { label: "Có", value: "YES", index: 0 },
  { label: "Không", value: "NO", index: 1 },
];
