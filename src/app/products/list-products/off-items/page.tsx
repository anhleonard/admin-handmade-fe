import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const OffItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>Off items tab</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default OffItemsTab;
