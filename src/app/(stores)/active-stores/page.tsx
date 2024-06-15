"use client";
import { adminFilterStores } from "@/apis/services/stores";
import storage from "@/apis/storage";
import {
  AlertStatus,
  EnumOrderStatus,
  Page,
  StoreStatus,
  rowsPerPage,
} from "@/enum/constants";
import { AlertState, Order, Store } from "@/enum/defined-type";
import { DetailIcon, SearchIcon } from "@/enum/icons";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyLabel from "@/libs/label";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { RootState } from "@/redux/store";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { COLORS } from "@/enum/colors";
import { formatCurrency } from "@/enum/functions";
import DetailStore from "@/components/stores/detail-store";
import { openModal } from "@/redux/slices/modalSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import BannedStoreModal from "@/components/stores/banned-store-modal";
import { MyPagination } from "@/libs/pagination";

const ActiveStoresTable = () => {
  const dispatch = useDispatch();
  const [stores, setStores] = useState<Store[]>([]);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [searchText, setSearchText] = useState<string>("");

  const getAllStores = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: StoreStatus.ACTIVE,
        limit: rowsPage,
        page: page,
        ...(searchText !== "" && {
          storeName: searchText,
        }),
      };
      const res = await adminFilterStores(token, query);
      if (res) {
        setCount(res?.total ?? 0);
        setStores(res?.data);
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
    getAllStores();
  }, [refetchQueries, page, rowsPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleRowPerPageChange = (e: any) => {
    setPage(Page);
    setRowsPage(parseInt(e.target.value));
  };

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const handleOpenDetailModal = (storeId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết cửa hàng",
      content: <DetailStore storeId={storeId} />,
      screen: SCREEN.LG,
    };
    dispatch(openModal(modal));
  };

  const handleOpenBannedModal = (storeId: number) => {
    const modal = {
      isOpen: true,
      title: "Nêu lý do cấm cửa hàng",
      content: (
        <BannedStoreModal storeId={storeId} handleRefetch={handleRefetch} />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* filter */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <form
            className="flex-1 text-slate-900 dark:text-slate-100"
            onSubmit={(e) => {
              setPage(1);
              handleRefetch();
              e.preventDefault();
            }}
          >
            <MyTextField
              id="searchItem"
              endIcon={<SearchIcon />}
              placeholder="Nhập tên cửa hàng"
              className="w-[300px]"
              onChange={(event) => setSearchText(event.target.value)}
            />
          </form>
        </div>
      </div>

      {/* table */}
      <div className="max-w-[100%] overflow-hidden rounded-[10px]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-auto text-left text-sm">
            <thead
              className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
            >
              <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                <th className="py-4 pl-3">Tên</th>
                <th className="px-1 py-4">Chủ shop</th>
                <th className="px-1 py-4">Hàng chủ lực</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">
                  <Tooltip title="Số đơn hàng thành công">
                    <div>Đơn hàng</div>
                  </Tooltip>
                </th>
                <th className="px-1 py-4">Doanh thu</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {stores?.map((store, index) => {
                const allOrders: Order[] = store?.orders;
                let filteredOrders: Order[] = [];
                let totalRevenue = 0;

                if (allOrders?.length) {
                  // lọc all orders đã đc shipped
                  filteredOrders = allOrders.filter(
                    (item) => item.status === EnumOrderStatus.SHIPPED,
                  );

                  // tính tổng tiền order được shipped
                  let totalPrice = filteredOrders.reduce(
                    (sum, order) => sum + order.totalPayment,
                    0,
                  );

                  totalRevenue = totalPrice * 0.8; // tính tổng doanh thu vì handmade thu 20%
                }

                return (
                  <tr
                    key={index}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3">
                      <div className="max-w-[200px]">{store?.name}</div>
                    </td>
                    <td className="px-1 py-4">{store?.owner?.name}</td>
                    <td className="px-1 py-4">{store?.mainBusiness}</td>
                    <td className="px-1 py-4">
                      <MyLabel type="success">Đang hoạt động</MyLabel>
                    </td>
                    <td className="px-1 py-4">{filteredOrders?.length}</td>
                    <td className="px-1 py-4">
                      {formatCurrency(totalRevenue)}
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết">
                          <div
                            className="pt-1 hover:cursor-pointer"
                            onClick={() => handleOpenDetailModal(store?.id)}
                          >
                            <DetailIcon />
                          </div>
                        </Tooltip>
                        <Tooltip title="Cấm hoạt động">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenBannedModal(store?.id)}
                          >
                            <HighlightOffIcon
                              style={{
                                color: COLORS.support.c500,
                                fontSize: 21,
                              }}
                            />
                          </div>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
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

export default ActiveStoresTable;
