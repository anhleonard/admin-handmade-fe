import { ClassifiedClass } from "@/enum/defined-type";
import React, { useState } from "react";
import MyLabel from "./label";
import Button from "./button";
import MyTextField from "./text-field";
import MyTextAction from "./text-action";
import MyDisplayImage from "./display-image";
import MyPrimaryTextField from "./primary-text-field";
import MyDefaultText from "./default-text";

type MyDisabledMultipleChoicesProps = {
  isError?: boolean;
  helperText?: string;
};

const MyDisabledMultipleChoices = ({
  isError,
  helperText,
}: MyDisabledMultipleChoicesProps) => {
  const [classes, setClasses] = useState<Array<ClassifiedClass>>([
    {
      idClass: Math.random().toString(),
      name: "Màu",
      items: [
        {
          idItem: Math.random().toString(),
          value: "Đỏ",
          inventory_numbers: 20,
          money: "25.000",
          urlImg:
            "https://salt.tikicdn.com/cache/750x750/ts/product/f6/1a/e5/a74a03ec03cce80bfceb6be69af2820d.jpg.webp",
        },
        {
          idItem: Math.random().toString(),
          value: "Xanh",
          inventory_numbers: 18,
          money: "30.000",
          urlImg:
            "https://salt.tikicdn.com/cache/280x280/ts/product/0f/f9/51/422a9b0f5248dac45afbafb65d977b38.png.webp",
        },
      ],
    },
    {
      idClass: Math.random().toString(),
      name: "Màu",
      items: [
        {
          idItem: Math.random().toString(),
          value: "Đỏ",
          inventory_numbers: 20,
          money: "25000",
          urlImg:
            "https://salt.tikicdn.com/cache/750x750/ts/product/f6/1a/e5/a74a03ec03cce80bfceb6be69af2820d.jpg.webp",
        },
        {
          idItem: Math.random().toString(),
          value: "Xanh",
          inventory_numbers: 18,
          money: "30000",
          urlImg:
            "https://salt.tikicdn.com/cache/280x280/ts/product/0f/f9/51/422a9b0f5248dac45afbafb65d977b38.png.webp",
        },
      ],
    },
  ]);

  return (
    <div className="flex w-full flex-col gap-8 border-b-2 border-t-2 border-grey-c50 pb-8 pt-5">
      {classes.map((classItem, index) => {
        return (
          <div
            className={`flex flex-col gap-4 ${classes.length - 1 != index && "border-b-2 border-dashed border-grey-c100 pb-8"}`}
          >
            <MyLabel children={`Phân loại ${index + 1}`} type="warning" />
            <MyPrimaryTextField
              id={`classification-${classItem.idClass}`}
              title="Tên phân loại"
              defaultValue={classItem.name}
              disabled
            />
            {classItem.items.map((item: any, indexItem: number) => {
              return (
                <div className="flex flex-row items-end">
                  <div className="flex h-[52px] w-[60px] flex-col items-center justify-center">
                    <div>{indexItem + 1 + "/"}</div>
                  </div>
                  <div className="flex flex-1 flex-row items-end gap-8 pr-8">
                    <MyPrimaryTextField
                      id={`name-option-${classItem.idClass}-${item.idItem}`}
                      title="Tên tùy chọn"
                      defaultValue={item.value}
                      disabled
                    />
                    <MyPrimaryTextField
                      id={`inventory-option-${classItem.idClass}-${item.idItem}`}
                      type="number"
                      minNumber={1}
                      title="Tồn kho"
                      defaultValue={item.inventory_numbers}
                      disabled
                    />
                    <MyPrimaryTextField
                      id={`money-option-${classItem.idClass}-${item.idItem}`}
                      type="number"
                      minNumber={1}
                      title="Giá tiền"
                      defaultValue={parseInt(item.money)}
                      disabled
                    />
                  </div>
                  <MyDisplayImage
                    src={item.urlImg}
                    alt=""
                    width="w-[52px]"
                    height="h-[52px]"
                  />
                </div>
              );
            })}
            {isError && helperText && (
              <MyDefaultText wrapClassName="mt-2" type="error">
                {helperText}
              </MyDefaultText>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyDisabledMultipleChoices;
