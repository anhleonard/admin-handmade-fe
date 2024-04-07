import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MyDetailSellerAuctionScreen from "@/screens/auctions/detail-seller-auction";
import React from "react";

const MyListAuctions = () => {
  return (
    <DefaultLayout>
      <MyDetailSellerAuctionScreen />
    </DefaultLayout>
  );
};

export default MyListAuctions;
