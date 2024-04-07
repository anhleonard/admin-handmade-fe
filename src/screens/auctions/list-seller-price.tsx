import { formatCurrency } from "@/enum/functions";
import MyCollapseLongText from "@/libs/collapse-long-text";
import MyDisplayImage from "@/libs/display-image";
import { Rating } from "@mui/material";
import React, { useState } from "react";

const ListSellerPrice = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="mb-4 font-bold text-grey-c900">
        Danh sách sellers đã ra giá
      </div>
      <div>
        <div className="flex flex-row items-start gap-[30px]">
          <div>
            <MyDisplayImage
              src="https://salt.tikicdn.com/cache/750x750/ts/product/40/d1/23/c7a77754eaeb40915246b49476ad68ff.jpg.webp"
              alt=""
              width="w-[90px]"
              height="h-[90px]"
              rounded="20px"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-4 md:gap-[30px]">
            <div className="col-span-3 flex flex-col gap-1">
              <div className="text-sm font-bold text-grey-c900">
                Tiệm nhà len
              </div>
              <MyCollapseLongText open={open} onClick={() => setOpen(!open)}>
                These skills are paramount for project success. The individual
                will need to possess an expert-level understanding of STRIDE
                threat models, with a strong portfolio of past work to showcase
                their proficiency. Additionally, the final output of the model
                should be delivered in a detailed report. These skills are
                paramount for project success. The individual will need to
                possess an expert-level understanding of STRIDE threat models,
                with a strong portfolio of past work to showcase their
                proficiency. Additionally, the final output of the model should
                be delivered in a detailed report.
              </MyCollapseLongText>
            </div>
            <div className="col-span-1 flex flex-col gap-2 text-sm text-grey-c900">
              <div>
                <span className="font-bold text-primary-c900">
                  {formatCurrency(500000)}
                </span>{" "}
                trong 3 ngày
              </div>
              <div>
                Điểm uy tín:{" "}
                <span className="font-bold text-success-c900">1020</span>
              </div>
              <div className="flex flex-row items-center gap-3">
                <Rating
                  name="read-only"
                  value={5.0}
                  readOnly
                  precision={0.5}
                  size="small"
                />
                <span className="font-bold text-success-c900">5.0 sao</span>
              </div>
              <div>(52 đánh giá)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSellerPrice;
