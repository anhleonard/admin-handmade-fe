import { List, ListItem } from "@mui/material";
import React from "react";
import DetailStoreItem from "./detail-store-item";

type Props = {
  storeId: number;
};

const DetailStore = ({ storeId }: Props) => {
  return (
    <div className="py-4">
      <div className="text-sm">
        <div className="font-bold text-grey-c900">1. Thông tin cơ bản</div>
        <List
          disablePadding
          className="flex flex-col rounded-2xl border-[2px] border-grey-c50 text-sm"
        >
          <DetailStoreItem title="Ten cua hang" desc="Tiem len gio" />
        </List>
      </div>
    </div>
  );
};

export default DetailStore;
