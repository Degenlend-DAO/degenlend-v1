import sxTokenLogo from "../assets/img/sx_coin_token.png";
import usdcTokenLogo from "../assets/img/usdc_coin_token.png";

type TokenType = "sx" | "usdc"

interface TokenDetails {
    logo: string;
    text: string;
}

const tokenDetails: Record<TokenType, TokenDetails> = {
    sx: { logo: sxTokenLogo, text: "Wrapped SX" },
    usdc: { logo: usdcTokenLogo, text: "USDC" },
}

export function getTokenDetails(type: string): TokenDetails | undefined {
    const tokenType = type.toLowerCase() as TokenType;
    return tokenDetails[tokenType]
}