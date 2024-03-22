import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TransportItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>Transport items</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default TransportItemsTab;
