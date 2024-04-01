"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ListOrdersScreen from "@/screens/orders/list-orders-screen";

const MainListOrders = () => {
  return (
    <DefaultLayout>
      <ListOrdersScreen />
    </DefaultLayout>
  );
};

export default MainListOrders;
