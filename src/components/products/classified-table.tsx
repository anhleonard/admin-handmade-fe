import { CloseIcon } from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import { useEffect, useState } from "react";
import ClassifiedOption from "./classified-option";
import Button from "@/libs/button";

type ClassifiedOptionInformation = {
  value: string;
  urlImg: string;
};

type ClassifiedList = {
  options: Array<ClassifiedOptionInformation>;
  name: string;
};

const ClassifiedTable = () => {
  const [name, setName] = useState("");
  const [items, setItems] = useState([
    { value: "hello", urlImg: "" },
    { value: "ca nha", urlImg: "" },
  ]);

  const handleAddOption = () => {
    setItems((prevState) => [...prevState, { value: "", urlImg: "" }]);
  };

  const handleDeleteOption = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);

    setItems(newItems);
  };

  const renderItems = () => {
    return items.map((item: any, index) => {
      return (
        <div className="grid grid-cols-6">
          <ClassifiedOption
            indexOption={index}
            deleteOption={handleDeleteOption}
            canDelete={items.length == 1 || items.length == 2 ? false : true}
            urlImg={item.urlImg}
            items={items}
            setItems={setItems}
          />
        </div>
      );
    });
  };

  return (
    <div className="rounded-2xl border-[2px] border-grey-c50 px-3 py-2">
      <div className="flex flex-row items-center justify-between">
        <div className="px-1 text-base font-semibold">Phân loại</div>
        <div className="rounded-full p-1 hover:cursor-pointer hover:bg-grey-c50">
          <CloseIcon />
        </div>
      </div>
      <div className="px-8 py-4">
        <div className="mb-4 grid grid-cols-6">
          <div className="col-span-1 flex items-center font-medium text-grey-c900">
            Tên phân loại
          </div>
          <MyTextField id="classified_text_field" className="col-span-5" />
        </div>
        <div className="flex flex-col gap-4">{renderItems()}</div>
        <div className="mt-4 flex justify-center">
          <Button
            color="primary"
            className="!px-3 !py-2"
            onClick={() => handleAddOption()}
          >
            <div className="text-xs">Thêm tùy chọn</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassifiedTable;
