// Script to demonstrate integration between CarbonCoin and Net Emissions Token Network
const { ethers } = require("hardhat");

async function main() {
  // Get contract addresses from command line arguments
  const carbonCoinAddress = process.argv[2];
  const netEmissionsAddress = process.argv[3];
  
  if (!carbonCoinAddress || !netEmissionsAddress) {
    console.error("Please provide both CarbonCoin and NetEmissionsTokenNetwork addresses as command line arguments");
    process.exit(1);
  }
  
  console.log(`Integrating CarbonCoin at ${carbonCoinAddress} with NetEmissionsTokenNetwork at ${netEmissionsAddress}`);
  
  // Get signers
  const [deployer, dealer, consumer] = await ethers.getSigners();
  
  // Connect to the deployed contracts
  const CarbonCoin = await ethers.getContractFactory("CarbonCoin");
  const carbonCoin = await CarbonCoin.attach(carbonCoinAddress);
  
  // For this example, we're assuming we have access to the NetEmissionsTokenNetwork ABI
  // You would need to ensure this contract factory is available in your project
  const NetEmissionsTokenNetwork = await ethers.getContractFactory("NetEmissionsTokenNetwork");
  const netEmissions = await NetEmissionsTokenNetwork.attach(netEmissionsAddress);
  
  console.log("\n--- Setting up roles ---");
  
  try {
    // Add dealer as a minter on CarbonCoin
    await carbonCoin.addMinter(dealer.address);
    console.log(`Added dealer (${dealer.address}) as a minter on CarbonCoin`);
    
    // Check if dealer has the right role on Net Emissions Token Network
    // This assumes the REGISTERED_OFFSET_DEALER role exists
    const REGISTERED_OFFSET_DEALER = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("REGISTERED_OFFSET_DEALER")
    );
    
    const isDealerRegistered = await netEmissions.hasRole(REGISTERED_OFFSET_DEALER, dealer.address);
    
    if (!isDealerRegistered) {
      // This assumes the deployer has admin rights to grant roles
      const DEFAULT_ADMIN_ROLE = ethers.constants.HashZero;
      const isDeployerAdmin = await netEmissions.hasRole(DEFAULT_ADMIN_ROLE, deployer.address);
      
      if (isDeployerAdmin) {
        await netEmissions.grantRole(REGISTERED_OFFSET_DEALER, dealer.address);
        console.log(`Granted REGISTERED_OFFSET_DEALER role to dealer (${dealer.address}) on NetEmissionsTokenNetwork`);
      } else {
        console.log(`Deployer (${deployer.address}) does not have admin rights on NetEmissionsTokenNetwork`);
      }
    } else {
      console.log(`Dealer (${dealer.address}) already has REGISTERED_OFFSET_DEALER role on NetEmissionsTokenNetwork`);
    }
    
    // Register consumer on Net Emissions Token Network
    const REGISTERED_CONSUMER = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("REGISTERED_CONSUMER")
    );
    
    const isConsumerRegistered = await netEmissions.hasRole(REGISTERED_CONSUMER, consumer.address);
    
    if (!isConsumerRegistered) {
      // Connect as dealer to register consumer
      const netEmissionsAsDealer = netEmissions.connect(dealer);
      await netEmissionsAsDealer.registerConsumer(consumer.address);
      console.log(`Registered consumer (${consumer.address}) on NetEmissionsTokenNetwork`);
    } else {
      console.log(`Consumer (${consumer.address}) already registered on NetEmissionsTokenNetwork`);
    }
    
    console.log("\n--- Carbon Credit Issuance Workflow ---");
    
    // 1. Dealer issues carbon offset tokens on Net Emissions Token Network
    const netEmissionsAsDealer = netEmissions.connect(dealer);
    
    // Define token parameters
    const tokenTypeId = 2; // Carbon Emissions Offset
    const quantity = ethers.utils.parseEther("100");
    const fromDate = Math.floor(Date.now() / 1000);
    const thruDate = fromDate + 365 * 24 * 60 * 60; // 1 year from now
    const metadata = "ipfs://QmXYZ..."; // IPFS hash of the carbon offset documentation
    const manifest = "Carbon Offset Project XYZ";
    const description = "Reforestation project in Amazon";
    
    // Issue token
    const issueTx = await netEmissionsAsDealer.issue(
      tokenTypeId,
      consumer.address,
      quantity,
      fromDate,
      thruDate,
      metadata,
      manifest,
      description
    );
    
    const receipt = await issueTx.wait();
    
    // Extract tokenId from event logs
    const tokenCreatedEvent = receipt.events.find(event => event.event === "TokenCreated");
    const tokenId = tokenCreatedEvent.args.tokenId;
    
    console.log(`Issued carbon offset tokens (ID: ${tokenId}) to consumer (${consumer.address})`);
    
    // 2. Convert Net Emissions tokens to CarbonCoin tokens
    // In a real integration, this would likely involve oracle verification
    // Here we're simplifying by having the dealer mint equivalent CarbonCoins
    
    const carbonCoinAsDealer = carbonCoin.connect(dealer);
    await carbonCoinAsDealer.mint(consumer.address, quantity);
    
    console.log(`Minted ${ethers.utils.formatEther(quantity)} CarbonCoins to consumer (${consumer.address})`);
    
    // 3. Check consumer balances
    const netEmissionsBalance = await netEmissions.balanceOf(consumer.address, tokenId);
    const carbonCoinBalance = await carbonCoin.balanceOf(consumer.address);
    
    console.log(`\n--- Consumer Balances ---`);
    console.log(`NetEmissionsTokenNetwork Token ID ${tokenId}: ${ethers.utils.formatEther(netEmissionsBalance)}`);
    console.log(`CarbonCoin: ${ethers.utils.formatEther(carbonCoinBalance)}`);
    
  } catch (error) {
    console.error("Error during integration:", error.message);
  }
  
  console.log("\nIntegration demonstration completed!");
}

// Execute the integration script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 