"use client";
import {
  AlertStatus,
  Page,
  ProductStatus,
  mainCategories,
  rowsPerPage,
} from "@/enum/constants";
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
import { useEffect, useState } from "react";
import { AlertState, Product } from "@/enum/defined-type";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { adminProducts, getViolateProducts } from "@/apis/services/product";
import { openAlert } from "@/redux/slices/alertSlice";
import { headerUrl } from "@/apis/services/authentication";
import { formatDate } from "@/enum/functions";
import MyStatus from "@/libs/status";
import { MyPagination } from "@/libs/pagination";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

const ViolateItemsTable = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);

  const handleOpenDetailModal = (productId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết sản phẩm & lỗi",
      content: (
        <DetailProductModal
          type={ProductStatus.VIOLATE}
          productId={productId}
        />
      ),
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

  // get all violate products by seller token
  const getAllProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: ProductStatus.VIOLATE,
      };
      const res = await adminProducts(token, query);
      if (res) {
        setCount(res?.total ?? 0);
        setProducts(res?.data);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [page, rowsPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleRowPerPageChange = (e: any) => {
    setPage(Page);
    setRowsPage(parseInt(e.target.value));
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
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Ngày vi phạm</th>
                <th className="px-1 py-4">Lý do</th>
                {/* <th className="px-1 py-4">Gợi ý chỉnh sửa</th> */}
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: Product, index: number) => {
                return (
                  <tr className="hover:bg-primary-c100 hover:text-grey-c700">
                    <td className="py-4 pl-3">{product?.productCode}</td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-start gap-2">
                        <img
                          src={`${headerUrl}/products/${product.images[0]}`}
                          alt="product-image"
                          className="h-15 w-15 rounded-lg object-cover"
                        />
                        <div className="flex flex-col justify-start">
                          <div className="">{product?.productName}</div>
                          <div>
                            <span className="text-[10px]">Đã bán:</span>{" "}
                            <span className="text-[10px] font-bold text-primary-c900">
                              {product?.soldNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-4 align-top">
                      <MyStatus status={product?.status}></MyStatus>
                    </td>
                    <td className="px-1 py-4 align-top">
                      {formatDate(product?.updatedAt)}
                    </td>
                    <td className="max-w-[300px] px-1 py-4 align-top">
                      {product?.rejectReason}
                    </td>
                    {/* <td className="px-1 py-4 align-top">{product?.editHint}</td> */}
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết lỗi">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenDetailModal(product?.id)}
                          >
                            <ErrorOutlineIcon
                              sx={{ color: COLORS.primary.c700, fontSize: 22 }}
                            />
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <MyPagination
        page={page}
        handlePageChange={handlePageChange}
        handleRowPerPageChange={handleRowPerPageChange}
        total={count}
        rowsPerPage={rowsPage}
      />
    </div>
  );
};

export default ViolateItemsTable;
