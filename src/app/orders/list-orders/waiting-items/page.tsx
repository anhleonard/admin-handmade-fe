import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const WaitingItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>waiting items</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default WaitingItemsTab;
