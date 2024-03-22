import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ProcessingItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>Processing items</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default ProcessingItemsTab;
