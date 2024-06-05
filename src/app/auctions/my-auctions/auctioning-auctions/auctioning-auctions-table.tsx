import { adminFilterAuctions } from "@/apis/services/auctions";
import storage from "@/apis/storage";
import AdminDetailAuction from "@/components/auctions/admin-detail-auction";
import NoItemCard from "@/components/no-item/no-item-card";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { AlertState, Auction } from "@/enum/defined-type";
import {
  calculateAverageBidderMoney,
  formatCommonTime,
  formatCurrency,
  renderStatusPayment,
} from "@/enum/functions";
import { DetailIcon, EditIcon, OffIcon, SearchIcon } from "@/enum/icons";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyLabel from "@/libs/label";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { openModal } from "@/redux/slices/modalSlice";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AuctioningAuctionsTable = () => {
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const getAllAuctions = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: AuctionStatus.AUCTIONING,
      };
      const res = await adminFilterAuctions(token, query);
      if (res) {
        setAuctions(res?.data);
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
    getAllAuctions();
  }, []);

  const handleOpenDetailModal = (auctionId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết dự án",
      content: <AdminDetailAuction auctionId={auctionId} />,
      screen: SCREEN.LG,
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
            placeholder="Nhập nội dung tìm kiếm"
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
                <th className="py-4 pl-3">Tên dự án</th>
                <th className="py-4 pl-3">Khách hàng</th>
                <th className="px-1 py-4">Yêu cầu</th>
                <th className="px-1 py-4">Ngân sách</th>
                <th className="px-1 py-4">Thanh toán cọc</th>
                <th className="px-1 py-4">Thanh toán hết</th>
                <th className="px-1 py-4">Ngày tạo</th>
                <th className="px-1 py-4">Ngày đóng</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {auctions?.map((auction, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3">
                      <div className="max-w-[200px]">{auction?.name}</div>
                    </td>
                    <td className="px-1 py-4">{auction?.owner?.name}</td>
                    <td className="px-1 py-4">{auction?.requiredNumber}</td>
                    <td className="px-1 py-4">
                      {formatCurrency(auction?.maxAmount)}
                    </td>
                    <td className="px-1 py-4 text-center">
                      {renderStatusPayment(auction?.isPaymentDeposit)}
                    </td>
                    <td className="px-1 py-4 text-center">
                      {renderStatusPayment(auction?.isPaymentFull)}
                    </td>
                    <td className="px-1 py-4">
                      {formatCommonTime(auction?.createdAt)}
                    </td>
                    <td className="px-1 py-4">
                      {formatCommonTime(auction?.createdAt, 7)}
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết">
                          <div
                            className="pt-1 hover:cursor-pointer"
                            onClick={() => handleOpenDetailModal(auction?.id)}
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
      {!auctions?.length && (
        <NoItemCard title="Bạn không có dự án nào ở đây!" />
      )}
    </div>
  );
};

export default AuctioningAuctionsTable;
