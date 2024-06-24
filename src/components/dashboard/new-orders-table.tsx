import React, { useEffect, useState } from "react";
import MyLabel from "@/libs/label";
import { FontFamily, FontSize } from "@/enum/setting";
import { AlertState, Order } from "@/enum/defined-type";
import {
  AlertStatus,
  EnumOrderStatus,
  Page,
  rowsPerPage,
} from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { adminOrders } from "@/apis/services/orders";
import { formatCommonTime, formatCurrency } from "@/enum/functions";
import storage from "@/apis/storage";
import { MyPagination } from "@/libs/pagination";
import { headerUrl } from "@/apis/services/authentication";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { COLORS } from "@/enum/colors";

const NewOrdersTable = () => {
  const dispatch = useDispatch();
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);

  const getNewOrders = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const newOrderQuery = {
        action: "NEW_ORDER",
        limit: rowsPage,
        page: page,
      };
      const res = await adminOrders(token, newOrderQuery);
      setNewOrders(res?.data);
      setCount(res?.total ?? 0);
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
    getNewOrders();
  }, [page, rowsPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleRowPerPageChange = (e: any) => {
    setPage(Page);
    setRowsPage(parseInt(e.target.value));
  };

  const renderStatusLabel = (status: EnumOrderStatus) => {
    switch (status) {
      case EnumOrderStatus.WAITING_PAYMENT:
        return <MyLabel type="warning">Chờ thanh toán</MyLabel>;

      case EnumOrderStatus.PROCESSING:
        return <MyLabel type="progress">Đang xử lý</MyLabel>;

      case EnumOrderStatus.DELIVERED:
        return <MyLabel type="delivery">Đang vận chuyển</MyLabel>;

      case EnumOrderStatus.SHIPPED:
        return <MyLabel type="success">Đã giao</MyLabel>;

      case EnumOrderStatus.CENCELLED:
        return <MyLabel type="error">Đã hủy</MyLabel>;
    }
  };

  return (
    <div className="mb-6 mt-6 rounded-xl border border-stroke bg-white px-7.5 py-6 shadow-default">
      <div className="mb-4 font-semibold">Đơn hàng mới đặt</div>
      {/* table */}
      <div className="max-w-[100%] overflow-hidden rounded-[4px]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-auto text-left text-sm">
            <thead
              className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
            >
              <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                <th className="py-4 pl-3">Tên khách</th>
                <th className="px-1 py-4">Sản phẩm mua</th>
                <th className="px-1 py-4">Nhà bán</th>
                <th className="px-1 py-4">Ngày đặt hàng</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Số tiền</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {newOrders?.length
                ? newOrders?.map((order, index) => {
                    return (
                      <tr
                        key={index}
                        className="hover:bg-primary-c100 hover:text-grey-c700"
                      >
                        <td className="py-4 pl-3">{order?.client?.name}</td>
                        <td className="px-1 py-4">
                          <div className="flex flex-col gap-2">
                            {order?.orderProducts?.map(
                              (orderProduct, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex flex-row items-start gap-2"
                                  >
                                    <img
                                      src={`${headerUrl}/products/${orderProduct?.product?.images[0]}`}
                                      alt="product-image"
                                      className="h-13 w-13 rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col justify-start gap-2">
                                      <div className="w-[160px] overflow-ellipsis break-words md:w-[200px]">
                                        {orderProduct?.product?.productName}
                                      </div>

                                      {orderProduct?.variant ? (
                                        <div>
                                          <span className="text-[12px]">
                                            Phân loại
                                          </span>{" "}
                                          <span className="text-sm font-bold text-primary-c900">
                                            {formatVariant(
                                              orderProduct?.variant
                                                ?.variantItems,
                                            )}
                                          </span>
                                        </div>
                                      ) : null}

                                      <div>
                                        <span className="text-[12px]">
                                          Số lượng mua:
                                        </span>{" "}
                                        <span className="text-sm font-bold text-primary-c900">
                                          {orderProduct?.productQuantity}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </td>
                        <td className="px-1 py-4">{order?.store?.name}</td>
                        <td className="px-1 py-4">
                          {formatCommonTime(order?.orderAt)}
                        </td>
                        <td className="px-1 py-4">
                          {renderStatusLabel(order?.status as EnumOrderStatus)}
                        </td>
                        <td className="px-1 py-4">
                          <div className="flex items-center gap-1">
                            <NorthEastRoundedIcon
                              style={{
                                color: COLORS.success.c600,
                                fontSize: 20,
                              }}
                            />
                            <div className="font-semibold text-success-c600">
                              {order?.totalPayment &&
                                formatCurrency(order?.totalPayment)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <MyPagination
        page={page}
        handlePageChange={handlePageChange}
        handleRowPerPageChange={handleRowPerPageChange}
        total={count}
        rowsPerPage={rowsPage}
      />
    </div>
  );
};

export default NewOrdersTable;
