"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ListProductsScreen from "@/app/screens/products/list-products-screen";

const MainListProducts = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen />
    </DefaultLayout>
  );
};

export default MainListProducts;
