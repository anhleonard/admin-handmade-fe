import { COLORS } from "@/enum/colors";
import SmallInputImage from "@/libs/input-image";
import MyTextAction from "@/libs/text-action";
import MyTextField from "@/libs/text-field";
import { TextField, createStyles } from "@mui/material";
import { use, useEffect, useState } from "react";

type ClassifiedOptionProps = {
  indexOption: number;
  deleteOption: (index: number) => void;
  canDelete?: boolean;
  urlImg: string;
  items?: any;
  setItems: any;
};

const ClassifiedOption = ({
  indexOption,
  deleteOption,
  canDelete = true,
  urlImg,
  items,
  setItems,
}: ClassifiedOptionProps) => {
  const updateUrlImg = (index: number, newUrlImg: string) => {
    setItems((prevItems: any) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], urlImg: newUrlImg };
      return updatedItems;
    });
  };

  const deleteUrlImg = (index: number) => {
    setItems((prevItems: any) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], urlImg: "" };
      return updatedItems;
    });
  };

  const updateContent = (index: number, content: string) => {
    setItems((prevItems: any) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], value: content };
      return updatedItems;
    });
  };

  return (
    <>
      <div className="col-span-1 flex flex-col items-center justify-center text-sm text-grey-c900">
        <div> + Tùy chọn {indexOption + 1}</div>
        {canDelete && (
          <MyTextAction
            label="Xóa"
            color="text-support-c500"
            className="text-[10px]"
            onClick={() => deleteOption(indexOption)}
          />
        )}
      </div>
      <div className="col-span-5 flex flex-row items-center gap-4">
        <MyTextField
          id={`input-field-${indexOption}`}
          onChange={(value) => updateContent(indexOption, value as string)}
          value={items[indexOption].value}
        />

        <SmallInputImage
          id={`image-${indexOption}`}
          name={`image-${indexOption}`}
          height="h-[52px]"
          width="w-[52px]"
          rounded="rounded-xl"
          previewImage={urlImg}
          onChange={(e) => {
            updateUrlImg(
              indexOption,
              URL.createObjectURL(e.target.files?.[0] ?? new Blob()),
            );
          }}
          onDeleteImage={() => deleteUrlImg(indexOption)}
        />
      </div>
    </>
  );
};

export default ClassifiedOption;
