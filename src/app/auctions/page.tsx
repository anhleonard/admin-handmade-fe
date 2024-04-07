"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ListAuctionsScreen from "@/screens/auctions/list-auctions-screen";

const MainListAuctions = () => {
  return (
    <DefaultLayout>
      <ListAuctionsScreen />
    </DefaultLayout>
  );
};

export default MainListAuctions;
