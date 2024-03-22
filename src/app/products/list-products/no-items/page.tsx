import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const NoItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>No items tab</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default NoItemsTab;
