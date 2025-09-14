// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

/*
这段代码是一个基于 Hardhat Ignition 的模块化脚本，用于部署一个名为 Lock 的智
能合约。Hardhat 是一个流行的以太坊开发环境，而 Ignition 是其模块化部署工具，
允许开发者以声明式的方式定义和部署合约。
*/
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});
