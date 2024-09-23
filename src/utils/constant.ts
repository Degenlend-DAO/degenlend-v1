export const EMPTY_ADDRESS:string = "0x0000000000000000000000000000000000000000";

export const formatNumber = (number: number, decimals = 6) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };