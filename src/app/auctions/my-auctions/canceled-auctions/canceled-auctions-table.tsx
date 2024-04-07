import SellerAunctionCard from "@/components/auctions/seller-auctions/seller-auctions-card";
import React from "react";

const CanceledAuctionsTab = () => {
  return (
    <div>
      <SellerAunctionCard status="canceled" />
    </div>
  );
};

export default CanceledAuctionsTab;
