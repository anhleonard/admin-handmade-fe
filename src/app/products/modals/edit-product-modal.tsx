import ClassifiedTable from "@/components/products/classified-table";
import Button from "@/libs/button";
import SwitchButton from "@/libs/switch-button";
import MyTextField from "@/libs/text-field";
import { useState } from "react";

const EditProductModal = () => {
  const [hasMuiltipleClass, setHasMultipleClass] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
        <MyTextField
          id="nameItem"
          title="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
          defaultValue={"Nồi Chiên Không Dầu Điện Tử Lock&Lock"}
          className="w-full md:!w-[88%]"
        />

        <SwitchButton
          checked={true}
          title="Bật/ Tắt"
          handleClickSwitchButton={() => {}}
        />
      </div>
      {hasMuiltipleClass ? (
        <ClassifiedTable />
      ) : (
        <div className="mb-4 flex flex-row items-center justify-between gap-8">
          <MyTextField
            id="inventoryItem"
            title="Tồn kho"
            placeholder="Nhập số lượng tồn kho"
            defaultValue={1234}
            className="w-1/2"
          />
          <MyTextField
            id="priceItem"
            title="Giá bán"
            placeholder="Nhập giá bán 1 sản phẩm"
            defaultValue={240000}
            className="w-1/2"
          />
        </div>
      )}
      <div className="mx-auto w-fit py-3">
        <Button className="!w-[200px]" disabled>
          Cập nhật
        </Button>
      </div>
    </div>
  );
};

export default EditProductModal;
