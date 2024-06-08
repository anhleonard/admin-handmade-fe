import { headerUrl } from "@/apis/services/authentication";
import { User } from "@/enum/defined-type";
import { List, ListItem } from "@mui/material";
import React from "react";
import DetailUserItem from "./detail-store-item";
import { Role } from "@/enum/constants";
import moment from "moment";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import { formatShippingAddress } from "@/enum/functions";

type Props = {
  user: User;
};

const DetailUser = ({ user }: Props) => {
  return (
    <div className="space-y-8 py-4">
      {user?.role === Role.SELLER ? (
        <div className=" flex flex-col gap-3 text-sm">
          <div className="flex flex-row items-center gap-1">
            <TurnedInNotOutlinedIcon style={{ width: 18, height: 18 }} />
            <div className="font-bold text-grey-c900">Giấy tờ của chủ shop</div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <img
              src={`${headerUrl}/products/${user?.frontCard}`}
              alt="product-image"
              className="h-60 w-full rounded-lg object-contain"
            />
            <img
              src={`${headerUrl}/products/${user?.backCard}`}
              alt="product-image"
              className="h-60 w-full rounded-lg object-contain"
            />
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-row items-center gap-1">
          <TurnedInNotOutlinedIcon style={{ width: 18, height: 18 }} />
          <div className="font-bold text-grey-c900">Thông tin cơ bản</div>
        </div>
        <List
          disablePadding
          className="flex flex-col rounded-2xl border-[2px] border-grey-c50 text-sm"
        >
          <DetailUserItem
            title={
              user?.role === Role.SELLER ? "Tên chủ shop" : "Tên khách hàng"
            }
            desc={user?.name}
          />

          {user?.role === Role.SELLER ? (
            <DetailUserItem title="Tên cửa hàng" desc={user?.store?.name} />
          ) : null}

          {user?.role === Role.USER ? (
            <DetailUserItem
              title="Ngày sinh"
              desc={moment(user?.dateOfBirth).utc().format("DD-MM-YYYY")}
            />
          ) : null}

          <DetailUserItem title="Số điện thoại" desc={user?.phoneNumber} />

          <DetailUserItem
            title="Email"
            desc={user?.email}
            hasBorder={user?.role === Role.SELLER ? true : false}
          />

          {user?.role === Role.SELLER ? (
            <DetailUserItem
              title="Địa chỉ cửa hàng"
              desc={user?.store?.address}
              hasBorder={false}
            />
          ) : null}
        </List>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-row items-center gap-1">
          <TurnedInNotOutlinedIcon style={{ width: 18, height: 18 }} />
          <div className="font-bold text-grey-c900">Địa chỉ giao hàng</div>
        </div>

        <List
          disablePadding
          className="flex flex-col gap-4 divide-y-[2px] divide-grey-c50 rounded-2xl border-[2px] border-grey-c50 px-4 py-4"
        >
          {user?.shippings?.length ? (
            user?.shippings?.map((shipping, index) => {
              return (
                <ListItem
                  key={index}
                  className={`flex w-full flex-col items-start gap-2 ${index === 0 ? "" : "pt-3"}`}
                  disablePadding
                >
                  <div className="text-base font-bold uppercase text-grey-c900">
                    {shipping?.name} - {shipping?.phone}
                  </div>
                  <div className="text-sm font-normal text-grey-c900">
                    {formatShippingAddress(shipping)}
                  </div>
                </ListItem>
              );
            })
          ) : (
            <div className="flex items-center justify-center font-medium text-grey-c900">
              Chưa có địa chỉ nào được thiết lập!
            </div>
          )}
        </List>
      </div>
    </div>
  );
};

export default DetailUser;
