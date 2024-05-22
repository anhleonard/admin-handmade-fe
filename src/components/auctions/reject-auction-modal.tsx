import { updateAuction } from "@/apis/services/auctions";
import { adminApproveProduct } from "@/apis/services/product";
import storage from "@/apis/storage";
import { RejectAuctionValues } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-type";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
type Props = {
  auctionId: number;
  handleRefetch: () => void;
};

const RejectAuctionModal = ({ auctionId, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues: RejectAuctionValues = {
    isAccepted: false,
    additionalComment: "",
  };

  const onSubmit = async (values: RejectAuctionValues) => {
    try {
      dispatch(openLoading());
      const variables = {
        isAccepted: false,
        additionalComment: values.additionalComment,
      };
      const token = storage.getLocalAccessToken();
      const res = await updateAuction(auctionId, variables, token);
      if (res) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "TỪ CHỐI DUYỆT",
          message: "Đã từ chối duyệt dự án thành công",
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
              id="additionalComment"
              name="additionalComment"
              title="Lý do"
              placeholder="Nhập lý do từ chối duyệt"
              value={formik.values.additionalComment}
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

export default RejectAuctionModal;
