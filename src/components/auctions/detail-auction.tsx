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
import React from "react";
import MyDisplayImage from "@/libs/display-image";
import { Auction, Bidder } from "@/enum/defined-type";
import { AuctionStatus, Role } from "@/enum/constants";
import { useDispatch } from "react-redux";
import storage from "@/apis/storage";
import { headerUrl } from "@/apis/services/authentication";

type Props = {
  status: AuctionStatus;
  auction: Auction;
  bidder?: Bidder;
  handleRefetch: () => void;
};

const DetailAuction = ({ status, auction, bidder, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const minMax = auction?.candidates?.length
    ? findMinMaxBidderMoney(auction?.candidates)
    : [0, 0];

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

              {status === AuctionStatus.AUCTIONING ? (
                calculateRemainingDays(auction?.closedDate) > 0 ? (
                  <MyLabel type="warning">
                    Còn {calculateRemainingDays(auction?.closedDate)} ngày
                  </MyLabel>
                ) : (
                  <MyLabel type="error">Quá hạn đấu giá</MyLabel>
                )
              ) : null}

              {status !== AuctionStatus.AUCTIONING
                ? renderAuctionStatus(auction?.status as AuctionStatus)
                : null}
            </div>
            <MyLabel type="success">
              Max: {formatCurrency(auction?.maxAmount)}
            </MyLabel>
          </div>
        </ListItem>
        <Collapse in>
          <List disablePadding className="flex flex-col text-sm">
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

            {auction?.images?.length ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-grey-c900">Hình ảnh ví dụ</div>
                  <div className="flex flex-row gap-5">
                    {auction?.images?.map((image, index) => {
                      return (
                        <MyDisplayImage
                          key={index}
                          alt="example-image"
                          src={`${headerUrl}/products/${image}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </ListItem>
            ) : null}

            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-grey-c900">Yêu cầu</div>
                <div className="font-medium text-primary-c900">
                  {auction?.requiredNumber}
                </div>
              </div>
            </ListItem>

            {(auction?.status === AuctionStatus.AUCTIONING ||
              !auction?.status) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Ngày tạo</div>
                  <div className="font-medium text-primary-c900">
                    {formatCommonTime(auction?.createdAt)}
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
                  <div className="font-bold text-grey-c900">Ngày đóng</div>
                  <div className="font-medium text-primary-c900">
                    {formatCommonTime(auction?.closedDate)}
                  </div>
                </div>
              </ListItem>
            )}

            {auction.status === AuctionStatus.AUCTIONING || !auction?.status ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Ngân sách</div>
                  <div className="font-medium text-primary-c900">
                    {formatCurrency(auction?.maxAmount)}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.status === AuctionStatus.CANCELED && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Người hủy</div>
                  <div className="font-medium text-primary-c900">
                    {renderCanceledUser(auction?.canceledBy?.role as Role)}
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
              <ListItem className="block w-full px-4 py-4" disablePadding>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Lý do hủy</div>
                  <div className="font-medium text-primary-c900">
                    {auction?.additionalComment}
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.PROGRESS ||
            !auction?.status ||
            auction?.status === AuctionStatus.AUCTIONING ||
            auction?.status === AuctionStatus.DELIVERY ||
            auction?.status === AuctionStatus.COMPLETED ? (
              <ListItem
                className={`block w-full border-b-[2px] border-grey-c50 px-4 py-4`}
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số ngày dự kiến hoàn thành dự án
                  </div>
                  <div className="font-medium text-primary-c900">
                    {bidder ? bidder?.estimatedDay : auction?.maxDays} ngày
                  </div>
                </div>
              </ListItem>
            ) : null}

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
                      ) >
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

            {auction?.status === AuctionStatus.PROGRESS && bidder ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số ngày còn lại
                  </div>
                  <div className="font-medium text-primary-c900">
                    {calculateDaysAfterAccepted(
                      bidder?.estimatedDay,
                      bidder?.acceptedAt,
                    )}{" "}
                    ngày
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.status === AuctionStatus.PROGRESS ||
            auction?.status === AuctionStatus.DELIVERY ||
            auction?.status === AuctionStatus.COMPLETED ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Tiến độ công việc
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.progresses &&
                      findMaxPercentage(auction?.progresses)}
                    %
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.status === AuctionStatus.AUCTIONING ? (
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
            ) : null}

            {auction?.status === AuctionStatus.AUCTIONING ? (
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
            ) : null}
            {auction?.status === AuctionStatus.AUCTIONING ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Giá đặt thấp nhất/ cao nhất
                  </div>
                  <div className="font-medium text-primary-c900">
                    {`${formatCurrency(minMax[0])} / ${formatCurrency(
                      minMax[1],
                    )}`}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.owner?.id === +storage.getLocalUserId() &&
            auction?.status !== AuctionStatus.CANCELED &&
            auction?.isPaymentFull === false ? (
              <ListItem className="border-b-[2px] border-grey-c50">
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Tiền đã cọc</div>
                  <div className="font-medium text-primary-c900">
                    {formatCurrency(auction?.deposit)}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.owner?.id === +storage.getLocalUserId() &&
            auction?.status !== AuctionStatus.CANCELED &&
            auction?.isPaymentFull === false ? (
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

            {(auction?.status === AuctionStatus.PROGRESS ||
              auction?.status === AuctionStatus.DELIVERY ||
              auction?.status === AuctionStatus.COMPLETED ||
              (!auction?.status && auction?.isPaymentFull)) &&
            auction?.owner?.id === +storage.getLocalUserId() ? (
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

            {(auction?.status === AuctionStatus.PROGRESS ||
              auction?.status === AuctionStatus.DELIVERY ||
              auction?.status === AuctionStatus.COMPLETED ||
              (!auction?.status && auction?.isPaymentFull)) &&
            auction?.owner?.id === +storage.getLocalUserId() ? (
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
    </div>
  );
};

export default DetailAuction;
