const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    // self add -> you need to specify which version compiler you use to match to your solidity contract
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        develop: {
            port: 7545,
        },
        rinkeby: {
            provider: () =>
                new HDWalletProvider(
                    process.env.SEED_PHRASE,
                    process.env.INFURA_LINK,
                    1 //ACCOUNT INDEX
                ),
            network_id: 4,
            gas: 5500000,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
        },
    },

    compilers: {
        solc: {
            version: "0.8.11",
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
};