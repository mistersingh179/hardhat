const { loadPluginFile } = require("hardhat/plugins-testing");
loadPluginFile(__dirname + "/../../src/index");

module.exports = {
  networks: {
    withoutAccounts: {
      url: "http://localhost:8545",
      accounts: [],
    },
  },
  solidity: "0.5.1",
};