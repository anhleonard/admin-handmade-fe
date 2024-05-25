"use client";

import { headerUrl } from "@/apis/services/authentication";
import { getCategories } from "@/apis/services/categories";
import CategoryProductsList from "@/components/categories/category-products";
import CreateCategoryModal from "@/components/categories/create-category-modal";
import EditCategoryModal from "@/components/categories/edit-category-modal";
import DefaultLayout from "@/components/layouts/default-layout";
import CreateVariantCategoriesModal from "@/components/products/create-variant-categories";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Category } from "@/enum/defined-type";
import { DetailIcon, EditIcon } from "@/enum/icons";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import Button from "@/libs/button";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { openModal } from "@/redux/slices/modalSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ClassificationPage = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const getAllCategories = async () => {
    try {
      dispatch(openLoading());
      const res = await getCategories();
      setCategories(res.sort((a: any, b: any) => b.id - a.id));
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
    getAllCategories();
  }, [refetchQueries]);

  const handleOpenCreateModal = () => {
    const modal = {
      isOpen: true,
      title: "Tạo danh mục mới",
      content: <CreateCategoryModal handleRefetch={handleRefetch} />,
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
  };

  const handleOpenDetailModal = (category: Category) => {
    const modal = {
      isOpen: true,
      title: `Danh mục: ${category.title}`,
      content: <CategoryProductsList products={category.products} />,
      screen: SCREEN.LG,
    };
    dispatch(openModal(modal));
  };

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const handleOpenEditModal = async (category: Category) => {
    const modal = {
      isOpen: true,
      title: `Chỉnh sửa danh mục`,
      content: (
        <EditCategoryModal category={category} handleRefetch={handleRefetch} />
      ),
      screen: SCREEN.LG,
    };
    dispatch(openModal(modal));
  };

  return (
    <DefaultLayout>
      <div className="w-full space-y-4 rounded-lg bg-white px-8 py-4">
        <div className="mb-5 flex flex-col gap-3">
          <div className="text-lg font-bold text-grey-c900">
            Danh mục sản phẩm
          </div>
        </div>

        <Button
          className="!px-3 !text-xs"
          onClick={() => handleOpenCreateModal()}
        >
          Thêm phân loại
        </Button>

        {/* table */}
        <div className="max-w-[100%] overflow-hidden rounded-[10px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-auto text-left text-sm">
              <thead
                className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
              >
                <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                  <th className="py-4 pl-3">ID</th>
                  <th className="px-1 py-4">Tên danh mục</th>
                  <th className="px-1 py-4">Hình ảnh</th>
                  <th className="px-1 py-4">Mô tả</th>
                  <th className="px-1 py-4">Số lượng sản phẩm</th>
                  <th className="px-1 py-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category: Category, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-primary-c100 hover:text-grey-c700"
                    >
                      <td className="py-4 pl-3 align-top">{category?.id}</td>
                      <td className="px-1 py-4 align-top font-medium">
                        {category?.title}
                      </td>
                      <td className="px-1 py-4 align-top font-medium">
                        <img
                          src={`${headerUrl}/products/${category?.image}`}
                          alt="product-image"
                          className="h-18 w-18 rounded-lg object-cover"
                        />
                      </td>
                      <td className="max-w-[400px] px-1 py-4 align-top">
                        {category?.description}
                      </td>
                      <td className="px-1 py-4 text-center align-top">
                        {category?.products?.length}
                      </td>
                      <td className="px-1 py-4">
                        <div className="flex flex-row items-center justify-center gap-2">
                          <Tooltip title="Xem chi tiết">
                            <div
                              className="hover:cursor-pointer"
                              onClick={() => handleOpenDetailModal(category)}
                            >
                              <DetailIcon />
                            </div>
                          </Tooltip>
                          <Tooltip title="Chỉnh sửa">
                            <div
                              className="hover:cursor-pointer"
                              onClick={() => handleOpenEditModal(category)}
                            >
                              <EditIcon />
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
        {/* <MyPagination
          page={page}
          handlePageChange={handlePageChange}
          handleRowPerPageChange={handleRowPerPageChange}
          total={count}
          rowsPerPage={rowsPage}
        /> */}
      </div>
    </DefaultLayout>
  );
};

export default ClassificationPage;
