import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import ConnectWallet from "@/components/ConnectWallet";
import NftScan from "@/components/NftScan";

enum Tab {
  WALLET = "Wallet Connect",
  NFT = "NFT Scan",
}

const Home: NextPage = () => {
  const [tab, setTab] = useState<Tab>(Tab.WALLET);

  return (
    <div className="">
      <Head>
        <title>BlockPixel test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <header className="text-center">
          <h1 className=" font-extrabold text-4xl">Blockpixels test</h1>
        </header>

        <div className="flex justify-center mt-10">
          <div className="tabs tabs-boxed">
            {[Tab.WALLET, Tab.NFT].map((tabItem) => (
              <a
                key={tabItem}
                className={`tab ${tabItem === tab ? "tab-active" : ""}`}
                onClick={() => setTab(tabItem)}
              >
                {tabItem}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {tab === Tab.WALLET && <ConnectWallet />}
          {tab === Tab.NFT && <NftScan />}
        </div>
      </main>
    </div>
  );
};

export default Home;
