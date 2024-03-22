"use client";
import ListProductsScreen from "@/app/screens/products/list-products-screen";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { COLORS } from "@/enum/colors";
import { FontSize } from "@/enum/setting";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  TextField,
  Typography,
  ButtonBase,
  Box,
  Tab,
  Button,
  withStyles,
  styled,
  Tabs,
} from "@mui/material";
import { useState } from "react";

const DraftItemsTab = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <DefaultLayout>
      <ListProductsScreen>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="secondary tabs example"
                sx={{}}
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: COLORS.primary.c900,
                    height: 2,
                  },
                }}
              >
                <Tab
                  label="Tất cả"
                  value="1"
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
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </ListProductsScreen>
    </DefaultLayout>
  );
};

export default DraftItemsTab;
