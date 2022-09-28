/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import clsx from "clsx";
import { AddressNftData } from "common/types";
import React, { useState } from "react";

const axiosInstance = axios.create({
  headers: {
    accept: "application/json",
    "X-API-Key":
      "NdxBLamiWhc7JdtfUqnhSHDBrD6PlrimTinGXd2uVeyuFPq8bBM4oVNpPG5rvG2t",
  },
});

const getImgUrl = (metadata: string) => {
  try {
    const orgUrl = JSON.parse(metadata).image as string;
    if (["https://ipfs.io"].some((checkUrl) => orgUrl.includes(checkUrl))) {
      return orgUrl;
    }
    if (!orgUrl.includes("ipfs/")) {
      return "";
    }

    const ipfsUrl = orgUrl.slice(orgUrl.indexOf("ipfs/"));
    if (ipfsUrl.length < 5) {
      return "";
    }

    return `https://ipfs.io/${ipfsUrl}`;
  } catch (err) {
    return "";
  }
};

const NftScan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AddressNftData[]>();

  const inputRef = React.createRef<HTMLInputElement>();

  const onGetData = async (address: string) => {
    if (!address) {
      return;
    }

    try {
      setIsLoading(true);
      const result = await axiosInstance.get<{ result: AddressNftData[] }>(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`
      );
      setData(
        (result.data.result || []).map((item) => ({
          ...item,
          imageUrl: getImgUrl(item.metadata),
        }))
      );
    } catch (err) {
      alert("Failed to get NFT data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="text-sm mb-3 italic">
        Example address: 0x495f947276749Ce646f68AC8c248420045cb7b5e
      </div>

      <div className="flex justify-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Address"
          className="input input-bordered w-full max-w-xl"
        />
        <button
          className={clsx("btn btn-primary ml-6 w-55")}
          onClick={() => onGetData(inputRef.current?.value || "")}
        >
          GET
        </button>
      </div>

      {!isLoading && (
        <div className="flex gap-10  mt-3 items-end">
          {!!data && (
            <h2>
              Found{" "}
              <span className="text-red-500 font-bold">{data.length}</span>{" "}
              tokens
            </h2>
          )}
        </div>
      )}

      <div className="mt-10">
        {isLoading ? (
          <div className="text-center">
            <progress className="progress w-56 mx-auto"></progress>
          </div>
        ) : (
          <div className="grid grid-cols-2 w-full gap-6">
            {(data || []).map((item, index) => (
              <div
                key={item.token_id}
                className="card card-compact bg-base-500 shadow-xl"
              >
                <figure>
                  <img
                    src={item.imageUrl || "./no-image.png"}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title block text-ellipsis whitespace-nowrap overflow-hidden">
                    {item.name}
                  </h2>
                  <div className="block text-ellipsis whitespace-nowrap overflow-hidden">
                    {item.token_id}
                  </div>
                  <div className="card-actions justify-end mt-3">
                    <button className="btn btn-primary">
                      <a
                        href={`https://etherscan.io/nft/${item.token_address}/${item.token_id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View NFT
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NftScan;
