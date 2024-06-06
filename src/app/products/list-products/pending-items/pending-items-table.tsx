"use client";
import {
  AlertStatus,
  Page,
  ProductStatus,
  rowsPerPage,
} from "@/enum/constants";
import { DetailIcon, SearchIcon } from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect, { Item } from "@/libs/select";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { Tooltip } from "@mui/material";
import DetailProductModal from "../../modals/detail-product-modal";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { adminApproveProduct, adminProducts } from "@/apis/services/product";
import storage from "@/apis/storage";
import { AlertState, Category, Product } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/enum/functions";
import { headerUrl } from "@/apis/services/authentication";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import { COLORS } from "@/enum/colors";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import RejectProductModal from "@/components/products/reject-product-modal";
import MyStatus from "@/libs/status";
import { MyPagination } from "@/libs/pagination";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

const PendingItemsTable = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [selectedOption, setSelectedOption] = useState<Item>(labelOptions[0]);
  const [searchText, setSearchText] = useState<string>("");

  const handleOpenDetailModal = (productId: number) => {
    const modal = {
      isOpen: true,
      title: "Chi tiết sản phẩm",
      content: (
        <DetailProductModal
          type={ProductStatus.PENDING}
          productId={productId}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleOpenRejectModal = (productId: number) => {
    const modal = {
      isOpen: true,
      title: "Nêu lý do từ chối",
      content: (
        <RejectProductModal
          productId={productId}
          handleRefetch={handleRefetch}
        />
      ),
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleApproveProduct = (id: number) => {
    const confirm: any = {
      isOpen: true,
      title: "DUYỆT SẢN PHẨM",
      message: "Bạn có chắc chắn duyệt sản phẩm này không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: async () => {
        try {
          dispatch(openLoading());
          const token = storage.getLocalAccessToken();
          const variables = {
            isAccepted: true,
          };
          const res = await adminApproveProduct(id, variables, token);
          if (res) {
            dispatch(closeConfirm());
            let alert: AlertState = {
              isOpen: true,
              title: "THÀNH CÔNG",
              message: "Sản phẩm đã được duyệt thành công!",
              type: AlertStatus.SUCCESS,
            };
            dispatch(openAlert(alert));
            dispatch(refetchComponent());
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
      },
    };

    dispatch(openConfirm(confirm));
  };

  // get all pending products by seller token
  const getAllProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        status: ProductStatus.PENDING,
        limit: rowsPage,
        page: page,
        ...(selectedOption === labelOptions[0] &&
          searchText !== "" && {
            productName: searchText,
          }),
        ...(selectedOption === labelOptions[1] &&
          searchText !== "" && {
            productCode: searchText,
          }),
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

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

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
          <MySelect
            options={labelOptions}
            selected={selectedOption.value}
            onSelectItem={(item: Item) => setSelectedOption(item)}
          />
          <form
            className="flex-1 text-slate-900 dark:text-slate-100"
            onSubmit={(e) => {
              setPage(1);
              handleRefetch();
              e.preventDefault();
            }}
          >
            <MyTextField
              id="searchItem"
              endIcon={<SearchIcon />}
              placeholder="Nhập nội dung tìm kiếm"
              className="w-[300px]"
              onChange={(event) => setSearchText(event.target.value)}
            />
          </form>
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
                <th className="px-1 py-4">Nhà bán</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Danh mục</th>
                <th className="px-1 py-4">Tồn kho</th>
                <th className="px-1 py-4">Giá bán</th>
                <th className="px-1 py-4">Ngày tạo</th>
                <th className="px-1 py-4">Thời hạn duyệt</th>
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
                    <td className="py-4 pl-3">{product.productCode}</td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-start gap-2">
                        <img
                          src={`${headerUrl}/products/${product.images[0]}`}
                          alt="product-image"
                          className="h-15 w-15 rounded-lg object-cover"
                        />
                        <div className="flex flex-col justify-start">
                          <div className="max-w-[100px] overflow-ellipsis break-words">
                            {product.productName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-4 align-top">
                      {product.store.name}
                    </td>
                    <td className="px-1 py-4 align-top">
                      <MyStatus status={product?.status}></MyStatus>
                    </td>
                    <td className="px-1 py-4 align-top">
                      <div className="flex flex-col items-start justify-start gap-1">
                        {product.category?.map(
                          (cate: Category, index: number) => {
                            return <div key={index}>{cate?.title}</div>;
                          },
                        )}
                      </div>
                    </td>
                    <td className="px-1 py-4">{product.inventoryNumber}</td>
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
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="px-1 py-4">
                      {product?.createdAt ? (
                        formatDate(
                          new Date(
                            new Date(product.createdAt).getTime() +
                              7 * 24 * 60 * 60 * 1000,
                          ),
                        )
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
                        <Tooltip title="Phê duyệt">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleApproveProduct(product?.id)}
                          >
                            <CheckCircleOutlineRoundedIcon
                              sx={{ color: COLORS.purple.c800, fontSize: 20 }}
                            />
                          </div>
                        </Tooltip>
                        <Tooltip title="Từ chối">
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenRejectModal(product?.id)}
                          >
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

export default PendingItemsTable;
