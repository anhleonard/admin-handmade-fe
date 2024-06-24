import { DetailIcon, SearchIcon } from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect, { Item } from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyLabel from "@/libs/label";
import { Tooltip } from "@mui/material";
import { COLORS } from "@/enum/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AlertState, Order } from "@/enum/defined-type";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { adminOrders, updateOrder } from "@/apis/services/orders";
import {
  AlertStatus,
  EnumOrderStatus,
  EnumScore,
  Page,
  StoreStatus,
  TypeScore,
  rowsPerPage,
} from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import {
  formatCommonTime,
  formatCurrency,
  renderWhoCanceled,
} from "@/enum/functions";
import DetailOrderModal from "../../modals/detail-order-modal";
import { openModal } from "@/redux/slices/modalSlice";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { updateScore } from "@/apis/services/stores";
import { StoreScoreValues, UpdateOrderValues } from "@/apis/types";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import BannedStoreModal from "@/components/stores/banned-store-modal";
import { MyPagination } from "@/libs/pagination";

const labelOptions = [
  { label: "Mã đơn hàng", value: "ORDER_CODE" },
  { label: "Tên khách hàng", value: "CLIENT_NAME" },
  { label: "Tên cửa hàng", value: "STORE_NAME" },
];

const CancelOrdersTable = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Item>(labelOptions[0]);

  const getAllOrders = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: EnumOrderStatus.CENCELLED,
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
        ...(selectedOption === labelOptions[2] &&
          searchText !== "" && {
            storeName: searchText,
          }),
      };
      const res = await adminOrders(token, query);
      if (res) {
        setCount(res?.total ?? 0);
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
  }, [refetchQueries, page, rowsPage]);

  const handleOpenDetailModal = (orderId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết đơn hàng",
      content: (
        <DetailOrderModal type={EnumOrderStatus.CENCELLED} orderId={orderId} />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleConfirmMinusPoint = (storeId: number, orderId: number) => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN TRỪ ĐIỂM UY TÍN",
      message: "Bạn có xác nhận trừ điểm uy tín của nhà bán này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => handleMinusPoint(storeId, orderId),
    };

    dispatch(openConfirm(confirm));
  };

  const handleMinusPoint = async (storeId: number, orderId: number) => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables: StoreScoreValues = {
        storeId: storeId,
        type: TypeScore.MINUS,
        amount: EnumScore.ORDER_CANCELED,
      };
      const res1 = await updateScore(variables, token);

      const params: UpdateOrderValues = {
        isMinusPoint: true,
      };

      const res2 = await updateOrder(orderId, token, params);
      if (res1 && res2) {
        dispatch(closeConfirm());
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
                <th className="px-1 py-4">Hủy bởi</th>
                <th className="px-1 py-4">Ngày hủy</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => {
                // if (!order?.orderProducts?.length) return null;
                return (
                  <tr
                    key={index}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3">{order?.code}</td>
                    <td className="px-1 py-4">{order?.client?.name}</td>
                    <td className="px-1 py-4">{order?.store?.name}</td>
                    <td className="px-1 py-4">
                      <MyLabel type="error">Đã hủy</MyLabel>
                    </td>
                    <td className="px-1 py-4">
                      {order?.orderProducts?.length}
                    </td>
                    <td className="px-1 py-4">
                      {formatCurrency(order?.totalPayment)}
                    </td>
                    <td className="px-1 py-4">
                      {order?.updatedBy?.role &&
                        renderWhoCanceled(order?.updatedBy?.role)}
                    </td>
                    <td className="px-1 py-4">
                      {formatCommonTime(order?.updatedAt)}
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
                        {!order?.isMinusPoint ? (
                          <Tooltip title="Trừ điểm uy tín">
                            <div
                              className="hover:cursor-pointer"
                              onClick={() =>
                                handleConfirmMinusPoint(
                                  order?.store?.id,
                                  order?.id,
                                )
                              }
                            >
                              <ArrowCircleDownRoundedIcon
                                sx={{
                                  fontSize: 20,
                                  color: COLORS.support.c500,
                                }}
                              />
                            </div>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Đã trừ điểm">
                            <div className="hover:cursor-pointer">
                              <CheckCircleOutlineRoundedIcon
                                sx={{
                                  fontSize: 20,
                                  color: COLORS.purple.c900,
                                }}
                              />
                            </div>
                          </Tooltip>
                        )}
                        {!(order?.store?.status === StoreStatus.BANNED) ? (
                          <Tooltip title="Cấm hoạt động của nhà bán">
                            <div
                              className="hover:cursor-pointer"
                              onClick={() =>
                                handleOpenBannedModal(order?.store?.id)
                              }
                            >
                              <BlockRoundedIcon
                                sx={{
                                  fontSize: 19,
                                  color: COLORS.support.c500,
                                }}
                              />
                            </div>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Cửa hàng đã bị cấm">
                            <div className="hover:cursor-pointer">
                              <BlockRoundedIcon
                                sx={{
                                  fontSize: 19,
                                  color: COLORS.blue.c900,
                                }}
                              />
                            </div>
                          </Tooltip>
                        )}
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

export default CancelOrdersTable;
