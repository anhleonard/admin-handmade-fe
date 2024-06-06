import { ReportProductValues } from "@/apis/types";
import { AlertStatus, ProductStatus } from "@/enum/constants";
import { AlertState, Product } from "@/enum/defined-type";
import React from "react";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Form, Formik } from "formik";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import { useDispatch } from "react-redux";
import { reportProduct } from "@/apis/services/product";
import storage from "@/apis/storage";

type Props = {
  product: Product;
  handleRefetch: () => void;
};

const ReportProductModal = ({ product, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues: ReportProductValues = {
    status: ProductStatus.VIOLATE,
    editHint: "",
    rejectReason: "",
  };

  const onSubmit = async (values: ReportProductValues) => {
    try {
      dispatch(openLoading());
      const variables: ReportProductValues = {
        ...values,
      };
      const token = storage.getLocalAccessToken();
      const reportedData = await reportProduct(product?.id, variables, token);
      if (reportedData) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Báo cáo vi phạm thành công!",
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
            <MyTextArea
              id="rejectReason"
              name="rejectReason"
              title="Lý do"
              placeholder="Nhập lý do vi phạm"
              value={formik.values.rejectReason}
              onChange={formik.handleChange}
              isRequired
            />
            <MyTextArea
              id="editHint"
              name="editHint"
              title="Gợi ý chỉnh sửa"
              placeholder="Nhập gợi ý chỉnh sửa"
              value={formik.values.editHint}
              onChange={formik.handleChange}
              isRequired
            />
            <div className="flex flex-row items-center justify-center pt-3">
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

export default ReportProductModal;
