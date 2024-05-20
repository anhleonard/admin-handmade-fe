import DefaultLayout from "@/components/layouts/default-layout";
import MyAuctionsScreen from "@/screens/auctions/seller-list-auctions";
import React from "react";

const MyListAuctions = () => {
  return (
    <DefaultLayout>
      <MyAuctionsScreen />
    </DefaultLayout>
  );
};

export default MyListAuctions;
