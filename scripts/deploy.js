/**这段脚本是一个 Hardhat 部署脚本（通常放在
 *  scripts/deploy.js），用来把智能合约部署到区块链上。 */
const hre = require("hardhat");

async function main() {
  // 获取部署账户
  const [deployer] = await hre.ethers.getSigners();
  const balance = await hre.ethers.provider.getBalance(deployer.address);

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // 获取 ChatApp 合约工厂
  const ChatApp = await hre.ethers.getContractFactory("ChatApp");

  // 部署合约
  const chatApp = await ChatApp.deploy();

  // 等待交易确认
  await chatApp.waitForDeployment();

  console.log("Contract deployed to:", chatApp.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});