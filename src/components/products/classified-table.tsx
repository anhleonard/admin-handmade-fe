import Button from "@/libs/button";
import { useState } from "react";
import MyLabel from "@/libs/label";
import MyTextField from "@/libs/text-field";
import MyTextAction from "@/libs/text-action";
import SmallInputImage from "@/libs/input-image";
import { ClassifiedClass, ClassifiedItem } from "@/enum/defined-type";

const ClassifiedTable = () => {
  const [classes, setClasses] = useState<Array<ClassifiedClass>>([
    {
      idClass: Math.random().toString(),
      name: "màu sắc",
      items: [
        {
          idItem: Math.random().toString(),
          value: "đen",
          inventory_numbers: 1,
          money: "1234",
          urlImg: "",
        },
        {
          idItem: Math.random().toString(),
          value: "xanh",
          inventory_numbers: 1,
          money: "1234",
          urlImg: "",
        },
      ],
    },
  ]);

  const handleAddClass = () => {
    setClasses((prevState: Array<ClassifiedClass>) => [
      ...prevState,
      {
        idClass: Math.random().toString(),
        name: "",
        items: [
          {
            idItem: Math.random().toString(),
            value: "",
            inventory_numbers: 1,
            money: "",
            urlImg: "",
          },
        ],
      },
    ]);
  };

  //handle delete class by index class
  const handleDeleteClass = (id: string) => {
    setClasses(
      classes.filter((classItem: ClassifiedClass) => classItem.idClass !== id),
    );
  };

  const updateClassNameByID = (id: string, newName: string) => {
    setClasses((prevClasses: Array<ClassifiedClass>) => {
      return prevClasses.map((classItem: ClassifiedClass) => {
        if (classItem.idClass === id) {
          return { ...classItem, name: newName };
        }
        return classItem;
      });
    });
  };

  // handle add option for class
  const handleAddOption = (idClassToAddTo: string) => {
    const newItem = {
      idItem: Math.random().toString(),
      value: "",
      inventory_numbers: 1,
      money: "",
      urlImg: "",
    };

    setClasses((prevClasses: Array<ClassifiedClass>) => {
      return prevClasses.map((classItem: ClassifiedClass) => {
        if (classItem.idClass === idClassToAddTo) {
          const updatedItems = [...classItem.items, newItem];
          return { ...classItem, items: updatedItems };
        }
        return classItem;
      });
    });
  };

  //handle delete option of class
  const handleDeleteOption = (idClass: string, idItem: string) => {
    setClasses((prevClasses) => {
      return prevClasses.map((classItem) => {
        if (classItem.idClass === idClass) {
          const updatedItems = classItem.items.filter(
            (item) => item.idItem !== idItem,
          );
          return { ...classItem, items: updatedItems };
        }
        return classItem;
      });
    });
  };

  //update content of item
  const updateContent = (
    idClassToUpdate: string,
    idItemToUpdate: string,
    content: string,
  ) => {
    setClasses((prevClasses: Array<ClassifiedClass>) => {
      return prevClasses.map((classItem: ClassifiedClass) => {
        if (classItem.idClass === idClassToUpdate) {
          const updatedItems = classItem.items.map((item: ClassifiedItem) => {
            if (item.idItem === idItemToUpdate) {
              return { ...item, value: content };
            }
            return item;
          });
          return { ...classItem, items: updatedItems };
        }
        return classItem;
      });
    });
  };

  //update inventory
  const updateInventory = (
    idClassToUpdate: string,
    idItemToUpdate: string,
    newInventory: number,
  ) => {
    setClasses((prevClasses) => {
      return prevClasses.map((classItem) => {
        if (classItem.idClass === idClassToUpdate) {
          const updatedItems = classItem.items.map((item) => {
            if (item.idItem === idItemToUpdate) {
              return { ...item, inventory_numbers: newInventory };
            }
            return item;
          });
          return { ...classItem, items: updatedItems };
        }
        return classItem;
      });
    });
  };

  //update money
  const updateMoney = (
    idClassToUpdate: string,
    idItemToUpdate: string,
    money: string,
  ) => {
    setClasses((prevClasses: Array<ClassifiedClass>) => {
      return prevClasses.map((classItem: ClassifiedClass) => {
        if (classItem.idClass === idClassToUpdate) {
          const updatedItems = classItem.items.map((item: ClassifiedItem) => {
            if (item.idItem === idItemToUpdate) {
              return { ...item, money: money };
            }
            return item;
          });
          return { ...classItem, items: updatedItems };
        }
        return classItem;
      });
    });
  };

  //update image
  const updateImage = (idClass: string, idItem: string, urlImage: string) => {
    setClasses((prevClasses: Array<ClassifiedClass>) => {
      return prevClasses.map((classItem: ClassifiedClass) => {
        if (classItem.idClass === idClass) {
          const updatedItems = classItem.items.map((item: ClassifiedItem) => {
            if (item.idItem === idItem) {
              return { ...item, urlImg: urlImage };
            }
            return item;
          });
          return { ...classItem, items: updatedItems };
        }
        return classItem;
      });
    });
  };

  return (
    <div className="flex w-full flex-col gap-8 border-b-2 border-t-2 border-grey-c50 pb-8 pt-5">
      <div className="flex flex-row items-center justify-between border-b-2 border-dashed border-grey-c50 pb-5">
        <div className="px-1 text-base font-semibold text-grey-c900">
          Phân loại
        </div>
        <Button
          type="button"
          className="md:!text-sm"
          onClick={() => handleAddClass()}
        >
          Thêm phân loại
        </Button>
      </div>
      {classes.map((classItem, index) => {
        return (
          <div
            className={`flex flex-col gap-4 ${classes.length - 1 != index && "border-b-2 border-dashed border-grey-c100 pb-8"}`}
          >
            <div className="flex flex-row justify-between">
              <MyLabel children={`Phân loại ${index + 1}`} type="warning" />
              {classes.length > 1 && (
                <Button
                  type="button"
                  className="!w-fit !py-2 md:!text-xs"
                  color="error"
                  onClick={() => handleDeleteClass(classItem.idClass)}
                >
                  Xóa
                </Button>
              )}
            </div>
            <MyTextField
              id={`classification-${classItem.idClass}`}
              title="Tên phân loại"
              placeholder="Nhập tên phân loại"
              value={classItem.name}
              onChange={(value) =>
                updateClassNameByID(classItem.idClass, value as string)
              }
            />
            {classItem.items.map((item: any, indexItem: number) => {
              return (
                <div className="flex flex-row items-end">
                  <div className="flex h-[52px] w-[60px] flex-col items-center justify-center">
                    <div>{indexItem + 1 + "/"}</div>
                    {classItem.items.length == 1
                      ? false
                      : true && (
                          <MyTextAction
                            label="Xóa"
                            color="text-support-c500"
                            className="text-[10px]"
                            onClick={() =>
                              handleDeleteOption(classItem.idClass, item.idItem)
                            }
                          />
                        )}
                  </div>
                  <div className="flex flex-1 flex-row items-end gap-8 pr-8">
                    <MyTextField
                      id={`name-option-${classItem.idClass}-${item.idItem}`}
                      title="Tên tùy chọn"
                      placeholder="Nhập tên tùy chọn"
                      value={item.value}
                      onChange={(value) =>
                        updateContent(
                          classItem.idClass,
                          item.idItem,
                          value as string,
                        )
                      }
                    />
                    <MyTextField
                      id={`inventory-option-${classItem.idClass}-${item.idItem}`}
                      type="number"
                      minNumber={1}
                      title="Tồn kho"
                      placeholder="Nhập số lượng tồn kho"
                      value={item.inventory_numbers}
                      onChange={(value) =>
                        updateInventory(
                          classItem.idClass,
                          item.idItem,
                          parseInt(value as string),
                        )
                      }
                    />
                    <MyTextField
                      id={`money-option-${classItem.idClass}-${item.idItem}`}
                      type="number"
                      minNumber={1}
                      title="Giá tiền"
                      placeholder="Nhập số tiền 1 sản phẩm"
                      value={parseInt(item.money)}
                      onChange={(value) =>
                        updateMoney(
                          classItem.idClass,
                          item.idItem,
                          value as string,
                        )
                      }
                    />
                  </div>
                  <SmallInputImage
                    id={`image-option-${classItem.idClass}-${item.idItem}`}
                    name={`image-option-${classItem.idClass}-${item.idItem}`}
                    height="h-[52px]"
                    width="w-[52px]"
                    rounded="rounded-xl"
                    previewImage={item.urlImg}
                    onChange={(e) => {
                      updateImage(
                        classItem.idClass,
                        item.idItem,
                        URL.createObjectURL(e.target.files?.[0] ?? new Blob()),
                      );
                    }}
                    onDeleteImage={() => {
                      updateImage(classItem.idClass, item.idItem, "");
                    }}
                  />
                </div>
              );
            })}
            <div className="flex flex-row justify-end">
              <Button
                type="button"
                className="!w-fit !px-3 !py-2 md:!text-xs"
                color="info"
                onClick={() => handleAddOption(classItem.idClass)}
              >
                Thêm tùy chọn
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClassifiedTable;
