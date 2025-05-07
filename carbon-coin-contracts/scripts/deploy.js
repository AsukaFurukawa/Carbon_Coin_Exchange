// Script to deploy the CarbonCoin contract
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying CarbonCoin contract...");

  // Get the ContractFactory for our CarbonCoin contract
  const CarbonCoin = await ethers.getContractFactory("CarbonCoin");
  
  // Deploy the contract
  const carbonCoin = await CarbonCoin.deploy();
  
  // Wait for the contract to be deployed
  await carbonCoin.deployed();
  
  console.log("CarbonCoin deployed to:", carbonCoin.address);
  
  // For testnets, you might want to add multiple minters for testing
  if (network.name !== "mainnet") {
    const [deployer, addr1, addr2] = await ethers.getSigners();
    
    console.log("Adding additional minters for testing...");
    
    // Add addr1 as a minter
    await carbonCoin.addMinter(addr1.address);
    console.log(`Added ${addr1.address} as a minter`);
    
    // Add addr2 as a minter
    await carbonCoin.addMinter(addr2.address);
    console.log(`Added ${addr2.address} as a minter`);
    
    // Mint some initial tokens for testing
    const mintAmount = ethers.utils.parseEther("1000");
    await carbonCoin.mint(deployer.address, mintAmount);
    console.log(`Minted ${ethers.utils.formatEther(mintAmount)} CC to ${deployer.address}`);
    
    await carbonCoin.mint(addr1.address, mintAmount);
    console.log(`Minted ${ethers.utils.formatEther(mintAmount)} CC to ${addr1.address}`);
  }
  
  console.log("Deployment completed successfully!");
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 