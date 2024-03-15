import { TextColor, FontSize, FontFamily } from "@/enum/setting";
import { memo } from "react";

type Props = {
  children?: React.ReactNode;
  textColor?: TextColor;
  fontSize?: FontSize;
  fontFamily?: FontFamily;
  letterSpacing?: String;
  className?: String;
};

const Typography = function Typography({
  children,
  textColor = TextColor.GREY_900,
  fontSize = FontSize.BASE,
  fontFamily = FontFamily.NORMAL,
  letterSpacing = "tracking-normal",
  className = "",
}: Props) {
  return (
    <div
      className={`${textColor} ${fontSize} ${fontFamily} ${letterSpacing} ${className}`}
    >
      {children}
    </div>
  );
};

export default memo(Typography);
