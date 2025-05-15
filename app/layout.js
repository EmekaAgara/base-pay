import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import "@coinbase/onchainkit/styles.css";
import { Providers } from "@/context/CryptoProvider";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "QuickCart",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <ClerkProvider>
        <html lang="en">
          <body
            className={`${outfit.className} antialiased  bg-black text-gray-700`}
          >
            <Toaster />
            <AppContextProvider>{children}</AppContextProvider>
          </body>
        </html>
      </ClerkProvider>
    </Providers>
  );
}
