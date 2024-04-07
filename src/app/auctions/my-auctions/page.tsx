import DefaultLayout from "@/components/Layouts/DefaultLayout";
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
