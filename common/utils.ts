import { ethers } from "ethers";

export const connectWallet = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  return {
    provider,
    signer,
  };
};

export const isAccountConnected = async () => await (window as any).ethereum?.request({method: 'eth_accounts'}).length > 0;