import {
  calculateAverageBidderMoney,
  calculateDaysAfterAccepted,
  calculateRemainingDays,
  findMaxPercentage,
  findMinMaxBidderMoney,
  formatCommonTime,
  formatCurrency,
} from "@/enum/functions";
import MyLabel from "@/libs/label";
import { Collapse, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyDisplayImage from "@/libs/display-image";
import { AlertState, Auction, Bidder } from "@/enum/defined-type";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { singleAuction } from "@/apis/services/auctions";
import ListSellerPrice from "@/screens/auctions/list-seller-price";
import { headerUrl } from "@/apis/services/authentication";

type Props = {
  auctionId: number;
  bidder?: Bidder;
};

const AdminDetailAuction = ({ auctionId, bidder }: Props) => {
  const [auction, setAuction] = useState<Auction>();
  const [minMax, setMinMax] = useState<number[]>([0, 0]);
  const dispatch = useDispatch();

  const getSingleAuction = async () => {
    try {
      dispatch(openLoading());
      const res = await singleAuction(auctionId);
      if (res) {
        setMinMax(
          res?.candidates?.length
            ? findMinMaxBidderMoney(res?.candidates)
            : [0, 0],
        );
        setAuction(res);
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
    getSingleAuction();
  }, []);

  const renderAuctionStatus = (status: AuctionStatus) => {
    switch (status) {
      case AuctionStatus.AUCTIONING:
        return <MyLabel type="warning">Đang đấu giá</MyLabel>;

      case AuctionStatus.PROGRESS:
        return <MyLabel type="progress">Đang tiến hành</MyLabel>;

      case AuctionStatus.DELIVERY:
        return <MyLabel type="delivery">Đang vận chuyển</MyLabel>;

      case AuctionStatus.COMPLETED:
        return <MyLabel type="success">Đã hoàn thành</MyLabel>;

      case AuctionStatus.CANCELED:
        return <MyLabel type="error">Đã hủy</MyLabel>;

      default:
        return <MyLabel type="grey">Chờ duyệt</MyLabel>;
    }
  };

  return (
    <div className="space-y-8 py-4">
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
              {auction?.status === AuctionStatus.AUCTIONING && (
                <MyLabel type="warning">
                  Còn{" "}
                  {auction?.closedDate &&
                    calculateRemainingDays(auction?.closedDate)}{" "}
                  ngày
                </MyLabel>
              )}
              {auction?.status === AuctionStatus.PROGRESS && (
                <MyLabel type="success">
                  Đạt tiến độ:{" "}
                  {auction?.progresses &&
                    findMaxPercentage(auction?.progresses)}
                  %
                </MyLabel>
              )}
              {renderAuctionStatus(auction?.status as AuctionStatus)}
            </div>
            <MyLabel type="success">
              Max: {auction?.maxAmount && formatCurrency(auction?.maxAmount)}
            </MyLabel>
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
                  {auction?.description}
                </div>
              </div>
            </ListItem>
            {/* hình ảnh */}
            {auction?.images?.length ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-grey-c900">Hình ảnh ví dụ</div>
                  <div className="flex flex-row gap-5">
                    {auction?.images?.length
                      ? auction?.images?.map((image, index) => {
                          return (
                            <MyDisplayImage
                              key={index}
                              src={`${headerUrl}/products/${image}`}
                              alt="example-image"
                            />
                          );
                        })
                      : null}
                  </div>
                </div>
              </ListItem>
            ) : null}

            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-grey-c900">Khách hàng</div>
                <div className="font-medium text-primary-c900">
                  {auction?.owner?.name}
                </div>
              </div>
            </ListItem>

            {(!auction?.status ||
              auction?.status === AuctionStatus.CANCELED) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Ngân sách</div>
                  <div className="font-medium text-primary-c900">
                    {auction?.maxAmount && formatCurrency(auction?.maxAmount)}
                  </div>
                </div>
              </ListItem>
            )}

            {(!auction?.status ||
              auction?.status === AuctionStatus.CANCELED) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Số lượng</div>
                  <div className="font-medium text-primary-c900">
                    {auction?.requiredNumber}
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.CANCELED && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Ngày hủy</div>
                  <div className="font-medium text-primary-c900">
                    {formatCommonTime(auction?.updatedAt)}
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.CANCELED && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Hủy bởi</div>
                  <div className="font-medium text-primary-c900">
                    {auction?.canceledBy?.name}
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.CANCELED && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Lý do hủy</div>
                  <div className="font-medium text-primary-c900">
                    {auction?.additionalComment}
                  </div>
                </div>
              </ListItem>
            )}

            {!auction?.status && !auction?.isPaymentFull && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Tiền đã cọc</div>
                  <div className="font-medium text-primary-c900">
                    {auction?.deposit && formatCurrency(auction?.deposit)}
                  </div>
                </div>
              </ListItem>
            )}

            {(!auction?.status ||
              auction?.status === AuctionStatus.AUCTIONING) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Ngày tạo dự án</div>
                  <div className="font-medium text-primary-c900">
                    {auction?.createdAt && formatCommonTime(auction?.createdAt)}
                  </div>
                </div>
              </ListItem>
            )}

            {(auction?.status === AuctionStatus.AUCTIONING ||
              !auction?.status) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Ngày đóng đặt giá
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.closedDate &&
                      formatCommonTime(auction?.closedDate)}
                  </div>
                </div>
              </ListItem>
            )}

            {!auction?.status && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Thời hạn duyệt</div>
                  <div className="font-medium text-primary-c900">
                    {auction?.createdAt &&
                      formatCommonTime(auction?.createdAt, 7)}
                  </div>
                </div>
              </ListItem>
            )}
            {/* Số ngày dự kiến hoàn thành dự án mà client đặt */}
            {!auction?.status && (
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
            )}
            {auction?.status === AuctionStatus.AUCTIONING && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số người đã đặt giá
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.candidates?.length}
                  </div>
                </div>
              </ListItem>
            )}

            {(auction?.status === AuctionStatus.PROGRESS ||
              auction?.status === AuctionStatus.DELIVERY ||
              auction?.status === AuctionStatus.COMPLETED) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số ngày dự kiến hoàn thành dự án
                  </div>
                  <div className="font-medium text-primary-c900">
                    {bidder?.estimatedDay} ngày
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.PROGRESS && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
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
              </ListItem>
            )}

            {(auction?.status === AuctionStatus.DELIVERY ||
              auction?.status === AuctionStatus.COMPLETED) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số ngày hoàn thành
                  </div>
                  <div className="font-medium text-primary-c900">
                    {bidder?.estimatedDay &&
                    bidder?.estimatedDay -
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
                  </div>
                </div>
              </ListItem>
            )}

            {(auction?.status === AuctionStatus.PROGRESS ||
              auction?.status === AuctionStatus.DELIVERY ||
              auction?.status === AuctionStatus.COMPLETED) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Tiến độ công việc
                  </div>
                  <div className="font-medium text-primary-c900">
                    {findMaxPercentage(auction?.progresses)}%
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.AUCTIONING && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
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
              </ListItem>
            )}
            {auction?.status !== AuctionStatus.CANCELED &&
              auction?.status === AuctionStatus.AUCTIONING && (
                <ListItem
                  className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                  disablePadding
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-grey-c900">
                      Giá đặt thấp nhất/ cao nhất
                    </div>
                    <div className="font-medium text-primary-c900">
                      {`${formatCurrency(minMax[0])} / ${formatCurrency(minMax[1])}`}
                    </div>
                  </div>
                </ListItem>
              )}

            {auction?.status !== AuctionStatus.CANCELED ? (
              <ListItem className="border-b-[2px] border-grey-c50">
                <div className="flex flex-col gap-1 ">
                  <div className="font-bold text-grey-c900">
                    Trạng thái thanh toán tiền cọc
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.isPaymentDeposit ? (
                      <MyLabel type="success">Đã thanh toán</MyLabel>
                    ) : (
                      <MyLabel type="error">Chưa thanh toán</MyLabel>
                    )}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.status === AuctionStatus.PROGRESS ||
            auction?.status === AuctionStatus.DELIVERY ||
            auction?.status === AuctionStatus.COMPLETED ? (
              <ListItem className="border-b-[2px] border-grey-c50">
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Tổng thanh toán
                  </div>
                  <div className="font-medium text-primary-c900">
                    {bidder?.bidderMoney && formatCurrency(bidder?.bidderMoney)}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.status === AuctionStatus.PROGRESS ||
            auction?.status === AuctionStatus.DELIVERY ||
            auction?.status === AuctionStatus.COMPLETED ||
            (!auction?.status && auction?.isPaymentFull) ? (
              <ListItem>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Trạng thái thanh toán toàn bộ dự án
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.isPaymentFull ? (
                      <MyLabel type="success">Đã thanh toán</MyLabel>
                    ) : (
                      <MyLabel type="error">Chưa thanh toán</MyLabel>
                    )}
                  </div>
                </div>
              </ListItem>
            ) : null}
          </List>
        </Collapse>
      </div>

      {auction?.status === AuctionStatus.AUCTIONING && (
        <ListSellerPrice auction={auction} />
      )}
    </div>
  );
};

export default AdminDetailAuction;
