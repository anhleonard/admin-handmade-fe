import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SellingItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>selling items tab</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default SellingItemsTab;
