import { DetailIcon, EditIcon, OffIcon, SearchIcon } from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyDatePicker from "@/libs/date-picker";
import MyLabel from "@/libs/label";
import { Tooltip } from "@mui/material";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { COLORS } from "@/enum/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AlertState, Order } from "@/enum/defined-type";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import {
  adminOrders,
  ordersByStatus,
  updateReadyForAdmin,
} from "@/apis/services/orders";
import { AlertStatus, EnumOrderStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { OrderStatusValues } from "@/apis/types";
import { formatCommonTime, formatCurrency } from "@/enum/functions";
import DetailOrderModal from "../../modals/detail-order-modal";
import { openModal } from "@/redux/slices/modalSlice";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOrderModal from "@/components/orders/cancel-order-modal";

const labelOptions = [
  { label: "Mã đơn hàng", value: "ORDER_CODE" },
  { label: "Tên khách hàng", value: "CLIENT_NAME" },
];

const ProcessingOrdersTable = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const getAllOrders = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: EnumOrderStatus.PROCESSING,
        isReadyDelivery: false,
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
        <DetailOrderModal type={EnumOrderStatus.PROCESSING} orderId={orderId} />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
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
                if (!order?.orderProducts?.length) return null;
                return (
                  <tr
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                    key={index}
                  >
                    <td className="py-4 pl-3">{order?.code}</td>
                    <td className="px-1 py-4">{order?.client?.name}</td>
                    <td className="px-1 py-4">{order?.store?.name}</td>
                    <td className="px-1 py-4">
                      <MyLabel type="progress">Đang xử lý</MyLabel>
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
                    <td className="px-1 py-4">
                      {formatCommonTime(order?.orderAt, 7)}
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

export default ProcessingOrdersTable;
