// Script to interact with the CarbonCoin contract
const { ethers } = require("hardhat");

async function main() {
  // Get the contract address from command line arguments
  const contractAddress = process.argv[2];
  if (!contractAddress) {
    console.error("Please provide a contract address as a command line argument");
    process.exit(1);
  }
  
  console.log(`Interacting with CarbonCoin contract at ${contractAddress}`);
  
  // Get signers
  const [deployer, addr1, addr2] = await ethers.getSigners();
  
  // Connect to the deployed contract
  const CarbonCoin = await ethers.getContractFactory("CarbonCoin");
  const carbonCoin = await CarbonCoin.attach(contractAddress);
  
  // Check balances
  console.log("\n--- Current Balances ---");
  const deployerBalance = await carbonCoin.balanceOf(deployer.address);
  console.log(`Deployer (${deployer.address}): ${ethers.utils.formatEther(deployerBalance)} CC`);
  
  const addr1Balance = await carbonCoin.balanceOf(addr1.address);
  console.log(`Address 1 (${addr1.address}): ${ethers.utils.formatEther(addr1Balance)} CC`);
  
  const addr2Balance = await carbonCoin.balanceOf(addr2.address);
  console.log(`Address 2 (${addr2.address}): ${ethers.utils.formatEther(addr2Balance)} CC`);
  
  // Check minter status
  console.log("\n--- Minter Status ---");
  const isDeployerMinter = await carbonCoin.minters(deployer.address);
  console.log(`Deployer is minter: ${isDeployerMinter}`);
  
  const isAddr1Minter = await carbonCoin.minters(addr1.address);
  console.log(`Address 1 is minter: ${isAddr1Minter}`);
  
  const isAddr2Minter = await carbonCoin.minters(addr2.address);
  console.log(`Address 2 is minter: ${isAddr2Minter}`);
  
  // Mint tokens (only if the account is a minter)
  console.log("\n--- Minting Tokens ---");
  const mintAmount = ethers.utils.parseEther("100");
  
  try {
    // Mint from deployer to addr2
    await carbonCoin.mint(addr2.address, mintAmount);
    console.log(`Minted ${ethers.utils.formatEther(mintAmount)} CC to Address 2`);
  } catch (error) {
    console.error("Error minting tokens:", error.message);
  }
  
  // Transfer tokens
  console.log("\n--- Transferring Tokens ---");
  const transferAmount = ethers.utils.parseEther("50");
  
  try {
    // Transfer from deployer to addr1
    await carbonCoin.transfer(addr1.address, transferAmount);
    console.log(`Transferred ${ethers.utils.formatEther(transferAmount)} CC from Deployer to Address 1`);
  } catch (error) {
    console.error("Error transferring tokens:", error.message);
  }
  
  // Check updated balances
  console.log("\n--- Updated Balances ---");
  const updatedDeployerBalance = await carbonCoin.balanceOf(deployer.address);
  console.log(`Deployer (${deployer.address}): ${ethers.utils.formatEther(updatedDeployerBalance)} CC`);
  
  const updatedAddr1Balance = await carbonCoin.balanceOf(addr1.address);
  console.log(`Address 1 (${addr1.address}): ${ethers.utils.formatEther(updatedAddr1Balance)} CC`);
  
  const updatedAddr2Balance = await carbonCoin.balanceOf(addr2.address);
  console.log(`Address 2 (${addr2.address}): ${ethers.utils.formatEther(updatedAddr2Balance)} CC`);
  
  console.log("\nInteraction completed successfully!");
}

// Execute the interaction script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 