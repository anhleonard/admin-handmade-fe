import React, { useEffect, useState } from "react";
import MySelect, { Item } from "@/libs/select";
import { AlertStatus, Page, Role, rowsPerPage } from "@/enum/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import MyTextField from "@/libs/text-field";
import { DetailIcon, SearchIcon } from "@/enum/icons";
import { MyPagination } from "@/libs/pagination";
import { Avatar, Tooltip } from "@mui/material";
import { FontFamily, FontSize, SCREEN } from "@/enum/setting";
import MyLabel from "@/libs/label";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { adminFilterUsers } from "@/apis/services/users";
import { AlertState, User } from "@/enum/defined-type";
import { openAlert } from "@/redux/slices/alertSlice";
import { headerUrl } from "@/apis/services/authentication";
import BlockIcon from "@mui/icons-material/Block";
import { COLORS } from "@/enum/colors";
import { openModal } from "@/redux/slices/modalSlice";
import DetailUser from "@/components/users/detail-user";

const labelOptions = [
  { label: "Tên người dùng", value: "USER_NAME" },
  { label: "Số điện thoại", value: "PHONE_NUMBER" },
  { label: "Email", value: "EMAIL" },
];

const ListSellersTable = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(Page);
  const [rowsPage, setRowsPage] = useState(rowsPerPage);
  const [count, setCount] = useState(0);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [selectedOption, setSelectedOption] = useState<Item>(labelOptions[0]);
  const [searchText, setSearchText] = useState<string>("");

  const getAllUsers = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const query = {
        limit: rowsPage,
        page: page,
        role: Role.SELLER,
        ...(selectedOption === labelOptions[0] &&
          searchText !== "" && {
            userName: searchText,
          }),
        ...(selectedOption === labelOptions[1] &&
          searchText !== "" && {
            phoneNumber: searchText,
          }),
        ...(selectedOption === labelOptions[2] &&
          searchText !== "" && {
            email: searchText,
          }),
      };
      const res = await adminFilterUsers(token, query);
      if (res) {
        setCount(res?.total ?? 0);
        setUsers(res?.data);
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
    getAllUsers();
  }, [refetchQueries, page, rowsPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleRowPerPageChange = (e: any) => {
    setPage(Page);
    setRowsPage(parseInt(e.target.value));
  };

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const handleOpenDetailModal = (user: User) => {
    const modal = {
      isOpen: true,
      title: "Thông tin chi tiết",
      content: <DetailUser user={user} />,
      screen: SCREEN.BASE,
    };
    dispatch(openModal(modal));
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
                <th className="py-4 pl-3">Tên người bán</th>
                <th className="px-1 py-4">Cửa hàng</th>
                <th className="px-1 py-4">Số điện thoại</th>
                <th className="px-1 py-4">Email</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-primary-c100 hover:text-grey-c700"
                  >
                    <td className="py-4 pl-3">
                      <div className="flex flex-row items-center gap-3">
                        <Avatar
                          src={`${headerUrl}/products/${user?.avatar}`}
                          alt="seller-avatar"
                          style={{
                            width: 30,
                            height: 30,
                          }}
                        />
                        <div>{user?.name}</div>
                      </div>
                    </td>
                    <td className="px-1 py-4">
                      {user?.hasStore || user?.store?.name ? (
                        user?.store?.name
                      ) : (
                        <MyLabel type="error">Chưa có</MyLabel>
                      )}
                    </td>
                    <td className="px-1 py-4">{user?.phoneNumber}</td>
                    <td className="px-1 py-4">{user?.email}</td>
                    <td className="px-1 py-4">
                      <MyLabel type="success">Đang hoạt động</MyLabel>
                    </td>
                    <td className="px-1 py-4">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Tooltip title="Xem chi tiết">
                          <div
                            className="pt-1 hover:cursor-pointer"
                            onClick={() => handleOpenDetailModal(user)}
                          >
                            <DetailIcon />
                          </div>
                        </Tooltip>
                        {/* <Tooltip title="Chặn">
                          <div className="pt-1 hover:cursor-pointer">
                            <BlockIcon
                              style={{
                                color: COLORS.support.c500,
                                width: 20,
                                height: 20,
                              }}
                            />
                          </div>
                        </Tooltip> */}
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

export default ListSellersTable;
