import { ethers } from "ethers";
import { API_URL } from "./constant";

// Dynamic domain setup
export function getDomain(chainId: number, relayerAddress: string) {
  return {
    name: "DegenLendRelayer",
    version: "1",
    chainId,
    verifyingContract: relayerAddress
  };
}

// fetch current nonce

export async function getCurrentNonce(userAddress: string) {
  const res = await fetch(`${API_URL}/api/account/currentNonce/${userAddress}`).then((response) => { return response.json()});
  let nonce = res.currentNonce;
  console.log(`[Console] got the on-chain nonce for account ${userAddress}.  The nonce is ${nonce}`);

  return nonce;
}

// Unified types matching your contract
const types = {
  MintIntent: [
    { name: "user", type: "address" },
    { name: "cToken", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ],
  RedeemIntent: [
    { name: "user", type: "address" },
    { name: "cToken", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ],
  BorrowIntent: [
    { name: "user", type: "address" },
    { name: "cToken", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ],
  RepayIntent: [
    { name: "user", type: "address" },
    { name: "cToken", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ]
};

// Generic signing function
async function signIntent(
  signer: ethers.Signer,
  domain: any,
  intentType: keyof typeof types,
  intentData: {
    user: string;
    cToken: string;
    amount: ethers.BigNumberish;
    nonce: number;
    deadline: number;
  }
): Promise<string> {
  return signer.signTypedData(domain, { [intentType]: types[intentType] }, intentData);
}

// Specific intent functions
export const signMintIntent = (
  signer: ethers.Signer,
  chainId: number,
  relayerAddress: string,
  intentData: {
    user: string;
    cToken: string;
    amount: ethers.BigNumberish;
    nonce: number;
    deadline: number;
  }
) => signIntent(signer, getDomain(chainId, relayerAddress), "MintIntent", intentData);

export const signRedeemIntent = (
  signer: ethers.Signer,
  chainId: number,
  relayerAddress: string,
  intentData: {
    user: string;
    cToken: string;
    amount: ethers.BigNumberish;
    nonce: number;
    deadline: number;
  }
) => signIntent(signer, getDomain(chainId, relayerAddress), "RedeemIntent", intentData);

export const signBorrowIntent = (
  signer: ethers.Signer,
  chainId: number,
  relayerAddress: string,
  intentData: {
    user: string;
    cToken: string;
    amount: ethers.BigNumberish;
    nonce: number;
    deadline: number;
  }
) => signIntent(signer, getDomain(chainId, relayerAddress), "BorrowIntent", intentData);

export const signRepayIntent = (
  signer: ethers.Signer,
  chainId: number,
  relayerAddress: string,
  intentData: {
    user: string;
    cToken: string;
    amount: ethers.BigNumberish;
    nonce: number;
    deadline: number;
  }
) => signIntent(signer, getDomain(chainId, relayerAddress), "RepayIntent", intentData);
