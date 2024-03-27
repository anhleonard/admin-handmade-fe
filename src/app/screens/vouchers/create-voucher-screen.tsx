import {
  applicableProductTypes,
  discountTypes,
  minOrderTypes,
} from "@/enum/constants";
import { FontFamily, FontSize } from "@/enum/setting";
import MyDatePicker from "@/libs/date-picker";
import MyRadioGroup from "@/libs/radio-group";
import MyTextField from "@/libs/text-field";
import Image from "next/image";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

const CreateVoucherScreen = () => {
  const [discountType, setDiscountType] = useState(discountTypes[0].value);
  const [minOrderType, setMinOrderType] = useState(minOrderTypes[0].value);
  const [productType, setProductType] = useState(
    applicableProductTypes[0].value,
  );

  const [isCheckedItem, setIsCheckedItem] = useState(false);

  return (
    <div className="w-full rounded-lg bg-white px-4 py-2">
      <div className="mb-4 flex flex-col gap-3">
        <div className="border-b-2 border-dashed border-grey-c50 pb-2 text-lg font-bold text-grey-c900">
          Tạo voucher mới
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold">1. Thông tin chung</div>
          <div className="flex flex-row items-center gap-8">
            <MyTextField
              id="voucherName"
              title="Tên voucher"
              placeholder="Nhập tên voucher"
            />
            <MyTextField
              id="voucherCode"
              title="Mã voucher"
              placeholder="Nhập mã voucher"
            />
          </div>
          <div className="flex flex-row items-center gap-8">
            <MyDatePicker
              label="Ngày bắt đầu"
              placeholder="-- Lựa chọn --"
              isRequired
              className="w-full"
            />
            <MyDatePicker
              label="Ngày kết thúc"
              placeholder="-- Lựa chọn --"
              isRequired
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold">2. Điều kiện áp dụng</div>
          <div className="flex flex-col gap-4">
            <MyRadioGroup
              label="Loại giảm giá"
              isRequired
              options={discountTypes}
              selectedIndex={discountTypes[0].index}
              onChanged={(item) => {
                if (item.value === "MONEY")
                  setDiscountType(discountTypes[0].value);
                else if (item.value === "PERCENTAGE")
                  setDiscountType(discountTypes[1].value);
              }}
            />
            {discountType == discountTypes[0].value && (
              <MyTextField
                type="number"
                id="moneyDiscount"
                title="Lượng tiền giảm"
                placeholder="Nhập số lượng tiền giảm (Min: 5.000 - Max: 30.000.000)"
                minNumber={5000}
                maxNumber={30000000}
              />
            )}
            {discountType == discountTypes[1].value && (
              <MyTextField
                type="number"
                id="percentageDiscount"
                title="Phần trăm giảm"
                placeholder="Nhập số lượng % giảm (Min: 2% - Max: 99%)"
                minNumber={2}
                maxNumber={99}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <MyRadioGroup
              label="Giá trị đơn hàng tối thiểu"
              isRequired
              options={minOrderTypes}
              selectedIndex={minOrderTypes[0].index}
              onChanged={(item) => {
                if (item.value === "UNLIMITED_VALUE")
                  setMinOrderType(minOrderTypes[0].value);
                else if (item.value === "CUSTOM_VALUE")
                  setMinOrderType(minOrderTypes[1].value);
              }}
            />
            {minOrderType == minOrderTypes[1].value && (
              <MyTextField
                type="number"
                id="minOrderValue"
                title="Giá trị đơn hàng tối thiểu"
                placeholder="Nhập giá trị đơn hàng tối thiểu"
                minNumber={1}
              />
            )}
          </div>
          <MyTextField
            type="number"
            id="numbersOfDiscount"
            title="Số lượt sử dụng voucher"
            placeholder="Nhập số lượt sử dụng voucher"
            minNumber={1}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold">3. Sản phẩm áp dụng</div>
          <MyRadioGroup
            options={applicableProductTypes}
            selectedIndex={applicableProductTypes[0].index}
            onChanged={(item) => {
              if (item.value === "ALL_ITEMS")
                setMinOrderType(applicableProductTypes[0].value);
              else if (item.value === "CUSTOM_ITEMS")
                setMinOrderType(applicableProductTypes[1].value);
            }}
          />
          {/* table */}
          <div className="max-w-[100%] overflow-hidden rounded-[10px]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] table-auto text-left text-sm">
                <thead
                  className={`bg-primary-c200 uppercase text-grey-c700 ${FontFamily.BOLD} ${FontSize.BASE}`}
                >
                  <tr className="hover:bg-secondary-c100 hover:text-grey-c700">
                    <th className="py-4 pl-3">Tên sản phẩm</th>
                    <th className="px-1 py-4">Tồn kho</th>
                    <th className="px-1 py-4">Giá hiện tại</th>
                    <th className="px-1 py-4">Giá sau giảm</th>
                    <th className="px-1 py-4 text-center">Lựa chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {/* item 1 */}
                  <tr className="hover:bg-primary-c100 hover:text-grey-c700">
                    <td className="py-4 pl-3">
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
                          <div className="max-w-[160px] overflow-ellipsis break-words md:max-w-[180px]">
                            Thiết bị tivi giải trí xách tay LG StanbyME Go 27
                            inch
                          </div>
                          s{" "}
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-4">300</td>
                    <td className="px-1 py-4">250000</td>
                    <td className="px-1 py-4">210.000</td>
                    <td className="px-1 py-4">
                      <Checkbox
                        aria-label="select-item"
                        checked={isCheckedItem}
                        onChange={() => setIsCheckedItem(!isCheckedItem)}
                        sx={{
                          color: "green",
                          "&.Mui-checked": "orange",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVoucherScreen;
