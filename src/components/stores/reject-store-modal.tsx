import { updateAuction } from "@/apis/services/auctions";
import { adminApproveProduct } from "@/apis/services/product";
import { updateStoreStatus } from "@/apis/services/stores";
import storage from "@/apis/storage";
import { StoreStatusValues } from "@/apis/types";
import { AlertStatus, StoreStatus } from "@/enum/constants";
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
  storeId: number;
  handleRefetch: () => void;
};

const RejectStoreModal = ({ storeId, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues: StoreStatusValues = {
    status: StoreStatus.INACTIVE,
    notApproveReason: "",
  };

  const onSubmit = async (values: StoreStatusValues) => {
    try {
      dispatch(openLoading());
      const variables: StoreStatusValues = {
        status: StoreStatus.INACTIVE,
        notApproveReason: values.notApproveReason,
      };
      const token = storage.getLocalAccessToken();
      const res = await updateStoreStatus(storeId, variables, token);
      if (res) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "TỪ CHỐI DUYỆT THÀNH CÔNG",
          message: "Đã từ chối duyệt cửa hàng thành công!",
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
              id="notApproveReason"
              name="notApproveReason"
              title="Lý do"
              placeholder="Nhập lý do từ chối duyệt"
              value={formik.values.notApproveReason}
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

export default RejectStoreModal;
