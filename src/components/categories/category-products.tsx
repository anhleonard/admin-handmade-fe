import { headerUrl } from "@/apis/services/authentication";
import { Product } from "@/enum/defined-type";
import { FontFamily, FontSize } from "@/enum/setting";
import MyStatus from "@/libs/status";
import { Tooltip } from "@mui/material";
import React from "react";

type Props = {
  products: Product[];
};

const CategoryProductsList = ({ products }: Props) => {
  return (
    <div className="py-4">
      <div className="max-w-[100%] overflow-hidden rounded-[10px]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-auto text-left text-sm">
            <thead
              className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
            >
              <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                <th className="py-4 pl-3">Mã sản phẩm</th>
                <th className="px-1 py-4">Sản phẩm</th>
                <th className="px-1 py-4">Nhà bán</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Tồn kho</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: Product, index: number) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3 align-top">
                      {product?.productCode}
                    </td>
                    <td className="px-1 py-4 align-top font-medium">
                      <div className="flex flex-row items-start gap-2">
                        <img
                          src={`${headerUrl}/products/${product.images[0]}`}
                          alt="product-image"
                          className="h-15 w-15 rounded-lg object-cover"
                        />
                        <div className="flex flex-col justify-start">
                          <div className="w-[160px] overflow-ellipsis break-words md:w-[200px]">
                            {product?.productName}
                          </div>
                          <div>
                            <span className="text-[10px]">Đã bán:</span>{" "}
                            <span className="text-[10px] font-bold text-primary-c900">
                              {product?.soldNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-4 align-top">
                      {product?.store?.name}
                    </td>
                    <td className="px-1 py-4 text-center align-top">
                      <MyStatus status={product?.status}></MyStatus>
                    </td>
                    <td className="px-1 py-4 align-top">
                      {product?.inventoryNumber}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsList;
