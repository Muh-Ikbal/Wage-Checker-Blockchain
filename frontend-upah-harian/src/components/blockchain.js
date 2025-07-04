// src/blockchain.js
import { BrowserProvider, Contract, JsonRpcProvider } from "ethers";
import abi from "../../../blockchain/build/contracts/WageRecorder.json";

const contractAddress = "0xA5203B0ABA8C4DfDb945A49739D49bd58188e71a";

const getReadProvider = () => new BrowserProvider(window.ethereum);
const getReadProviderUser = () => new JsonRpcProvider("http://127.0.0.1:7545");


// Untuk kontrak hanya membaca
export const getReadContract = async () => {
  const provider = await getReadProvider();
  return new Contract(contractAddress, abi.abi, provider);
};

// Untuk kontrak user hanya membaca
export const getReadContractUser = async () => {
  const provider = await getReadProviderUser();
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
  const contract = await getReadContractUser();
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
