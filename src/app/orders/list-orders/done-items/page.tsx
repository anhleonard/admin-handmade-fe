import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const DoneItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>Done items</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default DoneItemsTab;
