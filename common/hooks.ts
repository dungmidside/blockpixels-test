import { useEffect, useState } from "react";
import { connectWallet, isAccountConnected } from "./utils";
import { ethers } from "ethers";
import { ErrorDescription } from "@ethersproject/abi/lib/interface";
import { Logger } from "ethers/lib/utils";
import { ErrorCode } from "@ethersproject/logger";

interface Wallet {
  balance?: string;
  address?: string;
}

export const useWallet = () => {
  const [initCheckLoading, setInitCheckLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [walletData, setWalletData] = useState<Wallet>();

  useEffect(() => {
    if (!window) {
      return;
    }

    (window as any).ethereum
      ?.request({ method: "eth_accounts" })
      .then((accounts: any) => {
        if (accounts && accounts.length > 0) {
          requestConnect();
        }
      })
      .finally(() => {
        setInitCheckLoading(false);
      });

    (window as any).ethereum?.on("accountsChanged", (accounts: any) => {
      if (accounts.length === 0) {
        setWalletData(undefined);
      }
    });
  }, []);

  const requestConnect = async () => {
    if (!!walletData) {
      return;
    }

    try {
      setIsLoading(true);
      const { signer } = await connectWallet();
      const [address, balance] = await Promise.all([
        signer.getAddress(),
        signer.getBalance(),
      ]);
      setWalletData({
        address,
        balance: ethers.utils.formatEther(balance),
      });
    } catch (err: any) {
      console.log(err);

      if (err.reason === "missing provider") {
        alert("Missing Metamask extension");
      } else {
        alert(
          `Fail to connect wallet with reason "${err.reason || err.message}"`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    requestConnect,
    isLoading,
    initCheckLoading,
    data: walletData,
  };
};
