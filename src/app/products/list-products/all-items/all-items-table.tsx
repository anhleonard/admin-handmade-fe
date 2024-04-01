"use client";
import { mainCategories } from "@/enum/constants";
import {
  DeleteIcon,
  DetailIcon,
  EditIcon,
  OffIcon,
  SearchIcon,
} from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import Image from "next/image";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import EditProductModal from "../../modals/edit-product-modal";
import DetailProductModal from "../../modals/detail-product-modal";
import { openConfirm } from "@/redux/slices/confirmSlice";
import { useState } from "react";
import GiftCollapse from "@/components/gifts/gift-collapse";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

const AllItemsTable = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpenDetailModal = () => {
    const modal = {
      isOpen: true,
      title: "Chi tiết sản phẩm",
      content: <DetailProductModal />,
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleOpenEditModal = () => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa sản phẩm",
      content: <EditProductModal />,
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleConfirmDeleteItem = () => {
    const confirm: any = {
      isOpen: true,
      title: "XÓA SẢN PHẨM",
      message: "Bạn có chắc chắn xóa sản phẩm này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => {},
    };

    dispatch(openConfirm(confirm));
  };

  const handleConfirmOffItem = () => {
    const confirm: any = {
      isOpen: true,
      title: "TẮT SẢN PHẨM",
      message: "Bạn có chắc chắn tắt sản phẩm này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => {},
    };

    dispatch(openConfirm(confirm));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* filter */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <MySelect options={labelOptions} selected={labelOptions[0].value} />
          <MyTextField
            id="searchItem"
            endIcon={<SearchIcon />}
            placeholder="Nhập nội dung tìm kiếm"
            className="w-[300px]"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <div>Danh mục</div>
          <MySelect
            options={mainCategories}
            selected={mainCategories[0].value}
          />
        </div>
      </div>
      {/* table */}
      <div className="max-w-[100%] overflow-hidden rounded-[10px]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-auto text-left text-sm">
            <thead
              className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
            >
              <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                <th className="py-4 pl-3">Mã sản phẩm</th>
                <th className="px-1 py-4">Sản phẩm</th>
                <th className="px-1 py-4">Tồn kho</th>
                <th className="px-1 py-4">Quà tặng</th>
                <th className="px-1 py-4">Giá bán</th>
                <th className="px-1 py-4">Phí Handmade thu</th>
                <th className="px-1 py-4">Lợi nhuận</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover:bg-primary-c100 hover:text-grey-c700">
                <td className="py-4 pl-3">38BEE27</td>
                <td className="px-1 py-4">
                  <div className="flex flex-row items-start gap-2">
                    <Image
                      alt="Laptop"
                      width={60}
                      height={60}
                      className="rounded-lg"
                      src={
                        "https://salt.tikicdn.com/cache/350x350/ts/product/34/ea/17/24907f37b8c0896ef083d630284663df.png.webp"
                      }
                    />
                    <div className="flex flex-col justify-start">
                      <div className="w-[160px] overflow-ellipsis break-words md:w-[200px]">
                        Thiết bị tivi giải trí xách tay LG StanbyME Go 27 inch
                      </div>
                      <div>
                        <span className="text-[10px]">Đã bán:</span>{" "}
                        <span className="text-[10px] font-bold text-primary-c900">
                          1052
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-1 py-4">6433</td>
                <td className="px-1 py-4">1</td>
                <td className="px-1 py-4">260.000</td>
                <td className="px-1 py-4">20.000</td>
                <td className="px-1 py-4">240.000</td>
                <td className="px-1 py-4">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Tooltip title="Xem chi tiết">
                      <div
                        className="hover:cursor-pointer"
                        onClick={() => handleOpenDetailModal()}
                      >
                        <DetailIcon />
                      </div>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                      <div
                        className="hover:cursor-pointer"
                        onClick={() => handleOpenEditModal()}
                      >
                        <EditIcon />
                      </div>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <div
                        className="hover:cursor-pointer"
                        onClick={() => handleConfirmDeleteItem()}
                      >
                        <DeleteIcon />
                      </div>
                    </Tooltip>
                    <Tooltip title="Tắt sản phẩm">
                      <div
                        className="hover:cursor-pointer"
                        onClick={() => handleConfirmOffItem()}
                      >
                        <OffIcon />
                      </div>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllItemsTable;
