"use client";
import { WarningIcon } from "@/enum/icons";
import MyDatePicker from "@/libs/date-picker";
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import MyTextArea from "@/libs/text-area";
import MyRadioGroup from "@/libs/radio-group";
import UploadImage from "@/libs/upload-image";
import Button from "@/libs/button";
import { useState } from "react";
import { yesNoOptions } from "@/enum/constants";
import ClassifiedTable from "@/components/products/classified-table";

const CreateProductScreen = () => {
  const [isClassified, setIsClassified] = useState(false);

  return (
    <div className="w-3/4 rounded-lg bg-white px-4 py-2">
      <div className="mb-5 flex flex-col gap-3">
        <div className="text-lg font-bold text-grey-c900">Tạo sản phẩm mới</div>
        <div className="item-start flex gap-1 md:items-center">
          <WarningIcon />
          <div className="text-xs font-normal">
            Vui lòng nhập chính xác các thông tin dưới đây để ban kiểm duyệt có
            thể thông qua sản phẩm, tránh các vấn đề vi phạm.
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <MyTextField
          id="nameItem"
          title="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
        />
        <div className="flex flex-row items-center justify-between gap-8">
          <MyTextField
            id="codeItem"
            title="Mã sản phẩm"
            placeholder="Nhập mã sản phẩm"
            className="w-1/2"
          />
          <MySelect
            title="Danh mục"
            placeholder="Chọn danh mục cho sản phẩm"
            isRequired
            wrapClassName="w-1/2"
            options={[
              { label: "USA", value: "USA" },
              { label: "Việt Nam", value: "VIET NAM" },
            ]}
          />
        </div>
        <MyTextArea
          id="descItem"
          title="Mô tả sản phẩm"
          placeholder="Nhập mô tả cho sản phẩm của bạn"
        />
        <MyTextField
          id="materialItem"
          title="Chất liệu"
          placeholder="Nhập các chất liệu tạo nên sản phẩm"
        />
        <MyTextField
          id="colorItem"
          title="Màu sắc chủ đạo"
          placeholder="Nhập màu sắc chủ đạo của sản phẩm"
        />
        <MyTextField
          id="useItem"
          title="Công dụng"
          placeholder="Nhập công dụng của sản phẩm"
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
          <MyRadioGroup
            className="w-1/3"
            label="Có phải hàng hóa nặng không?"
            isRequired
            options={[
              { label: "Có", value: "YES", index: 0 },
              { label: "Không", value: "NO", index: 1 },
            ]}
            selectedIndex={1}
          />
          <MyRadioGroup
            className="w-1/3"
            label="Giao nhanh trong 4h?"
            isRequired
            options={[
              { label: "Có", value: "YES", index: 0 },
              { label: "Không", value: "NO", index: 1 },
            ]}
            selectedIndex={1}
          />
          <MyRadioGroup
            className="w-1/3"
            label="Có nhiều phân loại không?"
            isRequired
            options={yesNoOptions}
            selectedIndex={yesNoOptions[1].index}
            onChanged={(item) => {
              if (item.value === "YES") setIsClassified(true);
              else if (item.value === "NO") setIsClassified(false);
            }}
          />
        </div>
        {!isClassified && (
          <div>
            <div className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
              Thêm hình ảnh mô tả
            </div>
            <UploadImage />
          </div>
        )}
        {isClassified && <ClassifiedTable />}
        <div className="flex flex-row items-center justify-between gap-8">
          <MyTextField
            id="moneyItem"
            title="Số tiền"
            placeholder="Số tiền bán của 1 sản phẩm"
            type="number"
            minNumber={1}
            className="w-1/3"
          />
          <MyTextField
            id="stockNumber"
            title="Số lượng tồn kho"
            placeholder="Số lượng tồn của sản phẩm"
            type="number"
            minNumber={1}
            className="w-1/3"
          />
          <MyTextField
            id="maxAmount"
            title="Số lượng mua tối đa"
            placeholder="Số lượng sản phẩm tối đa trong 1 lần mua"
            type="number"
            isRequired={false}
            minNumber={1}
            className="w-1/3"
          />
        </div>
        <div className="mt-3 flex flex-row items-center justify-between gap-8">
          <Button
            color="primary"
            className="h-12 w-1/3 text-xs md:text-sm lg:text-base"
          >
            Lưu nháp
          </Button>
          <Button
            color="primary"
            className="h-12 w-1/3 text-xs md:text-sm lg:text-base"
          >
            Kiểm duyệt và tắt
          </Button>
          <Button
            color="primary"
            className="h-12 w-1/3 text-xs md:text-sm lg:text-base"
          >
            Kiểm duyệt và bật bán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductScreen;
