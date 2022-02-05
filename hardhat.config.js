require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const infuraProjectId = process.env.INFURA_PROJECT_ID
const moralisPId = process.env.MORALIS_PROJECT_ID
const pKey = process.env.EDGY_META_PKEY
module.exports = {
    networks: {
        hardhat: {
            chainId: 1337
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${infuraProjectId}`,
            accounts: [pKey]
        },
        polymainnet: {
            url: `https://polygon-mainnet.infura.io/v3/${infuraProjectId}`,
            accounts: [pKey]
        },
        bsctestnet: {
            url: `https://speedy-nodes-nyc.moralis.io/${moralisPId}/bsc/testnet`,
            accounts: [pKey]
        },
        bscmainnet: {
            url: `https://speedy-nodes-nyc.moralis.io/${moralisPId}/bsc/mainnet`,
            accounts: [pKey]
        }
    },
    solidity: "0.8.4",
};
