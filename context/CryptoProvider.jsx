"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
// import { baseSepolia } from "wagmi/chains"; // add baseSepolia for testing
import { base } from "wagmi/chains"; // add baseSepolia for testing

export function Providers(props) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      // chain={baseSepolia} // add baseSepolia for testing
      chain={base} // add baseSepolia for testing
      config={{
        appearance: {
          name: "Basepay App",
          logo: "/crypto1.jpg",
        },
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}
