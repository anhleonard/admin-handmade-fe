import { singleProduct } from "@/apis/services/product";
import ClassifiedTable from "@/components/products/classified-table";
import { AlertStatus, ProductStatus } from "@/enum/constants";
import { AlertState, Product } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyPrimaryTextField from "@/libs/primary-text-field";
import SwitchButton from "@/libs/switch-button";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Form, Formik, getIn } from "formik";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";

const validationSchema = yup.object({
  productName: yup.string().required("Vui lòng không để trống trường này."),
  price: yup.number().when("isMultipleClasses", ([isMultipleClasses], sch) => {
    return isMultipleClasses === false
      ? sch
          .min(1, "Số lượng phải lớn hơn 0")
          .required("Vui lòng không để trống trường này.")
      : sch.notRequired();
  }),
  inventoryNumber: yup
    .number()
    .when("isMultipleClasses", ([isMultipleClasses], sch) => {
      return isMultipleClasses === false
        ? sch
            .min(1, "Số lượng phải lớn hơn 0")
            .required("Vui lòng không để trống trường này.")
        : sch.notRequired();
    }),
});

type Props = {
  productId: number;
};

const EditProductModal = ({ productId }: Props) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const [product, setProduct] = useState<Product>();

  const initialValues = useMemo(() => {
    return {
      productName: product?.productName ?? "",
      price: product?.price ?? 0,
      inventoryNumber: product?.inventoryNumber ?? 0,
    };
  }, [product]);

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

  const onSubmit = async () => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
              <MyPrimaryTextField
                id="productName"
                name="productName"
                title="Tên sản phẩm"
                className="w-full md:!w-[88%]"
                onChange={formik.handleChange}
                value={formik.values.productName}
                isError={
                  getIn(formik.touched, "productName") &&
                  Boolean(getIn(formik.errors, "productName"))
                }
                helperText={
                  getIn(formik.touched, "productName") &&
                  getIn(formik.errors, "productName")
                }
              />

              <SwitchButton
                checked={isChecked}
                title="Bật/ Tắt"
                handleClickSwitchButton={() => {
                  setIsChecked(!isChecked);
                }}
              />
            </div>
            {product?.isMultipleClasses ? (
              <ClassifiedTable />
            ) : (
              <div className="mb-4 flex flex-row items-center justify-between gap-8">
                <MyTextField
                  id="inventoryNumber"
                  name="inventoryNumber"
                  type="number"
                  title="Tồn kho"
                  placeholder="Nhập số lượng tồn kho"
                  className="w-1/2"
                  isRequired={false}
                  onChange={formik.handleChange}
                  value={formik.values.inventoryNumber}
                  isError={
                    getIn(formik.touched, "inventoryNumber") &&
                    Boolean(getIn(formik.errors, "inventoryNumber"))
                  }
                  helperText={
                    getIn(formik.touched, "inventoryNumber") &&
                    getIn(formik.errors, "inventoryNumber")
                  }
                />
                <MyTextField
                  id="price"
                  name="price"
                  title="Giá bán"
                  placeholder="Nhập giá bán 1 sản phẩm"
                  defaultValue={240000}
                  className="w-1/2"
                  hasInputNumber
                  isRequired={false}
                  endIcon={
                    <FormatEndCurrencyIcon value={formik.values.price} />
                  }
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  isError={
                    getIn(formik.touched, "price") &&
                    Boolean(getIn(formik.errors, "price"))
                  }
                  helperText={
                    getIn(formik.touched, "price") &&
                    getIn(formik.errors, "price")
                  }
                />
              </div>
            )}
            <div className="mx-auto w-fit py-3">
              <Button className="!w-[200px]" type="submit">
                Cập nhật
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditProductModal;
