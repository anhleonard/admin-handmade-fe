import { List } from "@mui/material";
import React, { useEffect, useState } from "react";
import DetailStoreItem from "./detail-store-item";
import { FontFamily, FontSize } from "@/enum/setting";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { AlertState, Order, Store } from "@/enum/defined-type";
import { singleStore } from "@/apis/services/stores";
import { AlertStatus, EnumOrderStatus, StoreStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { formatCurrency } from "@/enum/functions";
import MyStatus from "@/libs/status";
import { headerUrl } from "@/apis/services/authentication";

type Props = {
  storeId: number;
};

const DetailStore = ({ storeId }: Props) => {
  const dispatch = useDispatch();
  const [store, setStore] = useState<Store>();
  const [orders, setOrders] = useState<Order[]>([]); // số đơn hàng thành công
  const [revenue, setRevenue] = useState<number>(0);
  let index = 1;

  const getSingleStore = async () => {
    try {
      dispatch(openLoading());
      const res = await singleStore(storeId);
      if (res) {
        const allOrders: Order[] = res?.orders;
        if (allOrders?.length) {
          const filteredOrders = allOrders.filter(
            // lọc all orders đã đc shipped
            (item) => item.status === EnumOrderStatus.SHIPPED,
          );

          let totalPrice = filteredOrders.reduce(
            // tính tổng tiền order được shipped
            (sum, order) => sum + order.totalPayment,
            0,
          );
          let totalRevenue = totalPrice * 0.8; // tính tổng doanh thu vì handmade thu 20%

          setRevenue(totalRevenue);
          setOrders(filteredOrders);
        }

        setStore(res);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getSingleStore();
  }, []);

  return (
    <>
      {store && (
        <div className="space-y-8 py-4">
          {store?.status === StoreStatus.INACTIVE && (
            <div className=" flex flex-col gap-3 text-sm">
              <div className="font-bold text-grey-c900">
                {index}. Giấy tờ của chủ shop
              </div>
              <div className="grid grid-cols-2 gap-8">
                <img
                  src={`${headerUrl}/products/${store?.owner?.frontCard}`}
                  alt="product-image"
                  className="h-60 w-full rounded-lg object-contain"
                />
                <img
                  src={`${headerUrl}/products/${store?.owner?.backCard}`}
                  alt="product-image"
                  className="h-60 w-full rounded-lg object-contain"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3 text-sm">
            <div className="font-bold text-grey-c900">
              {store?.status === StoreStatus.INACTIVE ? index + 1 : index}.
              Thông tin cơ bản
            </div>
            <List
              disablePadding
              className="flex flex-col rounded-2xl border-[2px] border-grey-c50 text-sm"
            >
              <DetailStoreItem title="Tên cửa hàng" desc={store?.name} />
              <DetailStoreItem title="Tên chủ shop" desc={store?.owner?.name} />
              <DetailStoreItem
                title="Ngành hàng chủ lực"
                desc={store?.mainBusiness}
              />
              <DetailStoreItem
                title="Mô tả cửa hàng"
                desc={store?.description}
                hasBorder={false}
              />
            </List>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div className="font-bold text-grey-c900">
              {store?.status === StoreStatus.INACTIVE ? index + 2 : index + 1}.
              Thông số
            </div>
            <List
              disablePadding
              className="flex flex-col rounded-2xl border-[2px] border-grey-c50 text-sm"
            >
              <DetailStoreItem
                title="Tổng số sản phẩm"
                desc={store?.products?.length}
              />
              <DetailStoreItem
                title="Số đơn hàng thành công"
                desc={orders?.length}
              />
              <DetailStoreItem
                hasBorder={false}
                title="Doanh thu"
                desc={formatCurrency(revenue)}
              />
            </List>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div className="font-bold text-grey-c900">
              {store?.status === StoreStatus.INACTIVE ? index + 3 : index + 2}.
              Danh sách sản phẩm
            </div>
            {/* table */}
            <div className="max-w-[100%] overflow-hidden rounded-[10px]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] table-auto text-left text-sm">
                  <thead
                    className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
                  >
                    <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                      <th className="py-4 pl-3">Mã sản phẩm</th>
                      <th className="px-1 py-4">Tên sản phẩm</th>
                      <th className="px-1 py-4">Trạng thái</th>
                      <th className="px-1 py-4">Tồn kho</th>
                      <th className="px-1 py-4">Giá bán</th>
                      <th className="px-1 py-4">Đã bán</th>
                    </tr>
                  </thead>

                  <tbody>
                    {store?.products?.map((product, index) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-primary-c100 hover:text-grey-c700"
                        >
                          <td className="py-4 pl-3">{product?.productCode}</td>
                          <td className="px-1 py-4">
                            <div className="flex flex-row items-start gap-2">
                              <img
                                src={`${headerUrl}/products/${product.images[0]}`}
                                alt="product-image"
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                              <div className="max-w-[200px]">
                                {product?.productName}
                              </div>
                            </div>
                          </td>
                          <td className="px-1 py-4">
                            <MyStatus status={product?.status}></MyStatus>
                          </td>
                          <td className="px-1 py-4">
                            {product?.inventoryNumber}
                          </td>
                          <td className="px-1 py-4">
                            {product?.price && formatCurrency(product?.price)}
                          </td>
                          <td className="px-1 py-4">{product?.soldNumber}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailStore;
