import {ethers} from "ethers";
import web3Modal from "web3modal";

import { ChatAppAddress,ChatAppABI } from "../Context/constants";

//1. 检查钱包是否已连接
export const ChechIfWalletConnected = async () => {
    try {
        if (!window.ethereum) return console.log("Install MetaMask");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {   
        console.log(error);
    }
};

//2. 主动连接钱包
export const connectWallet =  async () => {
    try {
        if (!window.ethereum) return console.log("Install MetaMask");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};

//3. 获取合约实例
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

//4. 连接合约（优先使用 window.ethereum + ethers v6 BrowserProvider；失败时回退 web3modal；失败抛错）
export const connectingWithContract = async () => {
    try {
        // 优先使用 window.ethereum
        if (typeof window !== "undefined" && window.ethereum) {
            const ethereum = window.ethereum;
            try {
                const accounts = await ethereum.request({ method: "eth_accounts" });
                if (!accounts || accounts.length === 0) {
                    await ethereum.request({ method: "eth_requestAccounts" });
                }
            } catch (_) {
                // 忽略 eth_accounts 失败，尝试请求授权
                await ethereum.request({ method: "eth_requestAccounts" });
            }

            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);
            return contract;
        }

        // 回退到 web3modal（如无 window.ethereum 或特殊钱包）
        const w3m = new web3Modal();
        const connection = await w3m.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("connectingWithContract failed:", error);
        throw error; // 关键：抛错，避免调用处拿到 undefined
    }
};

//5. 时间转换函数，把区块链上的时间戳转换成正常时间
export const convertTime = (time) => {
    const newTime = new Date(Number(time) * 1000);
    const realTime =
        newTime.getHours() +
        ":" +
        String(newTime.getMinutes()).padStart(2, "0") +
        ":" +
        String(newTime.getSeconds()).padStart(2, "0") +
        " Date: " +
        String(newTime.getDate()).padStart(2, "0") +
        "/" +
        String(newTime.getMonth() + 1).padStart(2, "0") +
        "/" +
        newTime.getFullYear();

    return realTime;
};