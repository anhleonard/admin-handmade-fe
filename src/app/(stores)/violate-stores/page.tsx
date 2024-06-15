"use client";
import { adminFilterStores, updateStoreStatus } from "@/apis/services/stores";
import storage from "@/apis/storage";
import { AlertStatus, Page, StoreStatus, rowsPerPage } from "@/enum/constants";
import { AlertState, Store } from "@/enum/defined-type";
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
import { COLORS } from "@/enum/colors";
import DetailStore from "@/components/stores/detail-store";
import { openModal } from "@/redux/slices/modalSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { StoreStatusValues } from "@/apis/types";
import { MyPagination } from "@/libs/pagination";

const ViolateStoresTable = () => {
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
        status: StoreStatus.BANNED,
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

  const handleOpenBannedStore = (storeId: number) => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN MỞ HOẠT ĐỘNG CỦA CỬA HÀNG",
      message: "Bạn có xác nhận mở hoạt động cho cửa hàng này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {
        try {
          dispatch(openLoading());
          const variables: StoreStatusValues = {
            status: StoreStatus.ACTIVE,
            bannedReason: "",
          };
          const token = storage.getLocalAccessToken();
          const res = await updateStoreStatus(storeId, variables, token);
          if (res) {
            dispatch(closeConfirm());
            let alert: AlertState = {
              isOpen: true,
              title: "THÀNH CÔNG",
              message: "Đã mở hoạt động cho cửa hàng thành công!",
              type: AlertStatus.SUCCESS,
            };
            dispatch(openAlert(alert));
            handleRefetch();
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
      },
    };

    dispatch(openConfirm(confirm));
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
                <th className="px-1 py-4">Lý do cấm</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {stores?.map((store, index) => {
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
                      <MyLabel type="error">Đã bị cấm</MyLabel>
                    </td>
                    <td className="px-1 py-4">
                      <div className="max-w-[200px]">{store?.bannedReason}</div>
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
                        <Tooltip title="Mở hoạt động">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenBannedStore(store?.id)}
                          >
                            <CheckCircleOutlineIcon
                              style={{
                                color: COLORS.purple.c800,
                                fontSize: 20,
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

export default ViolateStoresTable;
