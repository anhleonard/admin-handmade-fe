"use client";
import { COLORS } from "@/enum/colors";
import { productTabs } from "@/enum/constants";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";

const ListProductsScreen = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
                return (
                  <TabPanel value={item.value}>
                    <div className="my-8">{item.content}</div>
                  </TabPanel>
                );
              })}
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ListProductsScreen;
