"use client";
import { adminFilterAuctions, updateAuction } from "@/apis/services/auctions";
import storage from "@/apis/storage";
import NoItemCard from "@/components/no-item/no-item-card";
import { COLORS } from "@/enum/colors";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { AlertState, Auction } from "@/enum/defined-type";
import { DetailIcon } from "@/enum/icons";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import {
  formatCommonTime,
  formatCurrency,
  renderStatusPayment,
} from "@/enum/functions";
import AdminDetailAuction from "@/components/auctions/admin-detail-auction";
import { openModal } from "@/redux/slices/modalSlice";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import RejectAuctionModal from "@/components/auctions/reject-auction-modal";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const WaitingAuctionsTab = () => {
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [title, setTitle] = useState<string>("");

  const getAllAuctions = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: null,
        overDate: false,
        ...(title !== "" && {
          auctionName: title,
        }),
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
  }, [refetchQueries]);

  const handleOpenDetailModal = (auctionId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết dự án",
      content: <AdminDetailAuction auctionId={auctionId} />,
      screen: SCREEN.LG,
    };
    dispatch(openModal(modal));
  };

  const handleUpdateAuction = (auction: Auction) => {
    const confirm: any = {
      isOpen: true,
      title: "DUYỆT DỰ ÁN",
      message: "Bạn có chắc chắn duyệt dự án này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => handleAcceptAuction(auction),
    };

    dispatch(openConfirm(confirm));
  };

  const handleAcceptAuction = async (auction: Auction) => {
    try {
      dispatch(openLoading());
      const variables = {
        isAccepted: true,
        ...(auction?.isPaymentFull && {
          status: AuctionStatus.SENT_SELLER,
        }),
      };
      const token = storage.getLocalAccessToken();
      const res = await updateAuction(auction?.id, variables, token);
      if (res) {
        dispatch(closeConfirm());
        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Đã duyệt dự án thành công!",
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

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const handleOpenRejectModal = (auctionId: number) => {
    const modal = {
      isOpen: true,
      title: "Nêu lý do từ chối",
      content: (
        <RejectAuctionModal
          auctionId={auctionId}
          handleRefetch={handleRefetch}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* filter */}
      <div className="grid grid-cols-3">
        <form
          className="col-span-1 flex-1 text-slate-900 dark:text-slate-100"
          onSubmit={(e) => {
            getAllAuctions();
            e.preventDefault();
          }}
        >
          <MyTextField
            id="auction-search-field"
            placeholder="Nhập keyword mà bạn muốn tìm kiếm"
            onChange={(event) => setTitle(event.target.value)}
            endIcon={<SearchRoundedIcon sx={{ color: COLORS.grey.c400 }} />}
          />
        </form>
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
                <th className="px-1 py-4">Thời hạn duyệt</th>
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
                        <Tooltip
                          title={`${auction?.isPaymentFull ? "Gửi thông tin đến handmader" : "Phê duyệt"}`}
                        >
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleUpdateAuction(auction)}
                          >
                            <CheckCircleOutlineRoundedIcon
                              sx={{ color: COLORS.purple.c800, fontSize: 20 }}
                            />
                          </div>
                        </Tooltip>
                        <Tooltip title="Từ chối">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenRejectModal(auction?.id)}
                          >
                            <HighlightOffRoundedIcon
                              sx={{ color: COLORS.support.c600, fontSize: 21 }}
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
      {!auctions?.length && (
        <NoItemCard title="Bạn không có dự án nào ở đây!" />
      )}
    </div>
  );
};

export default WaitingAuctionsTab;
