import { ReactNode } from "react";

interface MyIconProps {
  children: ReactNode;
  width?: number;
  height?: number;
}

const MyIcon: React.FC<MyIconProps> = ({ children, width = 6, height = 6 }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-${height} w-${width}`}
    >
      {children}
    </svg>
  );
};

export default MyIcon;
