import { Inter } from "next/font/google";
import "../globals.css";
import estedadFont from "@/constants/localFonts";

//? import components
import Provider from "@/app/Providers";
import Header from "@/app/(subPages)/header";
const inter = Inter({ subsets: ["latin"] });

import { headers } from "next/headers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${estedadFont.variable} font-sans className="md:container md:max-w-[1440px] mx-auto`}
      >
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
