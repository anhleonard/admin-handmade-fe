import {
  adminFilterAuctions,
  updateAuctionStatus,
} from "@/apis/services/auctions";
import storage from "@/apis/storage";
import AdminDetailAuction from "@/components/auctions/admin-detail-auction";
import NoItemCard from "@/components/no-item/no-item-card";
import {
  AlertStatus,
  AuctionStatus,
  EnumScore,
  TypeScore,
} from "@/enum/constants";
import { AlertState, Auction, Bidder } from "@/enum/defined-type";
import {
  calculateDaysAfterAccepted,
  findMaxPercentage,
  formatCurrency,
} from "@/enum/functions";
import { DetailIcon } from "@/enum/icons";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyLabel from "@/libs/label";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { openModal } from "@/redux/slices/modalSlice";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import { StoreScoreValues } from "@/apis/types";
import { updateScore } from "@/apis/services/stores";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { COLORS } from "@/enum/colors";

const DeliveryAuctionsTable = () => {
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [title, setTitle] = useState<string>("");

  const getAllAuctions = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: AuctionStatus.DELIVERY,
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

  const handleOpenDetailModal = (auctionId: number, bidder: Bidder) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết dự án",
      content: <AdminDetailAuction auctionId={auctionId} bidder={bidder} />,
      screen: SCREEN.LG,
    };
    dispatch(openModal(modal));
  };

  const handleUpdateAuction = (auction: Auction) => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN GIAO HÀNG",
      message: "Bạn có xác nhận đã giao đơn hàng này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {
        try {
          dispatch(openLoading());

          //update status for auction
          const variables = {
            status: AuctionStatus.COMPLETED,
          };
          const token = storage.getLocalAccessToken();
          const res = await updateAuctionStatus(auction?.id, variables, token);

          //update score for store
          const bidder = auction?.candidates?.filter(
            (bidder) => bidder.isSelected === true,
          )[0];
          const params: StoreScoreValues = {
            storeId: bidder?.store?.id,
            type: TypeScore.PLUS,
            amount: EnumScore.AUCTION_SUCCESS,
          };
          const res1 = await updateScore(params, token);

          if (res && res1) {
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
                <th className="px-1 py-4">Handmader</th>
                <th className="px-1 py-4">Giá chốt</th>
                <th className="px-1 py-4">Hoàn thành</th>
                <th className="px-1 py-4">Tiến độ</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
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
                    <td className="px-1 py-4">{bidder?.store?.name}</td>
                    <td className="px-1 py-4">
                      {formatCurrency(bidder?.bidderMoney)}
                    </td>
                    <td className="px-1 py-4">
                      {bidder?.estimatedDay -
                        calculateDaysAfterAccepted(
                          bidder?.estimatedDay,
                          bidder?.acceptedAt,
                        ) >=
                      0 ? (
                        `${
                          bidder?.estimatedDay -
                          calculateDaysAfterAccepted(
                            bidder?.estimatedDay,
                            bidder?.acceptedAt,
                          )
                        } ngày`
                      ) : (
                        <MyLabel type="error">Quá hạn</MyLabel>
                      )}
                    </td>
                    <td className="px-1 py-4">
                      {findMaxPercentage(auction?.progresses)}%
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết">
                          <div
                            className="pt-1 hover:cursor-pointer"
                            onClick={() =>
                              handleOpenDetailModal(auction?.id, bidder)
                            }
                          >
                            <DetailIcon />
                          </div>
                        </Tooltip>

                        <Tooltip title="Xác nhận đã giao hàng">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleUpdateAuction(auction)}
                          >
                            <CheckCircleOutlineRoundedIcon
                              sx={{ color: COLORS.purple.c800, fontSize: 20 }}
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

export default DeliveryAuctionsTable;
