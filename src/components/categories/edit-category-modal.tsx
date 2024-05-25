import { headerUrl } from "@/apis/services/authentication";
import { createCategory, updateCategory } from "@/apis/services/categories";
import {
  adminApproveProduct,
  uploadSingleImage,
} from "@/apis/services/product";
import storage from "@/apis/storage";
import { CreateCategoryValues, RejectFormValues } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Category, Product } from "@/enum/defined-type";
import Button from "@/libs/button";
import MainInputImage from "@/libs/main-input-image";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
type Props = {
  category: Category;
  handleRefetch: () => void;
};

const EditCategoryModal = ({ category, handleRefetch }: Props) => {
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(
    `${headerUrl}/products/${category?.image}` ?? "",
  );
  const [fileImage, setFileImage] = useState<File | null>();

  const initialValues: CreateCategoryValues = {
    title: category?.title ?? "",
    description: category?.description ?? "",
  };

  const onSubmit = async (values: CreateCategoryValues) => {
    let imageFile: string = "";

    if (previewImage === `${headerUrl}/products/${category?.image}`) {
      imageFile = category?.image;
    } else {
      const formData = new FormData();
      if (fileImage) {
        formData.append("image", fileImage);
        imageFile = await uploadSingleImage(formData);
      } else {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: "Không thể upload ảnh!",
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));
        return;
      }
    }

    try {
      dispatch(openLoading());
      const variables = {
        title: values.title,
        description: values.description,
        image: imageFile,
      };
      const token = storage.getLocalAccessToken();
      const res = await updateCategory(category?.id, variables, token);
      if (res) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "CẬP NHẬT THÀNH CÔNG",
          message: "Đã cập nhật danh mục thành công",
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
            <div className="flex flex-row items-center justify-center">
              <MainInputImage
                id="image"
                name="image"
                rounded="rounded-xl"
                width="!w-[200px]"
                height="!h-[200px]"
                previewImage={previewImage}
                onChange={(event) => {
                  setFileImage(event.target.files?.[0]);
                  setPreviewImage(
                    URL.createObjectURL(event.target.files?.[0] ?? new Blob()),
                  );
                }}
                onDeleteImage={() => {
                  setFileImage(null);
                  setPreviewImage("");
                }}
              />
            </div>
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

export default EditCategoryModal;
