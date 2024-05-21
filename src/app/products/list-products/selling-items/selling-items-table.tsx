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
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { Tooltip } from "@mui/material";
import { adminProducts } from "@/apis/services/product";
import storage from "@/apis/storage";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { useEffect, useState } from "react";
import { AlertState, Product } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import { RootState } from "@/redux/store";
import { headerUrl } from "@/apis/services/authentication";
import { formatCurrency } from "@/enum/functions";
import DetailProductModal from "../../modals/detail-product-modal";
import MyStatus from "@/libs/status";
import { COLORS } from "@/enum/colors";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { MyPagination } from "@/libs/pagination";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

const SellingItemsTable = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>();
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);

  const handleOpenDetailModal = (productId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết sản phẩm",
      content: (
        <DetailProductModal
          type={ProductStatus.SELLING}
          productId={productId}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  // get all selling products by seller token
  const getAllProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: ProductStatus.SELLING,
        limit: rowsPage,
        page: page,
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
  }, [refetchQueries, page, rowsPage]);

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
                <th className="px-1 py-4">Tên sản phẩm</th>
                <th className="px-1 py-4">Nhà bán</th>
                <th className="px-1 py-4">Danh mục</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Tồn kho</th>
                <th className="px-1 py-4">Giá bán</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: Product, index: number) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3">{product?.productCode}</td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-start gap-2">
                        <img
                          src={`${headerUrl}/products/${product.images[0]}`}
                          alt="product-image"
                          className="h-15 w-15 rounded-lg object-cover"
                        />
                        <div className="flex flex-col justify-start">
                          <div className="w-[160px] overflow-ellipsis break-words md:w-[200px]">
                            {product?.productName}
                          </div>
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
                      {product?.store?.name}
                    </td>
                    <td className="px-1 py-4 align-top">
                      <div className="flex flex-col gap-1">
                        {product?.category?.map((cate, index) => {
                          return <div key={index}>{cate?.title}</div>;
                        })}
                      </div>
                    </td>
                    <td className="px-1 py-4">
                      <MyStatus status={product?.status}></MyStatus>
                    </td>
                    <td className="px-1 py-4">{product?.inventoryNumber}</td>
                    <td className="px-1 py-4">
                      {product?.price ? (
                        formatCurrency(product?.price)
                      ) : (
                        <div className="flex flex-row items-center justify-center">
                          -
                        </div>
                      )}
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenDetailModal(product?.id)}
                          >
                            <DetailIcon />
                          </div>
                        </Tooltip>
                        <Tooltip title="Báo cáo vi phạm">
                          <div className="hover:cursor-pointer">
                            <HighlightOffRoundedIcon
                              sx={{ color: COLORS.support.c600, fontSize: 21 }}
                            />
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

export default SellingItemsTable;
