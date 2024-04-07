import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { COLORS } from "@/enum/colors";
import DetailAuction from "@/components/auctions/detail-auction";
import { useRouter } from "next/navigation";
import SellerAuctionInformation from "@/components/auctions/seller-auction-information";
import ListSellerPrice from "./list-seller-price";

const DetailAuctionsScreen = () => {
  const router = useRouter();
  return (
    <div className="w-full rounded-lg bg-white px-4 py-3">
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex flex-row items-center gap-3">
          <div onClick={() => router.back()}>
            <ArrowBackRoundedIcon
              sx={{ fontSize: 20, color: COLORS.grey.c900 }}
              className="hover:cursor-pointer"
            />
          </div>
          <div className="text-lg font-bold text-grey-c900">
            Thông tin đơn đấu giá{" "}
            <span className="text-primary-c900">#FF3852</span>
          </div>
        </div>
        <div className="grid gap-[50px] md:grid-cols-5 md:gap-[30px]">
          <div className="flex flex-col gap-9 md:col-span-4">
            <DetailAuction />
            <SellerAuctionInformation />
            <ListSellerPrice />
          </div>
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="font-bold text-grey-c900">Các dự án khác</div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-grey-c900 hover:cursor-pointer hover:underline">
                Large-scale Oracle to MySQL Conversion
              </div>
              <div className="text-sm">$100 - $200</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-grey-c900 hover:cursor-pointer hover:underline">
                Large-scale Oracle to MySQL Conversion
              </div>
              <div className="text-sm">$100 - $200</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAuctionsScreen;
