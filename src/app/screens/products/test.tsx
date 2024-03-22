"use client";
import NavigateItem from "@/components/products/navigate-tab";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

type ListProductsProps = {
  children: ReactNode;
};

const ListProductsScreen = ({ children }: ListProductsProps) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  return (
    <div className="w-full rounded-lg bg-white px-4 py-2">
      <div className="mb-5 flex flex-col gap-3">
        <div className="text-lg font-bold text-grey-c900">
          Danh sách sản phẩm
        </div>
        <div>
          <ul
            className="mb-5 flex list-none flex-row flex-wrap gap-2"
            role="tablist"
          >
            <NavigateItem
              href="/products/list-products/all-items"
              label="Tất cả"
              isSelected={pathname.includes("all-items")}
            />
            <NavigateItem
              href="/products/list-products/selling-items"
              label="Đang bán"
              isSelected={pathname.includes("selling-items")}
            />
            <NavigateItem
              href="/products/list-products/no-items"
              label="Hết hàng"
              isSelected={pathname.includes("no-items")}
            />
            <NavigateItem
              href="/products/list-products/draft-items"
              label="Nháp"
              isSelected={pathname.includes("draft-items")}
            />
            <NavigateItem
              href="/products/list-products/pending-items"
              label="Chờ duyệt"
              isSelected={pathname.includes("pending-items")}
            />
            <NavigateItem
              href="/products/list-products/violate-items"
              label="Vi phạm"
              isSelected={pathname.includes("violate-items")}
            />
            <NavigateItem
              href="/products/list-products/off-items"
              label="Tắt bởi nhà bán"
              isSelected={pathname.includes("off-items")}
            />
          </ul>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ListProductsScreen;
