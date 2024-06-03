import { DetailIcon, SearchIcon } from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyDatePicker from "@/libs/date-picker";
import MyLabel from "@/libs/label";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AlertState, Order } from "@/enum/defined-type";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import {
  adminOrders,
  ordersByStatus,
  updateOrder,
} from "@/apis/services/orders";
import { AlertStatus, EnumOrderStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { UpdateOrderValues } from "@/apis/types";
import { formatCommonTime, formatCurrency } from "@/enum/functions";
import DetailOrderModal from "../../modals/detail-order-modal";
import { openModal } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { COLORS } from "@/enum/colors";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";

const labelOptions = [
  { label: "Mã đơn hàng", value: "ORDER_CODE" },
  { label: "Tên khách hàng", value: "CLIENT_NAME" },
];

const TransportOrdersTable = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const getAllOrders = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: EnumOrderStatus.DELIVERED,
      };
      const res = await adminOrders(token, query);
      if (res) {
        setOrders(res?.data?.reverse());
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
    getAllOrders();
  }, [refetchQueries]);

  const handleOpenDetailModal = (orderId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết đơn hàng",
      content: (
        <DetailOrderModal type={EnumOrderStatus.DELIVERED} orderId={orderId} />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleConfirmShipped = (orderId: number) => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN VẬN CHUYỂN GIAO HÀNG",
      message: "Bạn có xác nhận vận chuyển đơn hàng này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {
        try {
          dispatch(openLoading());
          const token = storage.getLocalAccessToken();
          const variables: UpdateOrderValues = {
            status: EnumOrderStatus.SHIPPED,
          };
          const res = await updateOrder(orderId, token, variables);
          if (res) {
            dispatch(closeConfirm());
            let alert: AlertState = {
              isOpen: true,
              title: "THÀNH CÔNG",
              message: "Đã cập nhật giao hàng thành công!",
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

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <div className="flex flex-col gap-8">
      {/* filter */}
      <div className="flex flex-row items-end justify-between">
        <div className="flex flex-row items-center gap-1">
          <MySelect options={labelOptions} selected={labelOptions[0].value} />
          <MyTextField
            id="searchItem"
            endIcon={<SearchIcon />}
            placeholder="Nhập nội dung tìm kiếm"
            className="w-[300px]"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          <div>Ngày đặt hàng</div>
          <MyDatePicker id="" className="flex-1" />
        </div>
      </div>
      {/* table */}
      <div className="max-w-[100%] overflow-hidden rounded-[10px]">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-sm">
            <thead
              className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
            >
              <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                <th className="py-4 pl-3">Mã đơn hàng</th>
                <th className="px-1 py-4">Tên khách hàng</th>
                <th className="px-1 py-4">Nhà bán</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Số lượng</th>
                <th className="px-1 py-4">Khách trả</th>
                <th className="px-1 py-4">Ngày đặt hàng</th>
                <th className="px-1 py-4">Dự kiến giao hàng</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3">{order?.code}</td>
                    <td className="px-1 py-4">{order?.client?.name}</td>
                    <td className="px-1 py-4">{order?.store?.name}</td>
                    <td className="px-1 py-4">
                      <MyLabel type="delivery">Đang vận chuyển</MyLabel>
                    </td>
                    <td className="px-1 py-4">
                      {order?.orderProducts?.length}
                    </td>
                    <td className="px-1 py-4">
                      {formatCurrency(order?.totalPayment)}
                    </td>
                    <td className="px-1 py-4">
                      {formatCommonTime(order?.orderAt)}
                    </td>
                    {/* tính thêm 7 ngày từ ngày giao hàng cho shipper */}
                    <td className="px-1 py-4">
                      {formatCommonTime(order?.deliveredAt, 7)}
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết đơn hàng">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenDetailModal(order?.id)}
                          >
                            <DetailIcon />
                          </div>
                        </Tooltip>
                        <Tooltip title="Xác nhận giao hàng">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleConfirmShipped(order?.id)}
                          >
                            <CheckCircleOutlineRoundedIcon
                              sx={{ fontSize: 20, color: COLORS.blue.c900 }}
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

export default TransportOrdersTable;
