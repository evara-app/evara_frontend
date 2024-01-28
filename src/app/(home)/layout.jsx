import { Inter } from "next/font/google";
import "../globals.css";
import estedadFont from "@/constants/localFonts";

//? import components
import Header from "@/app/(home)/header";
import Provider from "@/app/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${estedadFont.variable} font-sans`}
      >
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
