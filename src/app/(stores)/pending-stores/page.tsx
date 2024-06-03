import { adminFilterStores, updateStoreStatus } from "@/apis/services/stores";
import storage from "@/apis/storage";
import { AlertStatus, StoreStatus } from "@/enum/constants";
import { AlertState, Store } from "@/enum/defined-type";
import { formatCommonTime } from "@/enum/functions";
import { DetailIcon, EditIcon, OffIcon, SearchIcon } from "@/enum/icons";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyLabel from "@/libs/label";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { RootState } from "@/redux/store";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { COLORS } from "@/enum/colors";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { openModal } from "@/redux/slices/modalSlice";
import DetailStore from "@/components/stores/detail-store";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import RejectStoreModal from "@/components/stores/reject-store-modal";

const PendingStoresTable = () => {
  const dispatch = useDispatch();
  const [stores, setStores] = useState<Store[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const getAllStores = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: StoreStatus.INACTIVE,
      };
      const res = await adminFilterStores(token, query);
      if (res) {
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
  }, [refetchQueries]);

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

  const handleApproveStore = (storeId: number) => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN DUYỆT CỬA HÀNG",
      message: "Bạn có xác nhận duyệt cửa hàng này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {
        try {
          dispatch(openLoading());
          const variables = {
            status: StoreStatus.ACTIVE,
          };
          const token = storage.getLocalAccessToken();
          const res = await updateStoreStatus(storeId, variables, token);
          if (res) {
            dispatch(closeConfirm());
            let alert: AlertState = {
              isOpen: true,
              title: "THÀNH CÔNG",
              message: "Đã duyệt cửa hàng thành công!",
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

  const handleOpenRejectModal = (storeId: number) => {
    const modal = {
      isOpen: true,
      title: "Nêu lý do từ chối",
      content: (
        <RejectStoreModal storeId={storeId} handleRefetch={handleRefetch} />
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
          <MyTextField
            id="searchItem"
            endIcon={<SearchIcon />}
            placeholder="Nhập tên cửa hàng"
            className="w-[300px]"
          />
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
                <th className="px-1 py-4">Ngày tạo</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {stores?.map((store, index) => {
                if (store?.notApproveReason !== null) return null;

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
                      <MyLabel type="warning">Chờ duyệt</MyLabel>
                    </td>
                    <td className="px-1 py-4">
                      {formatCommonTime(store?.createdAt)}
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
                        <Tooltip title="Duyệt">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleApproveStore(store?.id)}
                          >
                            <CheckCircleOutlineIcon
                              style={{
                                color: COLORS.purple.c800,
                                fontSize: 20,
                              }}
                            />
                          </div>
                        </Tooltip>
                        <Tooltip title="Từ chối duyệt">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenRejectModal(store?.id)}
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
    </div>
  );
};

export default PendingStoresTable;