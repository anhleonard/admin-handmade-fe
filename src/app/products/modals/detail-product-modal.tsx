import GiftCollapse from "@/components/gifts/gift-collapse";
import Button from "@/libs/button";
import MyDatePicker from "@/libs/date-picker";
import MyDefaultText from "@/libs/default-text";
import MyDisabledMultipleChoices from "@/libs/disabled-multiple-choices";
import MyDisplayImage from "@/libs/display-image";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MySelect from "@/libs/select";
import MySingleCheckBox from "@/libs/single-checkbox";
import Image from "next/image";
import { useState } from "react";

const all_options = [
  { value: "ITEM_1", label: "Item 1" },
  { value: "ITEM_2", label: "Item 2" },
];

type DetailProductModalProps = {
  type?: "ALL_ITEMS" | "PENDING_ITEMS" | "VIOLATE_ITEMS";
};

const DetailProductModal = ({
  type = "ALL_ITEMS",
}: DetailProductModalProps) => {
  const [hasMultipleChoices, setHasMultipleChoices] = useState(true);

  return (
    <div className="py-2">
      <div className="relative mb-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-6">
              <div className="flex flex-row items-center gap-2">
                <div>Là hàng hóa nặng?</div>
                <MySingleCheckBox isChecked disabled size={20} />
              </div>
              <div className="flex flex-row items-center gap-2">
                <div>Có nhiều lựa chọn?</div>
                <MySingleCheckBox
                  size={20}
                  isChecked={hasMultipleChoices}
                  disabled
                />
              </div>
            </div>
            {type === "VIOLATE_ITEMS" && (
              <div className="text-sm5">
                Ngày phát hiện vi phạm:{" "}
                <span className="font-bold text-primary-c900">26/12/2024</span>
              </div>
            )}
            {type !== "VIOLATE_ITEMS" && (
              <div className="text-sm5">
                Tồn kho:{" "}
                <span className="font-bold text-primary-c900">122</span>
              </div>
            )}
          </div>
          <MyPrimaryTextField
            id="productName"
            title="Tên sản phẩm"
            defaultValue={
              "Nồi Chiên Không Dầu Điện Tử Lock&Lock EJF357BLK (5.2 Lít) - Hàng Chính Hãng"
            }
            isError={type === "VIOLATE_ITEMS"}
            helperText={"Vui lòng đặt tên sản phẩm khoa học và dễ hiểu."}
            disabled={type !== "VIOLATE_ITEMS"}
          />
          <div className="flex flex-row items-center gap-8">
            <MyPrimaryTextField
              id="productCode"
              title="Mã sản phẩm"
              defaultValue={"QT123456789"}
              className="w-1/2"
              isError={type === "VIOLATE_ITEMS"}
              disabled={type !== "VIOLATE_ITEMS"}
            />
            <MySelect
              id="productCategory"
              title="Danh mục"
              options={all_options}
              selected={all_options[0].value}
              wrapClassName="!w-1/2"
              error={type === "VIOLATE_ITEMS"}
              disabled={type !== "VIOLATE_ITEMS"}
            />
          </div>
          <MyDefaultText
            title="Mô tả sản phẩm"
            type={type === "VIOLATE_ITEMS" ? "error" : "disabled"}
          >
            Nồi Chiên Không Dầu Điện Tử Lock&Lock EJF357BLK có kết cấu gọn gàng,
            thiết kế chắc chắn, màu đen lịch lãm bao phủ mọi mặt của nồi chiên
            không dầu, kết hợp hoàn hảo với mọi không gian nội thất.
          </MyDefaultText>
          <MyPrimaryTextField
            id="productMaterial"
            title="Chất liệu"
            defaultValue={"Len, Sắt"}
            isError={type === "VIOLATE_ITEMS"}
            disabled={type !== "VIOLATE_ITEMS"}
          />
          <MyPrimaryTextField
            id="productMainColor"
            title="Màu sắc chủ đạo"
            defaultValue={"Than tím"}
            isError={type === "VIOLATE_ITEMS"}
            disabled={type !== "VIOLATE_ITEMS"}
          />
          <MyDefaultText
            title="Công dụng"
            type={type === "VIOLATE_ITEMS" ? "error" : "disabled"}
          >
            Nồi Chiên Không Dầu Điện Tử Lock&Lock EJF357BLK có kết cấu gọn gàng,
            thiết kế chắc chắn, màu đen lịch lãm bao phủ mọi mặt của nồi chiên
            không dầu, kết hợp hoàn hảo với mọi không gian nội thất.
          </MyDefaultText>
          <div className="flex flex-row items-center gap-8">
            <MyDatePicker
              label="Ngày sản xuất"
              defaultDate={"2024-04-30"}
              className="w-1/2"
              isError={type === "VIOLATE_ITEMS"}
              disabled={type !== "VIOLATE_ITEMS"}
            />
            <MyDatePicker
              label="Hạn sử dụng"
              defaultDate={"2024/05/01"}
              className="w-1/2"
              isError={type === "VIOLATE_ITEMS"}
              disabled={type !== "VIOLATE_ITEMS"}
            />
          </div>
          <div className="flex flex-row items-center gap-8">
            <MyPrimaryTextField
              id="productMax"
              title="Số lượng mua tối đa"
              defaultValue={"2"}
              isError={type === "VIOLATE_ITEMS"}
              disabled={type !== "VIOLATE_ITEMS"}
            />
            {!hasMultipleChoices && (
              <MyPrimaryTextField
                id="productInventory"
                title="Tồn kho"
                defaultValue={"76"}
                disabled={type !== "VIOLATE_ITEMS"}
              />
            )}
          </div>

          {!hasMultipleChoices && (
            <div className="flex flex-row items-center gap-3">
              <MyDisplayImage
                src="https://salt.tikicdn.com/cache/750x750/ts/product/f6/1a/e5/a74a03ec03cce80bfceb6be69af2820d.jpg.webp"
                alt=""
              />
              <MyDisplayImage
                src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                alt=""
              />
              <MyDisplayImage
                src="https://salt.tikicdn.com/cache/750x750/ts/product/f6/1a/e5/a74a03ec03cce80bfceb6be69af2820d.jpg.webp"
                alt=""
              />
            </div>
          )}

          {hasMultipleChoices && (
            <MyDisabledMultipleChoices
              isError={type === "VIOLATE_ITEMS"}
              helperText="Vui lòng điều chỉnh giá của bạn"
            />
          )}
          {type !== "PENDING_ITEMS" && type !== "VIOLATE_ITEMS" && (
            <GiftCollapse />
          )}
          {type === "VIOLATE_ITEMS" && (
            <MyDefaultText title="Gợi ý chỉnh sửa" type="success">
              Máy sấy tóc có 3 chế độ sấy đáp ứng được nhu cầu khác nhau của
              người dùng. Sấy mát dùng cho những ngày nóng bức, giảm thiểu sự hư
              tổn cho tóc. Sấy nhanh tăng nhiệt độ và cường độ không khí, giảm
              thời gian sấy tóc cho bạn. Sấy chăm tóc tóc cung cấp nhiệt độ tối
              ưu để vừa làm khô tóc nhanh, đồng thời tăng cường bảo vệ tóc.
            </MyDefaultText>
          )}
        </div>
        {type === "VIOLATE_ITEMS" && (
          <div className="absolute inset-0 z-10 cursor-default bg-transparent"></div>
        )}
      </div>
    </div>
  );
};

export default DetailProductModal;
