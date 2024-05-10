import { COLORS } from "@/enum/colors";
import MyDisplayImage from "@/libs/display-image";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const ClientAddress = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border-[2px] border-primary-c300">
      <ListItem
        className={`${!open ? "rounded-2xl" : "rounded-tl-2xl rounded-tr-2xl"} bg-primary-c50`}
        disablePadding
      >
        <ListItemButton
          onClick={() => setOpen(!open)}
          className="flex flex-row justify-between px-4 py-3 hover:bg-transparent"
        >
          <div className="flex flex-row items-center gap-2">
            <HomeRoundedIcon
              sx={{ fontSize: 20, color: COLORS.primary.c900 }}
            />
            <div className="text-sm font-semibold text-primary-c900">
              Thông tin khách hàng
            </div>
          </div>
          {!open ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <List disablePadding className="flex flex-col gap-4 px-4 py-4">
          <ListItem className="block w-full" disablePadding>
            <div className="text-base font-bold uppercase text-grey-c900">
              TRAN THI ANH - 0394356433
            </div>
            <div className="text-sm font-normal text-grey-c900">
              No. 9, Lane 105, Doan Ke Thien Street, Phường Dịch Vọng Hậu, Quận
              Cầu Giấy, Thành phố Hà Nội , Việt Nam
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default ClientAddress;