"use client";
import { WarningIcon } from "@/enum/icons";
import MyDatePicker from "@/libs/date-picker";
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import MyTextArea from "@/libs/text-area";
import MyRadioGroup from "@/libs/radio-group";
import UploadImage from "@/libs/upload-image";
import Button from "@/libs/button";
import { useEffect, useState } from "react";
import { AlertStatus, yesNoOptions } from "@/enum/constants";
import ClassifiedTable from "@/components/products/classified-table";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import CheckboxesGroup from "@/components/checkboxes/checkboxes";
import { UploadFile } from "antd";
import axios from "axios";
import * as yup from "yup";
import { Form, Formik, getIn } from "formik";
import CateGoriesPicker, { Label } from "./selected-categories";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { getCategories } from "@/apis/services/categories";
import { AlertState } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import { createProduct, uploadImages } from "@/apis/services/product";
import storage from "@/apis/storage";
import { useRouter } from "next/navigation";
import { getVariantCategoriesByUser } from "@/apis/services/variant-category";

const validationSchema = yup.object({
  productName: yup.string().required("Vui lòng không để trống trường này."),
  productCode: yup.string().required("Vui lòng không để trống trường này."),
  description: yup.string().required("Vui lòng không để trống trường này."),
  materials: yup.string().required("Vui lòng không để trống trường này."),
  mainColors: yup.string().required("Vui lòng không để trống trường này."),
  uses: yup.string().required("Vui lòng không để trống trường này."),
  price: yup.number().min(1, "Vui lòng nhập số tiền lượng hơn 0"),
  inventoryNumber: yup.number().min(1, "Vui lòng nhập số lượng lớn hơn 0"),
});

const CreateProductScreen = () => {
  const router = useRouter();

  const [isClassified, setIsClassified] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
  const dispatch = useDispatch();

  const initialValues = {
    productName: "",
    productCode: "",
    description: "",
    materials: "",
    mainColors: "",
    uses: "",
    price: 0,
    inventoryNumber: 0,
    isHeavyGood: false,
    isMultipleClasses: false,
  };

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      dispatch(openLoading());

      const formData = new FormData();

      if (fileList && fileList.length >= 1) {
        for (let i = 0; i < fileList.length; i++) {
          const fileObj = fileList[i].originFileObj;
          if (fileObj) {
            formData.append(`files`, fileObj);
          }
        }
      }

      const res = await uploadImages(formData); // get images url

      const variables = {
        ...values,
        price: parseInt(values?.price),
        categoryId: selectedLabels,
        images: res,
      };

      const token = storage.getLocalAccessToken();

      const response = await createProduct(variables, token);

      if (response) {
        router.push("/products/list-products");

        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Tạo sản phẩm thành công",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
      }
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

  const getAllCategories = async () => {
    try {
      dispatch(openLoading());
      const res = await getCategories();
      setLabels(res);
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

  const getAllVariantCategoriesByUser = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await getVariantCategoriesByUser(token);
      console.log(res);
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
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllVariantCategoriesByUser();
  }, []);

  return (
    <div className="w-full rounded-lg bg-white px-4 py-2">
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

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex flex-col gap-3">
              <MyTextField
                id="productName"
                name="productName"
                title="Tên sản phẩm"
                placeholder="Nhập tên sản phẩm"
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
              <MyTextField
                id="productCode"
                name="productCode"
                title="Mã sản phẩm"
                placeholder="Nhập mã sản phẩm"
                className="w-full"
                onChange={formik.handleChange}
                value={formik.values.productCode}
                isError={
                  getIn(formik.touched, "productCode") &&
                  Boolean(getIn(formik.errors, "productCode"))
                }
                helperText={
                  getIn(formik.touched, "productCode") &&
                  getIn(formik.errors, "productCode")
                }
              />

              {/* <CheckboxesGroup /> */}

              <CateGoriesPicker
                labels={labels}
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
              />

              <MyTextArea
                id="description"
                name="description"
                title="Mô tả sản phẩm"
                placeholder="Nhập mô tả cho sản phẩm của bạn"
                onChange={formik.handleChange}
                value={formik.values.description}
                isError={
                  getIn(formik.touched, "description") &&
                  Boolean(getIn(formik.errors, "description"))
                }
                helperText={
                  getIn(formik.touched, "description") &&
                  getIn(formik.errors, "description")
                }
              />
              <MyTextField
                id="materials"
                name="materials"
                title="Chất liệu"
                placeholder="Nhập các chất liệu tạo nên sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.materials}
                isError={
                  getIn(formik.touched, "materials") &&
                  Boolean(getIn(formik.errors, "materials"))
                }
                helperText={
                  getIn(formik.touched, "materials") &&
                  getIn(formik.errors, "materials")
                }
              />
              <MyTextField
                id="mainColors"
                name="mainColors"
                title="Màu sắc chủ đạo"
                placeholder="Nhập màu sắc chủ đạo của sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.mainColors}
                isError={
                  getIn(formik.touched, "mainColors") &&
                  Boolean(getIn(formik.errors, "mainColors"))
                }
                helperText={
                  getIn(formik.touched, "mainColors") &&
                  getIn(formik.errors, "mainColors")
                }
              />
              <MyTextField
                id="uses"
                name="uses"
                title="Công dụng"
                placeholder="Nhập công dụng của sản phẩm"
                onChange={formik.handleChange}
                value={formik.values.uses}
                isError={
                  getIn(formik.touched, "uses") &&
                  Boolean(getIn(formik.errors, "uses"))
                }
                helperText={
                  getIn(formik.touched, "uses") && getIn(formik.errors, "uses")
                }
              />

              <div className="flex flex-row items-center gap-8">
                <MyDatePicker
                  id=""
                  label="Ngày sản xuất"
                  placeholder="-- Lựa chọn NSX --"
                  isRequired
                />
                <MyDatePicker
                  id=""
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
                  onChanged={(value) => {
                    if (value === yesNoOptions[0].value)
                      formik.values.isHeavyGood = true;
                    else formik.values.isHeavyGood = false;
                  }}
                />
                <MyRadioButtonsGroup
                  label="Có nhiều phân loại không?"
                  isRequired
                  options={yesNoOptions}
                  defaultValue={yesNoOptions[1].value}
                  onChanged={(value) => {
                    if (value === yesNoOptions[0].value)
                      formik.values.isMultipleClasses = true;
                    else formik.values.isMultipleClasses = false;

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
                    <UploadImage
                      fileList={fileList}
                      setFileList={setFileList}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between gap-8">
                    <MyTextField
                      type="text"
                      id="price"
                      name="price"
                      title="Số tiền"
                      placeholder="Số tiền bán của 1 sản phẩm"
                      isRequired
                      hasInputNumber
                      endIcon={
                        <FormatEndCurrencyIcon value={formik.values.price} />
                      }
                      minNumber={1}
                      className="w-1/2"
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
                    <MyTextField
                      id="inventoryNumber"
                      name="inventoryNumber"
                      title="Số lượng tồn kho"
                      placeholder="Số lượng tồn của sản phẩm"
                      type="number"
                      minNumber={1}
                      className="w-1/2"
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
                  </div>
                </div>
              )}
              {/* {isClassified && <ClassifiedTable />} */}
              {isClassified && (
                <div className="border-t-2 border-dashed border-grey-c50 py-3">
                  <div className="text-sm font-semibold text-grey-c900">
                    Tạo phân loại cho sản phẩm
                  </div>
                </div>
              )}
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
                  type="submit"
                  className="h-12 w-1/3 text-xs md:text-sm lg:text-base"
                  // onClick={() => handleUpload()}
                >
                  Kiểm duyệt và bật bán
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductScreen;
