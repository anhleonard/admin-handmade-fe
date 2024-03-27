import {
  DeleteIcon,
  DetailIcon,
  EditIcon,
  OffIcon,
  SearchIcon,
} from "@/enum/icons";
import MyTextField from "@/libs/text-field";
import MySelect from "@/libs/select";
import { Tooltip } from "@mui/material";
import { FontFamily, FontSize } from "@/enum/setting";
import MyLabel from "@/libs/label";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { COLORS } from "@/enum/colors";

const labelOptions = [
  { label: "Tên voucher", value: "VOUCHER_NAME" },
  { label: "Mã voucher", value: "VOUCHER_CODE" },
];

const FinishedVouchersTable = () => {
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
        <div className="pr-1 text-base">
          Tổng: <span className="font-bold text-primary-c900">124 </span>
          Vouchers
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
                <th className="py-4 pl-3">Tên voucher</th>
                <th className="px-1 py-4">Mã voucher</th>
                <th className="px-1 py-4">Sản phẩm áp dụng</th>
                <th className="px-1 py-4">Giảm giá</th>
                <th className="px-1 py-4">
                  <Tooltip title="Tổng số lượt sử dụng voucher">
                    <div>Tổng số</div>
                  </Tooltip>
                </th>
                <th className="px-1 py-4">Ngày tạo</th>
                <th className="px-1 py-4">
                  <Tooltip title="Voucher đã kết thúc vào ngày">
                    <div>Kết thúc</div>
                  </Tooltip>
                </th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {/* item 1 */}
              <tr className="hover:bg-primary-c100 hover:text-grey-c700">
                <td className="py-4 pl-3">
                  <div className="max-w-[200px]">
                    Voucher giảm 59K cho đơn hàng từ 500K
                  </div>
                </td>
                <td className="px-1 py-4">38BEE27</td>
                <td className="px-1 py-4">Tất số 9 sản phẩm</td>
                <td className="px-1 py-4">59.000</td>
                <td className="px-1 py-4">500</td>
                <td className="px-1 py-4">23:59 26/03/2024</td>
                <td className="px-1 py-4">
                  <MyLabel type="error">23:59 26/03/2024</MyLabel>
                </td>
                <td className="px-1 py-4">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Tooltip title="Xem chi tiết">
                      <div className="pt-1 hover:cursor-pointer">
                        <DetailIcon />
                      </div>
                    </Tooltip>
                    <Tooltip title="Mở lại voucher">
                      <div className="hover:cursor-pointer">
                        <LockOpenIcon
                          sx={{ fontSize: 22, color: COLORS.blue.c900 }}
                        />
                      </div>
                    </Tooltip>
                    <Tooltip title="Hủy voucher">
                      <div className="hover:cursor-pointer">
                        <DeleteIcon />
                      </div>
                    </Tooltip>
                  </div>
                </td>
              </tr>

              {/* item 2 */}
              <tr className="hover:bg-primary-c100 hover:text-grey-c700">
                <td className="py-4 pl-3">
                  <div className="max-w-[200px]">
                    Voucher giảm 59K cho đơn hàng từ 500K
                  </div>
                </td>
                <td className="px-1 py-4">38BEE27</td>
                <td className="px-1 py-4">Tất số 9 sản phẩm</td>
                <td className="px-1 py-4">59.000</td>
                <td className="px-1 py-4">500</td>
                <td className="px-1 py-4">23:59 26/03/2024</td>
                <td className="px-1 py-4">
                  <MyLabel type="error">23:59 26/03/2024</MyLabel>
                </td>
                <td className="px-1 py-4">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Tooltip title="Xem chi tiết">
                      <div className="pt-1 hover:cursor-pointer">
                        <DetailIcon />
                      </div>
                    </Tooltip>
                    <Tooltip title="Hủy voucher">
                      <div className="hover:cursor-pointer">
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

export default FinishedVouchersTable;
