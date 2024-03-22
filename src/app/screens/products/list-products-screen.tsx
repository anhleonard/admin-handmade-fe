"use client";
import AllItemsTab from "@/app/orders/list-orders/all-items/page";
import { COLORS } from "@/enum/colors";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, TabProps } from "@mui/material";
import { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";

const labelOptions = [
  { label: "Tên sản phẩm", value: "ITEM_NAME" },
  { label: "Mã sản phẩm", value: "PRODUCT_NAME" },
];

type ListProductsProps = {
  children: ReactNode;
};

const ListProductsScreen = ({ children }: ListProductsProps) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const productTabs = [
    {
      label: "Tất cả",
      value: "1",
      content: <AllItemsTab />,
    },
    {
      label: "Đang bán",
      value: "2",
      content: <div>table 2</div>,
    },
    {
      label: "Hết hàng",
      value: "3",
      content: <div>table 3</div>,
    },
  ];

  return (
    <div className="w-full rounded-lg bg-white px-4 py-2">
      <div className="mb-5 flex flex-col gap-3">
        <div className="text-lg font-bold text-grey-c900">
          Danh sách sản phẩm
        </div>
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="product-screen-tabs"
                  sx={{}}
                  TabIndicatorProps={{
                    sx: {
                      backgroundColor: COLORS.primary.c900,
                      height: 2,
                    },
                  }}
                >
                  {productTabs.map((item) => {
                    return (
                      <Tab
                        label={item.label}
                        value={item.value}
                        sx={{
                          color: COLORS.grey.c900,
                          textTransform: "none",
                          fontSize: "14px",
                          "&.Mui-selected": {
                            color: COLORS.primary.c900,
                            borderBottomColor: "green",
                          },
                        }}
                      />
                    );
                  })}
                </TabList>
              </Box>
              {productTabs.map((item) => {
                return <TabPanel value={item.value}>{item.content}</TabPanel>;
              })}
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ListProductsScreen;
