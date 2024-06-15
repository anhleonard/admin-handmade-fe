import Image from "next/image";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const DropdownUser = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/signin");
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
            onClick={() => handleLogout()}
          >
            <ExitToAppRoundedIcon style={{ width: 27, height: 27 }} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default DropdownUser;
