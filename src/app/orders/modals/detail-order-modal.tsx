import ClientAddress from "@/components/clients/client-address";
import OrderPackage from "@/components/orders/order-package";
import Button from "@/libs/button";
import MyLabel from "@/libs/label";

type DetailOrderModalProps = {
  type?:
    | "ALL_ORDERS"
    | "WAITING_ORDERS"
    | "PROCESSING_ORDER"
    | "TRANSPORT_ORDERS"
    | "DONE_ORDERS"
    | "CANCEL_ORDERS";
};

const DetailOrderModal = ({ type = "ALL_ORDERS" }: DetailOrderModalProps) => {
  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col gap-3 text-sm">
          <div>
            Mã đơn hàng: <span className="font-semibold">QT123456789</span>
          </div>
          {type === "CANCEL_ORDERS" ? (
            <>
              <div>
                Hủy vào lúc:{" "}
                <span className="font-semibold">14:13 12/06/2024</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                Trạng thái: <MyLabel type="error">Đã hủy</MyLabel>
              </div>
            </>
          ) : (
            <>
              <div>
                Ngày đặt hàng: <span className="font-semibold">12/06/2024</span>
              </div>
              <div>
                Hạn xác nhận: <span className="font-semibold">12/12/2024</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                Trạng thái: <MyLabel type="warning">Chờ xác nhận</MyLabel>
              </div>
            </>
          )}
        </div>
        <div className="col-span-1 flex flex-col gap-3 text-sm">
          {type === "CANCEL_ORDERS" ? (
            <>
              <div>
                Hủy bởi:{" "}
                <span className="font-semibold text-support-c500">
                  Khách hàng
                </span>
              </div>
              <div>
                Tiền hoàn lại:{" "}
                <span className="font-semibold text-primary-c900">
                  250.000đ
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                Thanh toán:{" "}
                <span className="font-semibold">Đã hoàn trả qua Ngân hàng</span>
              </div>
            </>
          ) : (
            <>
              <div>
                Tổng tiền:{" "}
                <span className="font-semibold text-primary-c900">
                  250.000đ
                </span>
              </div>
              <div>
                Handmade dự thu:{" "}
                <span className="font-semibold text-support-c500">20.000đ</span>
              </div>
              <div>
                Thu về:{" "}
                <span className="font-semibold text-success-c900">
                  230.000đ
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                Thanh toán:{" "}
                <span className="font-semibold">Đã trả qua Ngân hàng</span>
              </div>
            </>
          )}
        </div>
      </div>
      <ClientAddress />
      <OrderPackage />
      {type === "WAITING_ORDERS" && (
        <Button className="mx-auto max-w-[200px]">Xác nhận đơn hàng</Button>
      )}
    </div>
  );
};

export default DetailOrderModal;
