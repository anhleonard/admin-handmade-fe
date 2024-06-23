import Image from "next/image";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";

const DropdownUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/signin");
    dispatch(closeConfirm());
  };

  const handleOpenConfirm = () => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN ĐĂNG XUẤT",
      message: "Bạn có chắc chắn đăng xuất không?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => handleLogout(),
    };

    dispatch(openConfirm(confirm));
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <span className="h-10 w-10 rounded-full">
          <Image
            width={100}
            height={100}
            src={"/images/common-avatar.jpg"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
        </span>
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-semibold text-black dark:text-white">
            ADMIN
          </span>
        </span>
        <Tooltip title="Đăng xuất">
          <div
            className="cursor-pointer text-grey-c600"
            onClick={() => handleOpenConfirm()}
          >
            <ExitToAppRoundedIcon style={{ width: 27, height: 27 }} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default DropdownUser;
