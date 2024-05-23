import { SearchIcon } from "@/enum/icons";
import { FontFamily, FontSize } from "@/enum/setting";
import MyTextField from "@/libs/text-field";
import React from "react";

const ViolateStoresTable = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* filter */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <MyTextField
            id="searchItem"
            endIcon={<SearchIcon />}
            placeholder="Nhập tên cửa hàng"
            className="w-[300px]"
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
                <th className="py-4 pl-3">Tên</th>
                <th className="px-1 py-4">Chủ shop</th>
                <th className="px-1 py-4">Hàng chủ lực</th>
                <th className="px-1 py-4">Trạng thái</th>
                <th className="px-1 py-4">Lý do cấm</th>
                <th className="px-1 py-4 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViolateStoresTable;
