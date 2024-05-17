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
import { FontFamily, FontSize } from "@/enum/setting";
import MyDatePicker from "@/libs/date-picker";
import MyLabel from "@/libs/label";
import { Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { COLORS } from "@/enum/colors";

const labelOptions = [
  { label: "Mã đơn hàng", value: "ORDER_CODE" },
  { label: "Tên khách hàng", value: "CLIENT_NAME" },
];

const TransportOrdersTable = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* filter */}
      <div className="flex flex-row items-end justify-between">
        <div className="flex flex-row items-center gap-1">
          <MySelect options={labelOptions} selected={labelOptions[0].value} />
          <MyTextField
            id="searchItem"
            endIcon={<SearchIcon />}
            placeholder="Nhập nội dung tìm kiếm"
            className="w-[300px]"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          <div>Ngày đặt hàng</div>
          <MyDatePicker id="" className="flex-1" />
        </div>
      </div>
      {/* table */}
      <div className="max-w-[100%] overflow-hidden rounded-[10px]">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-sm">
            <thead
              className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
            >
              <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                <th className="py-4 pl-3">Mã đơn hàng</th>
                <th className="px-1 py-4">Tên khách hàng</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Số lượng</th>
                <th className="px-1 py-4">Khách trả</th>
                <th className="px-1 py-4">Ngày đặt hàng</th>
                <th className="px-1 py-4">Dự kiến giao hàng</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-primary-c100 hover:text-grey-c700">
                <td className="py-4 pl-3">38BEE27</td>
                <td className="px-1 py-4">Anh Leonard</td>
                <td className="px-1 py-4">
                  <MyLabel type="delivery">Đang vận chuyển</MyLabel>
                </td>
                <td className="px-1 py-4">2</td>
                <td className="px-1 py-4">260.000</td>
                <td className="px-1 py-4">22:39 25/3/2024</td>
                <td className="px-1 py-4">22:42 01/04/2024</td>
                <td className="px-1 py-4">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Tooltip title="Xem chi tiết đơn hàng">
                      <div className="hover:cursor-pointer">
                        <DetailIcon />
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

export default TransportOrdersTable;
