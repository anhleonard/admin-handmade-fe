import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import MyTextField from "@/libs/text-field";
import React, { useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { COLORS } from "@/enum/colors";
import Button from "@/libs/button";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const benefits = [
  "Đặt giá và khung giờ theo ý của bạn",
  "Được trả tiền cho công việc của bạn",
  "Được trao đổi và làm nhiều dự án",
  "Miễn phí đăng ký và đặt giá",
];

const SellerAuctionInformation = () => {
  const [amount, setAmount] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="grid gap-9 md:grid-cols-3">
      <div className="col-span-2 flex flex-col gap-3">
        <div className="font-bold text-grey-c900">Đặt giá của bạn</div>
        {!isCompleted && (
          <div className="flex flex-col gap-3">
            <MyTextField
              id="depositAmount"
              type="text"
              title="Số tiền đặt"
              placeholder="Nhập số tiền bạn muốn nhận"
              isRequired
              hasInputNumber
              endIcon={
                <FormatEndCurrencyIcon
                  value={parseInt(amount !== "" ? amount : "0")}
                />
              }
              onChange={(value) => setAmount(value as string)}
            />
            <MyTextField
              id="dueDate"
              type="number"
              title="Số ngày hoàn thành"
              placeholder="Nhập số ngày dự kiến hoàn thành"
              isRequired
            />
            <MyTextField
              id="sellerEmail"
              type="text"
              title="Nhập email"
              placeholder="example@gmail.com"
              isRequired
            />
            <Button
              className="!mt-2 !py-3 hover:!scale-[1.01]"
              onClick={() => setIsCompleted(true)}
            >
              Đặt giá
            </Button>
          </div>
        )}
        {isCompleted && (
          <div className="flex flex-col items-center justify-center py-4">
            <CheckRoundedIcon
              sx={{ color: COLORS.primary.c900, fontSize: 120 }}
            />
            <div className="text-base font-medium text-primary-c900">
              Đặt giá thành công!
            </div>
          </div>
        )}
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <div className="font-bold text-grey-c900">
          Lợi ích của việc đặt giá trên Handmade
        </div>
        {benefits.map((benefit: string) => (
          <div className="flex flex-row items-center gap-2">
            <CheckCircleRoundedIcon
              sx={{ fontSize: 20, color: COLORS.primary.c900 }}
            />
            <div className="text-sm text-grey-c900">{benefit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerAuctionInformation;
