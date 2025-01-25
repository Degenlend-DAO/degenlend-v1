export const EMPTY_ADDRESS:string = "0x0000000000000000000000000000000000000000";
export const API_URL = "http://localhost:3001";

export const formatNumber = (number: number, decimals = 2) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };