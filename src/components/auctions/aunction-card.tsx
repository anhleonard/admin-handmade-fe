import { Collapse, List, ListItem } from "@mui/material";
import React from "react";
import MyLabel from "@/libs/label";
import { formatCurrency } from "@/enum/functions";
import Button from "@/libs/button";
import { useRouter } from "next/navigation";

const AunctionCard = () => {
  const router = useRouter();
  return (
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
            <MyLabel type="warning">Còn 6 ngày</MyLabel>
          </div>
          <MyLabel type="success">Max: {formatCurrency(100000)}</MyLabel>
        </div>
      </ListItem>
      <Collapse in>
        <List disablePadding className="flex flex-col gap-4 px-4 py-4">
          {/* item 1 */}
          <ListItem className="block w-full" disablePadding>
            <div className="grid grid-cols-3 gap-9 md:grid-cols-4 lg:grid-cols-5">
              {/* left content */}
              <div className="col-span-2 flex flex-col gap-1 md:col-span-3 lg:col-span-4">
                <div className="text-base font-bold text-grey-c900">
                  Mô tả chi tiết
                </div>
                <div className="line-clamp-4 text-justify text-sm font-normal text-grey-c900">
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
                <div className="flex flex-row items-center gap-3 text-sm font-medium text-primary-c900">
                  <div className="hover:cursor-pointer">Đan len</div>
                  <div className="hover:cursor-pointer">Thú nhồi bông</div>
                  <div className="hover:cursor-pointer">Quà tặng</div>
                </div>
              </div>
              {/* right content */}
              <div className="col-span-1 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-bold text-grey-c900">
                    Giá đặt trung bình:
                  </div>
                  <div className="text-xs font-bold text-primary-c900">
                    {formatCurrency(60000)}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-bold text-grey-c900">
                    Số người đã đặt giá:
                  </div>
                  <div className="text-xs font-bold text-primary-c900">12</div>
                </div>
                <Button
                  className="!w-fit !px-3 !py-1.5"
                  onClick={() => router.push("/auctions/abcabc")}
                >
                  <span className="text-xs font-medium">Đặt giá ngay</span>
                </Button>
              </div>
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default AunctionCard;
