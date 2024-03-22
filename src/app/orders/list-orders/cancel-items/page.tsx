import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CancelItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>Cancel items tab</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default CancelItemsTab;
