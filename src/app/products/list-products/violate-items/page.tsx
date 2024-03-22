import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ViolateItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>Violate items tab</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default ViolateItemsTab;
