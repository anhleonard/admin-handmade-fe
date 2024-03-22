import SmallInputImage from "@/libs/input-image";
import MyTextAction from "@/libs/text-action";
import MyTextField from "@/libs/text-field";
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
  const [previewImage, setPreviewImage] = useState(urlImg);

  const updateUrlImg = (index: number, newUrlImg: string) => {
    setItems((prevItems: any) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], urlImg: newUrlImg };
      return updatedItems;
    });
  };

  useEffect(() => {
    if (items && items[indexOption] === undefined) {
      setPreviewImage("");
    } else {
      updateUrlImg(indexOption, previewImage);
    }
  }, [previewImage]);

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
        <MyTextField id={`input-field-${indexOption}`} />
        <SmallInputImage
          id={`image-${indexOption}`}
          name={`image-${indexOption}`}
          height="h-[52px]"
          width="w-[52px]"
          rounded="rounded-xl"
          previewImage={previewImage}
          onChange={(e) => {
            setPreviewImage(
              URL.createObjectURL(e.target.files?.[0] ?? new Blob()),
            );
          }}
          onDeleteImage={() => {
            setPreviewImage("");
          }}
        />
      </div>
    </>
  );
};

export default ClassifiedOption;
