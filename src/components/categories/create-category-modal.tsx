import { createCategory } from "@/apis/services/categories";
import { adminApproveProduct } from "@/apis/services/product";
import storage from "@/apis/storage";
import { CreateCategoryValues, RejectFormValues } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Product } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
type Props = {
  handleRefetch: () => void;
};

const CreateCategoryModal = ({ handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues: CreateCategoryValues = { title: "", description: "" };

  const onSubmit = async (values: CreateCategoryValues) => {
    try {
      dispatch(openLoading());
      const variables = {
        title: values.title,
        description: values.description,
      };
      const token = storage.getLocalAccessToken();
      const res = await createCategory(variables, token);
      if (res) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "TẠO THÀNH CÔNG",
          message: "Đã tạo danh mục thành công",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
        handleRefetch();
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
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-4 px-2 py-4">
            <MyTextField
              id="title"
              name="title"
              title="Tên danh mục"
              placeholder="Nhập tên danh mục"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <MyTextArea
              id="description"
              name="description"
              title="Mô tả"
              placeholder="Nhập mô tả về danh mục"
              value={formik.values.description}
              onChange={formik.handleChange}
              isRequired
            />
            <div className="flex flex-row items-center justify-center">
              <Button color="black" className="!w-fit !scale-100" type="submit">
                Cập nhật
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCategoryModal;
