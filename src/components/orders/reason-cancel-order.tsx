import MyDefaultText from "@/libs/default-text";

const ReasonCancelOrder = () => {
  return (
    <div className="py-2">
      <MyDefaultText type="error">
        Người bán có thể tải về báo cáo chi tiết đơn hàng để giúp Người bán có
        thể nhìn tổng quan về chi tiết các đơn hàng và lý do hủy đơn. Từ đó, dễ
        dàng nắm được lý do hủy đơn phổ biến và phân tích tốt hơn hiệu suất sản
        phẩm để cải thiện dịch vụ của Shop
      </MyDefaultText>
    </div>
  );
};

export default ReasonCancelOrder;
