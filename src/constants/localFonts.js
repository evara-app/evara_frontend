import LocalFont from "next/font/local";
const estedadFont = LocalFont({
  src: [
    {
      path: "../../public/assets/font/Estedad-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/font/Estedad-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/font/Estedad-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/font/Estedad-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/assets/font/Estedad-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/assets/font/Estedad-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-estedad",
  style: "normal",
  display: "block",
});

export default estedadFont;
