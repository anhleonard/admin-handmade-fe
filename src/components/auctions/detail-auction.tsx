import { formatCurrency } from "@/enum/functions";
import MyLabel from "@/libs/label";
import { Collapse, List, ListItem } from "@mui/material";
import React from "react";
import MyDisplayImage from "@/libs/display-image";
import Button from "@/libs/button";

type DetailAuctionProps = {
  type?: "client" | "seller";
  status: string;
};

const DetailAuction = ({ type = "client", status }: DetailAuctionProps) => {
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
                Finish Json Web Token
              </div>
              {status === "progress" && (
                <MyLabel type="warning">Còn 6 ngày</MyLabel>
              )}
              {type === "seller" && status !== "canceled" && (
                <MyLabel type="success">Đạt tiến độ: 100%</MyLabel>
              )}
            </div>
            {type === "seller" ? (
              <>
                {status === "progress" && (
                  <MyLabel type="progress">Đang làm</MyLabel>
                )}
                {status === "finished" && (
                  <MyLabel type="success">Đã hoàn thành</MyLabel>
                )}
                {status === "canceled" && (
                  <MyLabel type="error">Đã hủy</MyLabel>
                )}
              </>
            ) : (
              <MyLabel type="success">Max: {formatCurrency(100000)}</MyLabel>
            )}
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
                  Marshfield was a rapid transit station on the Chicago "L" in
                  the U.S. between 1895 and 1954. Originally part of the
                  Metropolitan West Side Elevated Railroad, it was the
                  westernmost station of the Metropolitan's main line. West of
                  the station, the main line diverged into three branches; this
                  junction, served by the station, has been described as the
                  most complex on the entire Chicago "L" system. After 1905, the
                  Chicago Aurora and Elgin Railroad, an interurban line, also
                  served the station, but limited its service based on direction
                  to avoid competing with the "L". The lines that had been
                  constructed by the Metropolitan, including those serving
                  Marshfield, were subject to modifications planned since the
                  1930s that incrementally withdrew service from the station.
                </div>
              </div>
            </ListItem>
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
            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-grey-c900">
                  Lĩnh vực liên quan
                </div>
                <div className="flex flex-row items-center gap-3 font-medium text-primary-c900">
                  <div className="hover:cursor-pointer">Đan len</div>
                  <div className="hover:cursor-pointer">Thú nhồi bông</div>
                  <div className="hover:cursor-pointer">Quà tặng</div>
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
                  <div className="text-grey-c900">12</div>
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
                    {formatCurrency(60000)}
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
            {status !== "canceled" && (
              <ListItem className="block w-full px-4 py-4" disablePadding>
                {type === "client" && (
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-grey-c900">
                      Giá đặt thấp nhất/ cao nhất
                    </div>
                    <div className="font-medium text-primary-c900">
                      {`${formatCurrency(60000)} / ${formatCurrency(200000)}`}
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
      {type === "seller" && status === "progress" && (
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
