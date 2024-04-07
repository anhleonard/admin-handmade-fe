import React, { useState } from "react";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import { COLORS } from "@/enum/colors";
import MyTextField from "@/libs/text-field";
import MyTextArea from "@/libs/text-area";
import Button from "@/libs/button";

const UpdateWorkForm = () => {
  const [percentageWork, setPercentageWork] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-2">
        <DonutLargeRoundedIcon sx={{ fontSize: 22, color: COLORS.grey.c800 }} />
        <div className="font-bold text-grey-c900">
          Cập nhật tiến độ công việc
        </div>
      </div>
      <MyTextField
        type="number"
        id={`percentageDiscount-${Math.random().toString()}`}
        title="Phần trăm giảm"
        placeholder="Nhập số lượng % giảm (Min: 2% - Max: 99%)"
        minNumber={2}
        maxNumber={99}
        isRequired
        defaultValue={percentageWork}
        onChange={(value) => {
          setPercentageWork(value as number);
        }}
        endIcon={
          <span className="pl-2 text-xs font-bold text-primary-c900">
            {percentageWork ? percentageWork.toString() + "%" : "0%"}
          </span>
        }
      />
      <MyTextArea
        id={`updateContent-${Math.random().toString()}`}
        title="Nội dung"
        isRequired
        placeholder="Nhập nôi dung"
      />
      <div className="flex flex-row justify-end">
        <Button className="!w-fit" color="primary">
          <span className="text-sm font-medium">Thêm</span>
        </Button>
      </div>
    </div>
  );
};

export default UpdateWorkForm;
