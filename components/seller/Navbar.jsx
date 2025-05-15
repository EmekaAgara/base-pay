"use client";
import React from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletAdvancedAddressDetails,
  WalletAdvancedTokenHoldings,
  WalletAdvancedTransactionActions,
  WalletAdvancedWalletActions,
} from "@coinbase/onchainkit/wallet";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn, signOut } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center max-w-7xl px-4 md:px-8 py-3 justify-between border-b border-gray-800">
      <h1
        className="cursor-pointer text-white font-black text-2xl"
        onClick={() => router.push("/")}
      >
        BasePayy
      </h1>
      <div className="flex z-10 items-center md:hidden gap-3">
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
      {/* <button className="bg-gray-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded text-xs sm:text-sm">
        Logout
      </button> */}
    </div>
  );
};

export default Navbar;
