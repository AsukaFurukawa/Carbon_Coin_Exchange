require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// Check if required environment variables are set
if (!process.env.PRIVATE_KEY || !process.env.ALCHEMY_API_KEY) {
  throw new Error("Please set your PRIVATE_KEY and ALCHEMY_API_KEY in a .env file");
}

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
}; 