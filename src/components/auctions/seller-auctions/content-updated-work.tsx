import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import { Avatar } from "@mui/material";
import React, { useState } from "react";

type ContentUpdatedWorkProps = {
  type?: "client" | "seller";
  status: string;
};

const ContentUpdatedWork = ({ type, status }: ContentUpdatedWorkProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("abcabc");

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <Avatar
            alt="avatar"
            sx={{ width: 46, height: 46 }}
            src="https://truyenhinhthanhhoa.qltns.mediacdn.vn/thumb_w/640/2020/02/19/21/iu-18.jpg"
          />
          <div className="flex flex-col items-start gap-1">
            <div className="font-bold text-grey-c900">Me</div>
            <div className="flex flex-row gap-2 text-grey-c900">
              <div className="text-[14px]">12:43 PM 12/03/2024</div>
              <div className="font-bold text-primary-c900"> 50%</div>
            </div>
          </div>
        </div>
        {status === "progress" &&
          (isEdit ? (
            <Button
              className="!w-fit !px-3 !py-1.5"
              color="primary"
              onClick={() => setIsEdit(false)}
            >
              <span className="text-xs font-medium">Cập nhật</span>
            </Button>
          ) : (
            <Button
              className="!w-fit !px-3 !py-1.5"
              color="info"
              onClick={() => setIsEdit(true)}
            >
              <span className="text-xs font-medium">Chỉnh sửa</span>
            </Button>
          ))}
      </div>

      {isEdit ? (
        <MyTextArea
          id={Math.random().toString()}
          placeholder="Nhập nội dung"
          defaultValue={content}
          onChange={(value) => setContent(value as string)}
        />
      ) : (
        <div className="text-justify text-grey-c900">{content}</div>
      )}
    </div>
  );
};

export default ContentUpdatedWork;
