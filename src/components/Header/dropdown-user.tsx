import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/enum/functions";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const DropdownUser = () => {
  const router = useRouter();
  const currentUser = getCurrentUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-semibold text-black dark:text-white">
            ADMIN
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/images/common-avatar.jpg"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
        </span>

        <KeyboardArrowDownRoundedIcon />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              href="/profile"
              className="hover:text-primary flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base"
            >
              Thông tin cá nhân
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-primary flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base"
            >
              Shop của tôi
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="hover:text-primary flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base"
            >
              Account Settings
            </Link>
          </li>
        </ul>
        <button className="hover:text-primary flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out lg:text-base">
          Đăng xuất
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
