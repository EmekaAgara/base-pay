"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletAdvancedAddressDetails,
  WalletAdvancedTokenHoldings,
  WalletAdvancedTransactionActions,
  WalletAdvancedWalletActions,
} from "@coinbase/onchainkit/wallet";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn, signOut } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <div className="bg-black">
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-9 text-gray-200 mx-auto max-w-7xl">
        <h1
          className="cursor-pointer font-black text-2xl"
          onClick={() => router.push("/")}
        >
          BasePayy
        </h1>
        <div className="items-center gap-4 md:flex lg:gap-8 max-md:hidden">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-white transition">
            Shop
          </Link>
          <Link href="/" className="hover:text-white transition">
            About Us
          </Link>
          <Link href="/" className="hover:text-white transition">
            Contact
          </Link>

          {isSeller && (
            <button
              onClick={() => router.push("/dashboard")}
              className="hover:text-white transition"
            >
              My Dashboard
            </button>
          )}
        </div>

        <ul className="hidden md:flex items-center gap-4 ">
          {/* <Image
            className="w-4 h-4 invert"
            src={assets.search_icon}
            alt="search icon"
          /> */}
          {user ? (
            <>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8",
                    userButtonPopoverCard: "bg-gray-800 border-gray-700",
                    userButtonPopoverActionButtonText: "text-gray-200",
                    userButtonPopoverActionButtonIcon: "text-gray-400",
                    userButtonPopoverFooter: "bg-gray-800 border-t-gray-700",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Cart"
                    labelIcon={<CartIcon className="text-gray-200" />}
                    onClick={() => router.push("/cart")}
                  />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={<BagIcon className="text-gray-200" />}
                    onClick={() => router.push("/my-orders")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Image
                src={assets.user_icon}
                alt="user icon"
                className="invert"
              />
              Login
            </button>
          )}
        </ul>

        <div className="flex z-10 items-center md:hidden gap-3">
          <div className="flex items-center md:hidden gap-3">
            {user ? (
              <>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-8 w-8",
                      userButtonPopoverCard: "bg-gray-800 border-gray-700",
                      userButtonPopoverActionButtonText: "text-gray-200",
                      userButtonPopoverActionButtonIcon: "text-gray-400",
                      userButtonPopoverFooter: "bg-gray-800 border-t-gray-700",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Home"
                      labelIcon={<HomeIcon className="text-gray-200" />}
                      onClick={() => router.push("/")}
                    />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Products"
                      labelIcon={<BoxIcon className="text-gray-200" />}
                      onClick={() => router.push("/all-products")}
                    />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Cart"
                      labelIcon={<CartIcon className="text-gray-200" />}
                      onClick={() => router.push("/cart")}
                    />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="My Orders"
                      labelIcon={<BagIcon className="text-gray-200" />}
                      onClick={() => router.push("/my-orders")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </>
            ) : (
              <button
                onClick={openSignIn}
                className="flex items-center gap-2 hover:text-white transition"
              >
                {/* <Image
                  src={assets.user_icon}
                  alt="user icon"
                  className="invert"
                /> */}
                Login
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <Wallet>
              <ConnectWallet className="bg-gray" />
              <WalletDropdown>
                <WalletAdvancedWalletActions />
                <WalletAdvancedAddressDetails />
                <WalletAdvancedTransactionActions />
                <WalletAdvancedTokenHoldings />
              </WalletDropdown>
            </Wallet>
            {/* <FundButton /> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
