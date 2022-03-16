const path = require("path");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    // self add -> you need to specify which version compiler you use to match to your solidity contract
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        develop: {
            port: 7545,
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