import { adminFilterAuctions, updateAuction } from "@/apis/services/auctions";
import { updateScore } from "@/apis/services/stores";
import storage from "@/apis/storage";
import { StoreScoreValues } from "@/apis/types";
import AdminDetailAuction from "@/components/auctions/admin-detail-auction";
import NoItemCard from "@/components/no-item/no-item-card";
import {
  AlertStatus,
  AuctionStatus,
  EnumScore,
  Role,
  StoreStatus,
  TypeScore,
} from "@/enum/constants";
import { AlertState, Auction } from "@/enum/defined-type";
import { formatCurrency } from "@/enum/functions";
import { DetailIcon } from "@/enum/icons";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { openModal } from "@/redux/slices/modalSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { COLORS } from "@/enum/colors";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import BannedStoreModal from "@/components/stores/banned-store-modal";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const CanceledAuctionsTab = () => {
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [title, setTitle] = useState<string>("");

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const getAllAuctions = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: AuctionStatus.CANCELED,
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

  const handleConfirmMinusPoint = (storeId: number, auctionId: number) => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN TRỪ ĐIỂM UY TÍN",
      message: "Bạn có xác nhận trừ điểm uy tín của nhà bán này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => handleMinusPoint(storeId, auctionId),
    };

    dispatch(openConfirm(confirm));
  };

  const handleMinusPoint = async (storeId: number, auctionId: number) => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables: StoreScoreValues = {
        storeId: storeId,
        type: TypeScore.MINUS,
        amount: EnumScore.AUCTION_CANCELED,
      };
      const res1 = await updateScore(variables, token);

      const params = {
        isMinusPoint: true,
      };

      const res2 = await updateAuction(auctionId, params, token);
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

  const renderCanceledUser = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "Ban quản trị";
      case Role.SELLER:
        return "Nhà bán";
      case Role.USER:
        return "Khách hàng";
    }
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
                <th className="px-1 py-4">Số lượng</th>
                <th className="px-1 py-4">Ngân sách</th>
                <th className="px-1 py-4">Người hủy</th>
                <th className="px-1 py-4 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {auctions?.map((auction, index) => {
                const bidder = auction?.candidates?.filter(
                  (bidder) => bidder.isSelected === true,
                )[0];

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
                    <td className="px-1 py-4">
                      {renderCanceledUser(auction?.canceledBy?.role as Role)}{" "}
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
                        {bidder ? (
                          <>
                            {!auction?.isMinusPoint ? (
                              <Tooltip title="Trừ điểm uy tín">
                                <div
                                  className="hover:cursor-pointer"
                                  onClick={() =>
                                    handleConfirmMinusPoint(
                                      bidder?.store?.id,
                                      auction?.id,
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
                          </>
                        ) : null}
                        {bidder ? (
                          <>
                            {!(bidder?.store?.status === StoreStatus.BANNED) ? (
                              <Tooltip title="Cấm hoạt động của nhà bán">
                                <div
                                  className="hover:cursor-pointer"
                                  onClick={() =>
                                    handleOpenBannedModal(bidder?.store?.id)
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
                          </>
                        ) : null}
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

export default CanceledAuctionsTab;
