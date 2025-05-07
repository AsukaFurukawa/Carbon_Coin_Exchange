# Blockchain Carbon Accounting - CarbonCoin Exchange

[![CI](https://github.com/hyperledger-labs/blockchain-carbon-accounting/actions/workflows/ci.yml/badge.svg)](https://github.com/hyperledger-labs/blockchain-carbon-accounting/actions/workflows/ci.yml)
[![Test Report](https://github.com/hyperledger-labs/blockchain-carbon-accounting/actions/workflows/test-report.yml/badge.svg)](https://github.com/hyperledger-labs/blockchain-carbon-accounting/actions/workflows/test-report.yml)

This project uses web3/blockchain/distributed ledger technology to solve several key challenges for climate change, with a specific focus on carbon credit trading through the CarbonCoin Exchange platform.

## Overview

CarbonCoin Exchange is built on top of the blockchain-carbon-accounting project, providing a platform for:

- Trading tokenized carbon credits as CarbonCoins (CC)
- Tracking and verifying emissions data on a secure blockchain
- Facilitating the exchange of carbon credits between organizations
- Supporting the development of carbon reduction projects and initiatives

The platform combines several components:

- **CarbonCoin Token**: An ERC-20 token representing carbon credits that can be traded on the exchange
- **Net Emissions Token Network**: Smart contracts for managing emissions audits, carbon offsets, and energy certificates
- **Climate DAO**: Decentralized Autonomous Organization for validating climate projects through voting
- **Blockchain Ledger**: Permanent, transparent storage of emissions data and carbon credit transactions
- **User Interface**: Web application for interacting with the platform

## Main Components

The code is divided into the following components:

- [lib](lib/README.md): Common library of code
- [fabric](fabric/README.md): [Emissions Data Channel](https://wiki.hyperledger.org/display/CASIG/Emissions+Data+Channel)
- [hardhat](hardhat/README.md): [Net Emissions Token Network](https://wiki.hyperledger.org/display/CASIG/Emissions+Tokens+Network) and [Climate DAO](https://wiki.hyperledger.org/display/CASIG/DAO)
- [app](app/README.md): Applications built on these components, including React user interface and supply chain emissions calculations.
- [open-offsets-directory](open-offsets-directory/README.md): [Voluntary Carbon Offsets Directory](https://wiki.hyperledger.org/display/CASIG/Completed+Research%3A+Voluntary+Carbon+Offsets+Directory+Research)
- [secure-identities](secure-identities/README.md): Support for signing transactions using Vault or web-socket
- [supply-chain](app/supply-chain/README.md): [Supply Chain Decarbonization](https://wiki.hyperledger.org/display/CASIG/Supply+Chain+Decarbonization)
- [data](data/README.md): Data for setting up the applications
- [carbon-coin-contracts](carbon-coin-contracts/README.md): Smart contracts for the CarbonCoin token
- [carbon-coin-frontend](carbon-coin-frontend/README.md): User interface for the CarbonCoin Exchange
- [carbon-coin-backend](carbon-coin-backend/README.md): Backend services for the CarbonCoin Exchange

## CarbonCoin Token

The CarbonCoin (CC) is an ERC-20 token that represents carbon credits. Each token represents a verified carbon credit that can be traded on the exchange. The token contract includes features for:

- Minting new tokens based on verified carbon reduction projects
- Transferring tokens between accounts
- Role-based access control for token issuance
- Integration with the Net Emissions Token Network

## Getting Started

### Prerequisites

- Node.js v16
- PostgreSQL database
- IPFS (for document storage)
- Hardhat development environment

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/blockchain-carbon-accounting.git
   cd blockchain-carbon-accounting
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your environment by creating a `.env` file in the root directory (see `.env.example` for required variables).

4. Initialize the database:
   ```
   npm run pg:init
   ```

5. Run the hardhat node:
   ```
   npm run hardhat
   ```

6. In another terminal, set up default roles and demo tokens:
   ```
   npm run hardhat-setup
   ```

7. Start the API server:
   ```
   npm run api-server
   ```

8. Load demo seed wallets:
   ```
   npm run api-server:loadDemoSeeds
   ```

9. Run the frontend application:
   ```
   npm run frontend
   ```

### Using the CarbonCoin Exchange

Once the application is running, you can access it at `http://localhost:3000`. From there, you can:

1. Create an account or log in
2. Request emissions audits
3. Issue, transfer, and retire carbon offset tokens
4. Trade CarbonCoin tokens
5. View your token balance and transaction history

For detailed instructions, see the [User's Guide](User_Guide.md).

## Development

For developers looking to contribute to the project:

1. Review the project structure and code organization
2. Set up the development environment as described in [Getting Started](#getting-started)
3. Make changes to the code
4. Run tests to ensure functionality:
   ```
   npm test
   ```
5. Submit a pull request with your changes

## Additional Resources

- [Open Source Carbon Accounting video](https://www.youtube.com/watch?v=eNM7V8vQCg4)
- [Hyperledger Carbon Accounting and Neutrality Working Group](https://wiki.hyperledger.org/display/CASIG/Carbon+Accounting+and+Certification+Working+Group)
- [Setup Guide](Setup.md) and documentation in each component.
- [Technical Documentation](docs/README.md) for detailed information about the system architecture

## Contributing

Get involved! Please see [How to Contribute](https://wiki.hyperledger.org/display/CASIG/How+to+Contribute) to help us build this open source platform for climate action.

## Git Notes

Please sign off all your commits. This can be done with

    $ git commit -s -m "your message"

## License

This project is licensed under the [Apache License 2.0](LICENSE).

