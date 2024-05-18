import moment from "moment";
import { Shipping, Variant, VariantItem } from "./defined-type";
import { Role } from "./constants";

export function formatCurrency(price: number) {
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });

  const parts = formatter.formatToParts(price);

  let formattedPrice = "";
  parts.forEach((part) => {
    if (part.type !== "currency") {
      formattedPrice += part.value;
    }
  });

  return formattedPrice + "đ";
}

export function formatVariant(data: Array<VariantItem>) {
  const names = data.map((variantItem: VariantItem) => variantItem?.name);
  const result = names.join(" - ");
  return result;
}

export function formatDate(timestamp: Date) {
  const date = moment(timestamp).format("DD-MM-YYYY HH:mm:ss");
  return date;
}

export function formatCommonTime(time: Date, addDays?: number) {
  const date = new Date(time);
  if (addDays) {
    date.setDate(date.getDate() + 7);
  }
  // Lấy giờ và phút
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  // Lấy ngày, tháng, và năm
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  let year = date.getFullYear();

  // Định dạng thành chuỗi
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

export function formatShippingAddress(data: Shipping) {
  if (data?.companyName)
    return `${data?.companyName}, ${data?.detailAddress}, ${data?.ward}, ${data?.district}, ${data?.province}, Việt Nam`;
  return `${data?.detailAddress}, ${data?.ward}, ${data?.district}, ${data?.province}, Việt Nam`;
}

export function renderWhoCanceled(role: Role) {
  switch (role) {
    case Role.USER:
      return "Khách hàng";
    case Role.SELLER:
      return "Nhà bán";
    case Role.ADMIN:
      return "Handmade";
  }
}
