import moment from "moment";
import { Variant, VariantItem } from "./defined-type";

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
