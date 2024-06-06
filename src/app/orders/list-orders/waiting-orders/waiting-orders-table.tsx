import { DetailIcon, SearchIcon } from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect, { Item } from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyDatePicker from "@/libs/date-picker";
import MyLabel from "@/libs/label";
import { IconButton, Tooltip } from "@mui/material";
import DetailOrderModal from "../../modals/detail-order-modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { useEffect, useState } from "react";
import { AlertState, Order } from "@/enum/defined-type";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { adminOrders, updateOrder } from "@/apis/services/orders";
import {
  AlertStatus,
  EnumOrderStatus,
  Page,
  rowsPerPage,
} from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { formatCommonTime, formatCurrency } from "@/enum/functions";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { MyPagination } from "@/libs/pagination";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { COLORS } from "@/enum/colors";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { UpdateOrderValues } from "@/apis/types";

const labelOptions = [
  { label: "Mã đơn hàng", value: "ORDER_CODE" },
  { label: "Tên khách hàng", value: "CLIENT_NAME" },
];

const WaitingOrdersTable = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Item>(labelOptions[0]);
  const [orderAt, setOrderAt] = useState<string>("");

  const getAllOrders = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: EnumOrderStatus.WAITING_PAYMENT,
        limit: rowsPage,
        page: page,
        ...(selectedOption === labelOptions[0] &&
          searchText !== "" && {
            code: searchText,
          }),
        ...(selectedOption === labelOptions[1] &&
          searchText !== "" && {
            clientName: searchText,
          }),
        ...(orderAt !== "" && {
          orderAt: orderAt,
        }),
      };
      const res = await adminOrders(token, query);
      if (res) {
        setOrders(res?.data);
        setCount(res?.total ?? 0);
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
  }, [refetchQueries, page, rowsPage, orderAt]);

  const handleOpenDetailModal = (orderId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết đơn hàng",
      content: (
        <DetailOrderModal
          type={EnumOrderStatus.WAITING_PAYMENT}
          orderId={orderId}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

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

  const handleCancelOrderByAdmin = (order: Order, notOverdate: boolean) => {
    if (notOverdate) {
      let alert: AlertState = {
        isOpen: true,
        title: "KHÔNG THỂ HỦY",
        message: "Đơn hàng chưa quá hạn, không thể hủy!",
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
      return;
    }

    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN HỦY ĐƠN HÀNG DO QUÁ HẠN",
      message: "Bạn có hủy đơn hàng này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => handleCancelOrder(order),
    };
    dispatch(openConfirm(confirm));
  };

  const handleCancelOrder = async (order: Order) => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables: UpdateOrderValues = {
        status: EnumOrderStatus.OVERDATE,
      };
      const res = await updateOrder(order?.id, token, variables);
      if (res) {
        dispatch(closeConfirm());
        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Đã hủy đơn hàng do quá hạn xác nhận thành công!",
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
  };

  return (
    <div className="flex flex-col gap-8">
      {/* filter */}
      <div className="flex flex-row items-end justify-between">
        <div className="flex flex-row items-center gap-1">
          <MySelect
            options={labelOptions}
            selected={labelOptions[0].value}
            onSelectItem={(item: Item) => setSelectedOption(item)}
          />
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
              placeholder="Nhập nội dung tìm kiếm"
              className="w-[300px]"
              onChange={(event) => setSearchText(event.target.value)}
            />
          </form>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <div>Ngày đặt hàng</div>

          <div className="flex flex-row items-center gap-1">
            <MyDatePicker
              id="order-at"
              name="order-at"
              className="flex-1"
              onChange={(value) => setOrderAt(value[0].toString())}
            />

            {orderAt !== "" ? (
              <IconButton onClick={() => setOrderAt("")}>
                <ClearRoundedIcon style={{ width: 16, height: 16 }} />
              </IconButton>
            ) : null}
          </div>
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
                <th className="px-1 py-4">Hạn xác nhận</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => {
                // if (!order?.orderProducts?.length) return null;

                //check xem đã quá hạn xác nhận chưa
                const now = Date.now();
                const orderAt = new Date(order?.orderAt);
                orderAt.setDate(orderAt.getDate() + 7);
                const notOverdate = new Date(orderAt).getTime() > now;

                return (
                  <tr
                    key={order?.id}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3">{order?.code}</td>
                    <td className="px-1 py-4">{order?.client?.name}</td>
                    <td className="px-1 py-4">{order?.store?.name}</td>
                    <td className="px-1 py-4">
                      {notOverdate ? (
                        <MyLabel type="warning">Chờ xác nhận</MyLabel>
                      ) : (
                        <MyLabel type="error">Quá hạn xác nhận</MyLabel>
                      )}
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
                        <Tooltip title="Hủy đơn hàng">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() =>
                              handleCancelOrderByAdmin(order, notOverdate)
                            }
                          >
                            <RemoveCircleOutlineRoundedIcon
                              sx={{ fontSize: 20, color: COLORS.support.c500 }}
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

export default WaitingOrdersTable;
