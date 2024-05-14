"use client";
import MyDatePicker from "@/libs/date-picker";
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import MyTextArea from "@/libs/text-area";
import UploadImage from "@/libs/upload-image";
import Button from "@/libs/button";
import { useState } from "react";
import { yesNoOptions } from "@/enum/constants";
import ClassifiedTable from "@/components/products/classified-table";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import MyPrimaryTextField from "@/libs/primary-text-field";

const EditViolateProductModal = () => {
  const [isClassified, setIsClassified] = useState(false);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <MyPrimaryTextField
          id="nameItem"
          title="Tên sản phẩm"
          defaultValue={"Máy sấy tóc Philips BHC010/10 - Hàng Chính Hãng"}
          isError
          helperText={"Vui lòng nhập tên theo quy định."}
          isRequired
        />
        <div className="flex flex-row items-center justify-between gap-8">
          <MyPrimaryTextField
            id="codeItem"
            title="Mã sản phẩm"
            className="w-1/2"
            defaultValue={"QT123456789"}
            isRequired
          />
          <MySelect
            title="Danh mục"
            placeholder="Chọn danh mục cho sản phẩm"
            wrapClassName="w-1/2"
            options={yesNoOptions}
            selected={yesNoOptions[0].value}
            isRequired
          />
        </div>
        <MyTextArea
          id="descItem"
          title="Mô tả sản phẩm"
          defaultValue={"xin chao"}
          isRequired
          isError
        />
        <MyPrimaryTextField
          id="materialItem"
          title="Chất liệu"
          isError
          defaultValue={"Len; Kẽm Nhung"}
        />
        <MyPrimaryTextField
          id="colorItem"
          title="Màu sắc chủ đạo"
          isError
          defaultValue={"Hồng bạch"}
        />
        <MyPrimaryTextField
          id="useItem"
          title="Công dụng"
          isError
          defaultValue={"Quà tặng"}
        />
        <div className="flex flex-row items-center gap-8">
          <MyDatePicker
            label="Ngày sản xuất"
            placeholder="-- Lựa chọn NSX --"
            isRequired
          />
          <MyDatePicker
            label="Ngày sản xuất"
            placeholder="-- Lựa chọn HSD --"
            isRequired
          />
        </div>
        <div className="my-1 flex flex-row gap-8">
          <MyRadioButtonsGroup
            label="Có phải hàng hóa nặng không?"
            isRequired
            options={yesNoOptions}
            defaultValue={yesNoOptions[1].value}
          />
          <MyRadioButtonsGroup
            label="Có nhiều phân loại không?"
            isRequired
            options={yesNoOptions}
            defaultValue={yesNoOptions[1].value}
            onChanged={(value) => {
              if (value === yesNoOptions[0].value) {
                setIsClassified(true);
              } else {
                setIsClassified(false);
              }
            }}
          />
        </div>
        {!isClassified && (
          <div>
            <div>
              <div className="mb-2 block text-sm font-medium text-grey-c600 dark:text-white">
                Thêm hình ảnh mô tả
              </div>
              <UploadImage />
            </div>
            <div className="flex flex-row items-center justify-between gap-8">
              <MyTextField
                id="moneyItem"
                title="Số tiền"
                placeholder="Số tiền bán của 1 sản phẩm"
                type="number"
                minNumber={1}
                className="w-1/2"
              />
              <MyTextField
                id="stockNumber"
                title="Số lượng tồn kho"
                placeholder="Số lượng tồn của sản phẩm"
                type="number"
                minNumber={1}
                className="w-1/2"
              />
            </div>
          </div>
        )}
        {isClassified && <ClassifiedTable />}
        <div className="mt-3 flex flex-row items-center justify-between gap-8">
          <Button
            color="black"
            className="h-12 !w-1/2 text-xs md:text-sm lg:text-base"
          >
            Gửi kiểm duyệt và tắt
          </Button>
          <Button
            color="primary"
            className="h-12 !w-1/2 text-xs md:text-sm lg:text-base"
          >
            Gửi kiểm duyệt và bật bán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditViolateProductModal;
