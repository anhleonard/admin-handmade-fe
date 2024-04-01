"use client";
import { mainCategories } from "@/enum/constants";
import {
  DeleteIcon,
  DetailIcon,
  EditIcon,
  OffIcon,
  SearchIcon,
} from "@/enum/icons";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import Image from "next/image";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { Tooltip, Typography } from "@mui/material";
import MyTextAction from "@/libs/text-action";
import MyCutOffText from "@/libs/cutoff-text";
import { COLORS } from "@/enum/colors";
import DetailProductModal from "../../modals/detail-product-modal";
import EditProductModal from "../../modals/edit-product-modal";
import EditViolateProductModal from "../../modals/edit-violate-product";
import { openConfirm } from "@/redux/slices/confirmSlice";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

const ViolateItemsTable = () => {
  const dispatch = useDispatch();

  const handleOpenDetailModal = () => {
    const modal = {
      isOpen: true,
      title: "Chi tiết sản phẩm & lỗi",
      content: <DetailProductModal type="VIOLATE_ITEMS" />,
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleOpenEditModal = () => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa sản phẩm & lỗi",
      content: <EditViolateProductModal />,
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
                <th className="px-1 py-4">Ngày phát hiện vi phạm</th>
                <th className="px-1 py-4">Lý do</th>
                <th className="px-1 py-4">Diễn giải</th>
                <th className="px-1 py-4">Gợi ý chỉnh sửa</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
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
                      <div className=" overflow-ellipsis break-words ">
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
                <td className="px-1 py-4">17:08 - 22/3/2024</td>
                <td className="px-1 py-4 align-top">
                  <MyCutOffText content="Hình ảnh không khớp với mô tả" />
                </td>
                <td className="px-1 py-4 align-top">
                  <MyCutOffText
                    content="Hiển thị các sản phẩm duyệt không thành công, vi phạm trong
                    quá trình bán hàng (Khoá hoặc bị cấm hiển thị)."
                  />
                </td>
                <td className="px-1 py-4 align-top">
                  <MyCutOffText content="Hiển thị các sản phẩm duyệt không thành công" />
                </td>
                <td className="px-1 py-4">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Tooltip title="Xem chi tiết lỗi">
                      <div
                        className="hover:cursor-pointer"
                        onClick={() => handleOpenDetailModal()}
                      >
                        <ErrorOutlineIcon
                          sx={{ color: COLORS.primary.c700, fontSize: 22 }}
                        />
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

export default ViolateItemsTable;
