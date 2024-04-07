import AunctionCard from "@/components/auctions/aunction-card";
import React from "react";

const ListAuctionsScreen = () => {
  return (
    <div className="w-full rounded-lg bg-white px-4 py-2">
      <div className="mb-5 flex flex-col gap-3">
        <div className="text-lg font-bold text-grey-c900">
          Thị trường đấu giá
        </div>
        <div>
          <AunctionCard />
        </div>
      </div>
    </div>
  );
};

export default ListAuctionsScreen;
