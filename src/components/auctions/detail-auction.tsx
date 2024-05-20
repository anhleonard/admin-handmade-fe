import {
  calculateAverageBidderMoney,
  calculateDaysAfterAccepted,
  calculateRemainingDays,
  findMaxPercentage,
  findMinMaxBidderMoney,
  formatCurrency,
} from "@/enum/functions";
import MyLabel from "@/libs/label";
import { Collapse, List, ListItem } from "@mui/material";
import React from "react";
import MyDisplayImage from "@/libs/display-image";
import Button from "@/libs/button";
import { AlertState, Auction, Bidder } from "@/enum/defined-type";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { openConfirm } from "@/redux/slices/confirmSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { updateAuction } from "@/apis/services/auctions";
import storage from "@/apis/storage";

type Props = {
  type?: "client" | "seller";
  status: AuctionStatus;
  auction: Auction;
  bidder?: Bidder;
  handleRefetch: () => void;
};

const DetailAuction = ({
  type = "client",
  status,
  auction,
  bidder,
  handleRefetch,
}: Props) => {
  const dispatch = useDispatch();

  const minMax = auction?.candidates?.length
    ? findMinMaxBidderMoney(auction?.candidates)
    : [0, 0];

  const handleSubmitAuction = async () => {
    const maxPercentage = findMaxPercentage(auction?.progresses);
    if (maxPercentage !== 100) {
      let alert: AlertState = {
        isOpen: true,
        title: "CHƯA ĐẠT ĐỦ TIẾN ĐỘ",
        message: "Vui lòng hoàn thành dự án với 100% tiến độ!",
        type: AlertStatus.WARNING,
      };
      dispatch(openAlert(alert));
      return;
    }

    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables = {
        readyToLaunch: true,
      };
      const res = await updateAuction(auction.id, variables, token);
      if (res) {
        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Đã báo cáo dự án hoàn thành cho admin!",
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

  const handleCancelAuction = () => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN HỦY",
      message: "Bạn đã chắc chắn hủy dự án này chưa?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {},
    };

    dispatch(openConfirm(confirm));
  };

  return (
    <div>
      <div className="rounded-2xl border-[2px] border-grey-c50">
        <ListItem
          className={`rounded-tl-2xl rounded-tr-2xl border-b-[2px] border-grey-c50 bg-white`}
          disablePadding
        >
          <div className="flex w-full flex-row items-center justify-between px-4 py-4">
            <div className="flex flex-row items-center gap-2">
              <div className="text-base font-semibold text-primary-c900">
                {auction?.name}
              </div>
              {status === AuctionStatus.AUCTIONING && (
                <MyLabel type="warning">
                  Còn {calculateRemainingDays(auction?.closedDate)} ngày
                </MyLabel>
              )}
              {type === "seller" && status !== AuctionStatus.CANCELED && (
                <MyLabel type="success">
                  Đạt tiến độ: {findMaxPercentage(auction?.progresses)}%
                </MyLabel>
              )}
            </div>
            {type === "seller" ? (
              <>
                {status === AuctionStatus.PROGRESS && (
                  <MyLabel type="progress">Đang tiến hành</MyLabel>
                )}
                {status === AuctionStatus.COMPLETED && (
                  <MyLabel type="success">Đã hoàn thành</MyLabel>
                )}
                {status === AuctionStatus.CANCELED && (
                  <MyLabel type="error">Đã hủy</MyLabel>
                )}
              </>
            ) : (
              <MyLabel type="success">
                Max: {formatCurrency(auction?.maxAmount)}
              </MyLabel>
            )}
          </div>
        </ListItem>
        <Collapse in>
          <List disablePadding className="flex flex-col text-sm">
            {/* mô tả */}
            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-grey-c900">Mô tả chi tiết</div>
                <div className="text-justify font-normal text-grey-c900">
                  {auction.description}
                </div>
              </div>
            </ListItem>
            {/* hình ảnh */}
            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              <div className="flex flex-col gap-2">
                <div className="font-bold text-grey-c900">Hình ảnh ví dụ</div>
                <div className="flex flex-row gap-5">
                  <MyDisplayImage
                    src="https://salt.tikicdn.com/cache/750x750/ts/product/40/d1/23/c7a77754eaeb40915246b49476ad68ff.jpg.webp"
                    alt=""
                  />
                  <MyDisplayImage
                    src="https://salt.tikicdn.com/cache/750x750/ts/product/40/d1/23/c7a77754eaeb40915246b49476ad68ff.jpg.webp"
                    alt=""
                  />
                  <MyDisplayImage
                    src="https://salt.tikicdn.com/cache/750x750/ts/product/40/d1/23/c7a77754eaeb40915246b49476ad68ff.jpg.webp"
                    alt=""
                  />
                </div>
              </div>
            </ListItem>
            {/* Số ngày dự kiến hoàn thành dự án mà client đặt */}
            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-grey-c900">
                  Số ngày dự kiến hoàn thành dự án
                </div>
                <div className="font-medium text-primary-c900">
                  {auction?.maxDays}
                </div>
              </div>
            </ListItem>
            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              {type === "client" && (
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số người đã đặt giá
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.candidates?.length}
                  </div>
                </div>
              )}
              {type === "seller" && (
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Giá chốt</div>
                  <div className="font-medium text-primary-c900">
                    {bidder?.bidderMoney && formatCurrency(bidder?.bidderMoney)}
                  </div>
                </div>
              )}
            </ListItem>
            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              {type === "client" && (
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Giá đặt trung bình
                  </div>
                  <div className="font-medium text-primary-c900">
                    {formatCurrency(
                      auction?.candidates?.length
                        ? calculateAverageBidderMoney(auction?.candidates)
                        : 0,
                    )}
                  </div>
                </div>
              )}
              {type === "seller" && (
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Làm trong vòng</div>
                  <div className="font-medium text-primary-c900">
                    {bidder?.estimatedDay} ngày
                  </div>
                </div>
              )}
            </ListItem>
            {status !== AuctionStatus.CANCELED && (
              <ListItem className="block w-full px-4 py-4" disablePadding>
                {type === "client" && (
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-grey-c900">
                      Giá đặt thấp nhất/ cao nhất
                    </div>
                    <div className="font-medium text-primary-c900">
                      {`${formatCurrency(minMax[0])} / ${formatCurrency(minMax[1])}`}
                    </div>
                  </div>
                )}
                {type === "seller" && (
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-grey-c900">
                      Số ngày còn lại
                    </div>
                    <div className="font-medium text-primary-c900">
                      {bidder?.estimatedDay &&
                        bidder?.acceptedAt &&
                        calculateDaysAfterAccepted(
                          bidder?.estimatedDay,
                          bidder?.acceptedAt,
                        )}{" "}
                      ngày
                    </div>
                  </div>
                )}
              </ListItem>
            )}
          </List>
        </Collapse>
      </div>
      {type === "seller" &&
        status === AuctionStatus.PROGRESS &&
        !auction?.readyToLaunch && (
          <div className="mt-4 flex flex-row justify-end gap-3">
            <Button
              className="!w-fit !px-3 !py-1.5"
              color="grey"
              onClick={() => handleCancelAuction()}
            >
              <span className="text-xs font-medium">Hủy dự án</span>
            </Button>
            <Button
              className="!w-fit !px-3 !py-1.5"
              color="primary"
              onClick={() => handleSubmitAuction()}
            >
              <span className="text-xs font-medium">Dự án đã xong?</span>
            </Button>
          </div>
        )}
      {type === "seller" &&
        status === AuctionStatus.PROGRESS &&
        auction?.readyToLaunch && (
          <div className="mt-4 flex flex-row justify-end">
            <MyLabel type="success">Đã thông báo tới admin!</MyLabel>
          </div>
        )}
    </div>
  );
};

export default DetailAuction;
