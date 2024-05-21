import { adminApproveProduct } from "@/apis/services/product";
import storage from "@/apis/storage";
import { RejectFormValues } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeConfirm } from "@/redux/slices/confirmSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
type Props = {
  productId: number;
  handleRefetch: () => void;
};

const RejectProductModal = ({ productId, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues: RejectFormValues = { rejectReason: "", editHint: "" };

  const onSubmit = async (values: RejectFormValues) => {
    try {
      dispatch(openLoading());
      const variables = {
        isAccepted: false,
        rejectReason: values.rejectReason,
        editHint: values.editHint,
      };
      const token = storage.getLocalAccessToken();
      const res = await adminApproveProduct(productId, variables, token);
      if (res) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "TỪ CHỐI DUYỆT",
          message: "Đã từ chối duyệt sản phẩm thành công",
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
              placeholder="Nhập lý do từ chối duyệt"
              value={formik.values.rejectReason}
              onChange={formik.handleChange}
            />
            <MyTextArea
              id="editHint"
              name="editHint"
              title="Gợi ý chỉnh sửa"
              placeholder="Nhập gợi ý chỉnh sửa cho nhà bán"
              value={formik.values.editHint}
              onChange={formik.handleChange}
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

export default RejectProductModal;
