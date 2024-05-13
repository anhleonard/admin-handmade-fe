import { headerUrl } from "@/apis/services/authentication";
import { singleProduct } from "@/apis/services/product";
import GiftCollapse from "@/components/gifts/gift-collapse";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Category, Product } from "@/enum/defined-type";
import { formatCurrency } from "@/enum/functions";
import Button from "@/libs/button";
import MyDatePicker from "@/libs/date-picker";
import MyDefaultText from "@/libs/default-text";
import MyDisabledMultipleChoices from "@/libs/disabled-multiple-choices";
import MyDisplayImage from "@/libs/display-image";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MySelect from "@/libs/select";
import MySingleCheckBox from "@/libs/single-checkbox";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const all_options = [
  { value: "ITEM_1", label: "Item 1" },
  { value: "ITEM_2", label: "Item 2" },
];

type Props = {
  productId: number;
  type?: "ALL_ITEMS" | "PENDING_ITEMS" | "VIOLATE_ITEMS" | "SELLING_ITEMS";
};

const DetailProductModal = ({ productId, type = "ALL_ITEMS" }: Props) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product>();

  const getSingleProduct = async () => {
    try {
      dispatch(openLoading());
      const res = await singleProduct(productId);
      setProduct(res);
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <div className="py-2">
      <div className="relative mb-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-6">
              <div className="flex flex-row items-center gap-2">
                <div>Là hàng hóa nặng?</div>
                <MySingleCheckBox
                  isChecked={product?.isHeavyGood}
                  disabled
                  size={20}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <div>Có nhiều lựa chọn?</div>
                <MySingleCheckBox
                  size={20}
                  isChecked={product?.isMultipleClasses}
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
                <span className="font-bold text-primary-c900">
                  {product?.inventoryNumber}
                </span>
              </div>
            )}
          </div>
          <MyPrimaryTextField
            id="productName"
            title="Tên sản phẩm"
            defaultValue={product?.productName}
            helperText={"Vui lòng đặt tên sản phẩm khoa học và dễ hiểu."}
            isError={type === "VIOLATE_ITEMS"}
            disabled={type !== "VIOLATE_ITEMS"}
          />
          <MyPrimaryTextField
            id="productCode"
            title="Mã sản phẩm"
            defaultValue={product?.productCode}
            isError={type === "VIOLATE_ITEMS"}
            disabled={type !== "VIOLATE_ITEMS"}
          />
          <div>
            <div className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
              Danh mục
            </div>
            <div className="flex flex-row items-center gap-3">
              {product?.category.map((cate: Category, index: number) => {
                return <Chip label={cate.title} color="warning"></Chip>;
              })}
            </div>
          </div>
          <MyDefaultText
            title="Mô tả sản phẩm"
            type={type === "VIOLATE_ITEMS" ? "error" : "disabled"}
          >
            {product?.description}
          </MyDefaultText>
          <MyPrimaryTextField
            id="productMaterial"
            title="Chất liệu"
            defaultValue={product?.materials}
            isError={type === "VIOLATE_ITEMS"}
            disabled={type !== "VIOLATE_ITEMS"}
          />
          <MyPrimaryTextField
            id="productMainColor"
            title="Màu sắc chủ đạo"
            defaultValue={product?.mainColors}
            isError={type === "VIOLATE_ITEMS"}
            disabled={type !== "VIOLATE_ITEMS"}
          />
          <MyDefaultText
            title="Công dụng"
            type={type === "VIOLATE_ITEMS" ? "error" : "disabled"}
          >
            {product?.uses}
          </MyDefaultText>
          {product?.productionDate && product?.expirationDate && (
            <div className="flex flex-row items-center gap-8">
              <MyDatePicker
                id=""
                label="Ngày sản xuất"
                defaultDate={"2024-04-30"}
                className="w-1/2"
                isError={type === "VIOLATE_ITEMS"}
                disabled={type !== "VIOLATE_ITEMS"}
              />
              <MyDatePicker
                id=""
                label="Hạn sử dụng"
                defaultDate={"2024/05/01"}
                className="w-1/2"
                isError={type === "VIOLATE_ITEMS"}
                disabled={type !== "VIOLATE_ITEMS"}
              />
            </div>
          )}
          {product?.price && (
            <MyPrimaryTextField
              id="productPrice"
              title={
                product?.isMultipleClasses ? "Giá bán thấp nhất" : "Giá bán"
              }
              defaultValue={formatCurrency(product.price)}
              isError={type === "VIOLATE_ITEMS"}
              disabled={type !== "VIOLATE_ITEMS"}
            />
          )}

          {!product?.isMultipleClasses && (
            <div className="flex flex-row items-center gap-3">
              {product?.images.map((path: string, index: number) => {
                return (
                  <MyDisplayImage
                    key={index}
                    src={`${headerUrl}/products/${path}`}
                    alt="product-image"
                  />
                );
              })}
            </div>
          )}

          {product?.isMultipleClasses && product?.variants && (
            <MyDisabledMultipleChoices
              variants={product?.variants}
              isError={type === "VIOLATE_ITEMS"}
              helperText="Vui lòng điều chỉnh giá của bạn"
            />
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
