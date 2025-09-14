// 0x5FbDB2315678afecb367f032d93F642f64180aa3
//这段代码定义了一个与区块链智能合约交互所需的基本配置，主要包括合约地址和合约的 ABI（应用二进制接口）
import chatAppJSON from "../artifacts/contracts/ChatApp.sol/ChatApp.json";

export const ChatAppAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const ChatAppABI = chatAppJSON.abi;