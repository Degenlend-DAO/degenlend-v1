export const EMPTY_ADDRESS:string = "0x0000000000000000000000000000000000000000";
export const BACKUP_API_URL = "https://degenlend-api-production.up.railway.app";
export const API_URL="https://degenlend-api.onrender.com"
export const ORACLE_URL = "https://sports-oracle-api.onrender.com";
export const DEGEN_TOKENS_DECIMALS = 8;

export const formatNumber = (number: number, decimals = 2) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };
