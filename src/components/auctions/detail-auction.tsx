import {
  calculateAverageBidderMoney,
  calculateRemainingDays,
  findMinMaxBidderMoney,
  formatCurrency,
} from "@/enum/functions";
import MyLabel from "@/libs/label";
import { Collapse, List, ListItem } from "@mui/material";
import React from "react";
import MyDisplayImage from "@/libs/display-image";
import Button from "@/libs/button";
import { Auction } from "@/enum/defined-type";
import { AuctionStatus } from "@/enum/constants";

type Props = {
  type?: "client" | "seller";
  status: AuctionStatus;
  auction: Auction;
};

const DetailAuction = ({ type = "client", status, auction }: Props) => {
  const minMax = findMinMaxBidderMoney(auction?.candidates);
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
                <MyLabel type="success">Đạt tiến độ: 100%</MyLabel>
              )}
            </div>
            {type === "seller" ? (
              <>
                {status === AuctionStatus.PROGRESS && (
                  <MyLabel type="progress">Đang làm</MyLabel>
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
                    {formatCurrency(150000)}
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
                      calculateAverageBidderMoney(auction?.candidates),
                    )}
                  </div>
                </div>
              )}
              {type === "seller" && (
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Làm trong vòng</div>
                  <div className="text-grey-c900">12 ngày</div>
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
                    <div className="text-grey-c900">0 ngày</div>
                  </div>
                )}
              </ListItem>
            )}
          </List>
        </Collapse>
      </div>
      {type === "seller" && status === AuctionStatus.PROGRESS && (
        <div className="mt-4 flex flex-row justify-end gap-3">
          <Button className="!w-fit !px-3 !py-1.5" color="grey">
            <span className="text-xs font-medium">Hủy dự án</span>
          </Button>
          <Button className="!w-fit !px-3 !py-1.5" color="primary">
            <span className="text-xs font-medium">Dự án đã xong?</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default DetailAuction;
