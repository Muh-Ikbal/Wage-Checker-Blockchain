// src/blockchain.js
import { BrowserProvider, Contract } from "ethers";
import abi from "../../../blockchain/build/contracts/WageRecorder.json";

const contractAddress = "0xC1eD3fB786041c894F6F2574358e61Bfc1F622a3";

const getReadProvider = () => new BrowserProvider(window.ethereum);

// Untuk kontrak hanya membaca
export const getReadContract = async () => {
  const provider = await getReadProvider();
  return new Contract(contractAddress, abi.abi, provider);
};

// Untuk kontrak dengan hak menulis (dengan signer)
export const getWriteContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask tidak terdeteksi");
  const provider = await getReadProvider();
  const signer = await provider.getSigner();
  return new Contract(contractAddress, abi.abi, signer);
};

export const getAllWages = async () => {
  const contract = await getReadContract();
  const count = await contract.getWagesCount();
  const wages = [];
  for (let i = 0; i < count; i++) {
    const data = await contract.getWage(i);
    wages.push({
      worker_id: data[0],
      name :data[1],
      amount: data[2].toString(),
      date: data[3],
      by: data[4],
      timestamp: data[5].toString(),
    });
  }
  return wages;
};

export const addWage = async (workerId,name, amount, date) => {
  const contract = await getWriteContract();
  const tx = await contract.logWage(workerId,name, amount, date);
  await tx.wait(); // tunggu transaksi dikonfirmasi
};
