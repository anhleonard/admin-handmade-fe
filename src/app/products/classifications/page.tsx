"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CreateClassification from "@/components/products/create-classification";

const ClassificationPage = () => {
  return (
    <DefaultLayout>
      <div className="w-3/4 rounded-lg bg-white px-4 py-2">
        <div className="mb-5 flex flex-col gap-3">
          <div className="text-lg font-bold text-grey-c900">
            Tạo danh mục mới
          </div>
        </div>
        <CreateClassification />
      </div>
    </DefaultLayout>
  );
};

export default ClassificationPage;
