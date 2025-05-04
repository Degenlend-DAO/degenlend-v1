import { ethers } from "ethers";

const domain = {
  name: "DegenLendRelayer",
  version: "1",
  chainId: 5, // Replace with actual chain ID
  verifyingContract: "0xRelayerContractAddress" // Replace with deployed relayer address
};

const types = {
    Order: [
        { name: "orderId", type: "string" },
        { name: "user", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "token", type: "address" },
        { name: "signature", type: "bytes" },
    ],
    "MintIntent": [
        { name: "user", type: "address" },
        { name: "amount", type: "uint" },
        { name: "nonce", type: "uint" },
        { name: "deadline", type: "uint" },
    ],
    RedeemIntent: [
        { name: "user", type: "address" },
        { name: "amount", type: "uint" },
        { name: "nonce", type: "uint" },
        { name: "deadline", type: "uint" },
        ],
    BorrowIntent: [
      { name: "user", type: "address" },
      { name: "amount", type: "uint" },
      { name: "nonce", type: "uint" },
      { name: "deadline", type: "uint" },
      { name: "interestRate", type: "uint" },
    ]
}

export async function signMintIntent(
    signer: ethers.Signer,
    mintIntent: {
        user: string;
        amount: string;
        nonce: number;
        deadline: number;
    }
    ): Promise<string> {
    const signature = await signer.signTypedData(domain, types.MintIntent, mintIntent);
    return signature;
    }

export async function signRedeemIntent(
    signer: ethers.Signer,
    redeemIntent: {
        user: string;
        amount: string;
        nonce: number;
        deadline: number;
    }
    ): Promise<string> {
    const signature = await signer.signTypedData(domain, types.RedeemIntent, redeemIntent);
    return signature;
}
export async function signBorrowIntent(
    signer: ethers.Signer,
    borrowIntent: {
        user: string;
        amount: string;
        nonce: number;
        deadline: number;
        interestRate: number;
    }
): Promise<string> {
    const signature = await signer.signTypedData(domain, types.BorrowIntent, borrowIntent);
    return signature;
}
export async function signRedeemIntent(
    signer: ethers.Signer,
    redeemIntent: {
        user: string;
        amount: string;
        nonce: number;