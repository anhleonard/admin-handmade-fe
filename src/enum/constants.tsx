import AllOrdersTable from "@/app/orders/list-orders/all-orders/all-orders-table";
import CancelOrdersTable from "@/app/orders/list-orders/cancel-orders/cancel-orders-table";
import DoneOrdersTable from "@/app/orders/list-orders/done-orders/done-orders-table";
import ProcessingOrdersTable from "@/app/orders/list-orders/processing-orders/processing-orders-table";
import TransportOrdersTable from "@/app/orders/list-orders/transport-orders/transport-orders-table";
import WaitingOrdersTable from "@/app/orders/list-orders/waiting-orders/waiting-orders-table";
import AllItemsTable from "@/app/products/list-products/all-items/all-items-table";
import DraftItemsTable from "@/app/products/list-products/draft-items/draft-items-table";
import NoItemsTable from "@/app/products/list-products/no-items/no-items-table";
import OffItemsTable from "@/app/products/list-products/off-items/off-items-table";
import PendingItemsTable from "@/app/products/list-products/pending-items/pending-items-table";
import SellingItemsTable from "@/app/products/list-products/selling-items/selling-items-table";
import ViolateItemsTable from "@/app/products/list-products/violate-items/violate-items-table";
import AllVouchersTable from "@/app/vouchers/list-vouchers/all-vouchers/all-vouchers-table";
import FinishedVouchersTable from "@/app/vouchers/list-vouchers/finished-vouchers/finished-vouchers-table";
import HappenningVouchersTable from "@/app/vouchers/list-vouchers/happening-vouchers/happening-vouchers-table";
import UpcomingVouchersTable from "@/app/vouchers/list-vouchers/upcoming-vouchers/upcoming-vouchers-table";

export enum ColorState {
  primary = "bg-primary-c800 text-white text-xs font-medium",
  error = "bg-support-c10 text-support-c500 text-xs font-medium",
  success = "bg-success-c50 text-success-c700 text-xs font-medium",
  warning = "bg-primary-c100 text-primary-c900 text-xs font-medium",
  progress = "bg-blue-c50 text-blue-c900 text-xs font-medium",
  delivery = "bg-purple-c10 text-purple-c900 text-xs font-medium",
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

//vouchers
export const discountTypes = [
  { label: "Theo số tiền", value: "MONEY", index: 0 },
  { label: "Theo phần trăm", value: "PERCENTAGE", index: 1 },
];

export const minOrderTypes = [
  { label: "Không giới hạn", value: "UNLIMITED_VALUE", index: 0 },
  { label: "Tùy chỉnh giá", value: "CUSTOM_VALUE", index: 1 },
];

export const applicableProductTypes = [
  { label: "Tất cả sản phẩm", value: "ALL_ITEMS", index: 0 },
  { label: "Tùy chỉnh sản phẩm", value: "CUSTOM_ITEMS", index: 1 },
];

// product tabs
export const productTabs = [
  {
    label: "Tất cả",
    value: "1",
    content: <AllItemsTable />,
  },
  {
    label: "Đang bán",
    value: "2",
    content: <SellingItemsTable />,
  },
  {
    label: "Hết hàng",
    value: "3",
    content: <NoItemsTable />,
  },
  {
    label: "Nháp",
    value: "4",
    content: <DraftItemsTable />,
  },
  {
    label: "Chờ duyệt",
    value: "5",
    content: <PendingItemsTable />,
  },
  {
    label: "Vi phạm",
    value: "6",
    content: <ViolateItemsTable />,
  },
  {
    label: "Tắt bởi Nhà bán",
    value: "7",
    content: <OffItemsTable />,
  },
];

// order tabs
export const orderTabs = [
  {
    label: "Tất cả",
    value: "1",
    content: <AllOrdersTable />,
  },
  {
    label: "Chờ xác nhận",
    value: "2",
    content: <WaitingOrdersTable />,
  },
  {
    label: "Đang xử lý",
    value: "3",
    content: <ProcessingOrdersTable />,
  },
  {
    label: "Đang vận chuyển",
    value: "4",
    content: <TransportOrdersTable />,
  },
  {
    label: "Đã giao hàng",
    value: "5",
    content: <DoneOrdersTable />,
  },
  {
    label: "Đã hủy",
    value: "6",
    content: <CancelOrdersTable />,
  },
];

export const statusOrders = [
  {
    label: "Tất cả",
    value: "ALL_ORDERS",
  },
  {
    label: "Chờ xác nhận",
    value: "WAITING_ORDERS",
  },
  {
    label: "Đang xử lý",
    value: "PROCESSING_ORDERS",
  },
  {
    label: "Đang vận chuyển",
    value: "TRANSFER_ORDERS",
  },
  {
    label: "Đã giao hàng",
    value: "DONE_ORDERS",
  },
  {
    label: "Đã hủy",
    value: "CANCEL_ORDERS",
  },
];

// vouchers tabs
export const voucherTabs = [
  {
    label: "Tất cả",
    value: "1",
    content: <AllVouchersTable />,
  },
  {
    label: "Đang diễn ra",
    value: "2",
    content: <HappenningVouchersTable />,
  },
  {
    label: "Sắp diễn ra",
    value: "3",
    content: <UpcomingVouchersTable />,
  },
  {
    label: "Đã kết thúc",
    value: "4",
    content: <FinishedVouchersTable />,
  },
];
