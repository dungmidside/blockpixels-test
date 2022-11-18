import React from "react";
import { useWallet } from "../common/hooks";
import clsx from "clsx";

const ConnectWallet = () => {
  const { requestConnect, data, isLoading, initCheckLoading } = useWallet();

  
  if (initCheckLoading) {
    return <div className="text-center"><progress className="progress w-56 mx-auto"></progress></div>
  }
  return (
    <div className="text-center">
      <button
        className={clsx("btn", data && "btn-primary", isLoading && "loading")}
        onClick={requestConnect}
      >
        {!data ? "Connect Metamask Wallet" : "Wallet Connected"}
      </button>

      {data && (
        <div className="mt-10">
          <div>
            <div>
              <div className="text-2xl font-bold">Address</div>
              <div className="text-xl mt-3">{data?.address}</div>
            </div>
            <div className="mt-6">
              <div className="text-2xl font-bold">Balance</div>
              <div className="text-xl mt-3">{data?.balance} ETH</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
