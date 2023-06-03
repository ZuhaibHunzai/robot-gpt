import { ethers } from "ethers";

export const getContractInstance = (address, abi, provider) => {
  return new ethers.Contract(address, abi, provider);
};
