import MyLabel from "@/libs/label";
import { ListItem } from "@mui/material";
import React from "react";

type Props = {
  title: string;
  desc: string | number;
  hasBorder?: boolean;
};

const DetailUserItem = ({ title, desc, hasBorder = true }: Props) => {
  return (
    <ListItem
      className={`block w-full ${hasBorder ? "border-b-[2px] border-grey-c50" : ""} px-4 py-2`}
      disablePadding
    >
      <div className="flex flex-col gap-1">
        <div className="font-bold text-grey-c900">{title}</div>
        <div className="text-justify font-medium text-primary-c900">
          {desc ? desc : <MyLabel type="error">Chưa có thông tin!</MyLabel>}
        </div>
      </div>
    </ListItem>
  );
};

export default DetailUserItem;
