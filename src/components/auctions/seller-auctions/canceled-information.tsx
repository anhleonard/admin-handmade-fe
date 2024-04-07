import { COLORS } from "@/enum/colors";
import React from "react";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";

const CanceledInformation = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <PersonOutlineRoundedIcon
            sx={{ fontSize: 22, color: COLORS.grey.c800 }}
          />
          <div className="font-bold text-grey-c900">Người hủy</div>
        </div>
        <div className="text-sm text-grey-c900">Anh Leonard (Me)</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <QuestionMarkOutlinedIcon
            sx={{ fontSize: 20, color: COLORS.grey.c800 }}
          />
          <div className="font-bold text-grey-c900">Lý do hủy</div>
        </div>
        <div className="text-justify text-sm text-grey-c900">
          These skills are paramount for project success. The individual will
          need to possess an expert-level understanding of STRIDE threat models,
          with a strong portfolio of past work to showcase their proficiency.
          These skills are paramount for project success. The individual will
          need to possess an expert-level understanding of STRIDE threat models,
          with a strong portfolio of past work to showcase their proficiency.
        </div>
      </div>
    </div>
  );
};

export default CanceledInformation;
