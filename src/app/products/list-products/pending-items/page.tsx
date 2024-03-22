import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const PendingItemsTab = () => {
  return (
    <DefaultLayout>
      <ListProductsScreen>
        <div>Pending items tab</div>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default PendingItemsTab;
