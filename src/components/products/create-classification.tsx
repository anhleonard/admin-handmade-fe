import Button from "@/libs/button";
import MyLabel from "@/libs/label";
import MyTextAction from "@/libs/text-action";
import MyTextField from "@/libs/text-field";
import React, { useState } from "react";

const CreateClassification = () => {
  const [classes, setClasses] = useState([]);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <MyLabel children={`Phân loại 1`} type="warning" />
        {classes.length > 1 && (
          <Button
            type="button"
            className="!w-fit !py-2 md:!text-xs"
            color="error"
          >
            Xóa
          </Button>
        )}
      </div>
      <MyTextField
        id="name"
        name="name"
        title="Tên phân loại"
        placeholder="Nhập tên phân loại"
      />
      <div className="flex flex-row items-end">
        <div className="flex h-[52px] w-[60px] flex-col items-center justify-center">
          <div>{1 + "/"}</div>
          {classes.length == 1
            ? false
            : true && (
                <MyTextAction
                  label="Xóa"
                  color="text-support-c500"
                  className="text-[10px]"
                />
              )}
        </div>
        <div className="flex flex-1 flex-row items-end gap-8 pr-8">
          <MyTextField
            id=""
            title="Tên tùy chọn"
            placeholder="Nhập tên tùy chọn"
          />
        </div>
        <div className="flex flex-row justify-end">
          <Button
            type="button"
            className="!w-fit !px-3 !py-2 md:!text-xs"
            color="info"
            // onClick={() => handleAddOption(classItem.idClass)}
          >
            Thêm tùy chọn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateClassification;
