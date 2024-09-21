import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';
dotenv.config();


let privateKey=process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : ""

const config: HardhatUserConfig = {
  solidity: '0.8.27',
  networks: {
    flowtestnet: {
      url: 'https://testnet.evm.nodes.onflow.org',
      accounts: [privateKey], // In practice, this should come from an environment variable and not be commited
      gas: 1500000, // Example gas limit
      gasPrice: 2000000000
    },

  },
};

export default config;

