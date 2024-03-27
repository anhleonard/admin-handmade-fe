"use client";
import ListOrdersScreen from "@/app/screens/orders/list-orders-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ReactNode } from "react";

const MainListOrders = () => {
  return (
    <DefaultLayout>
      <ListOrdersScreen />
    </DefaultLayout>
  );
};

export default MainListOrders;
