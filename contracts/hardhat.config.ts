import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  networks: {
    flowtestnet: {
      url: 'https://testnet.evm.nodes.onflow.org',
      accounts: [`7b6d0ad0fba76ed3946648096aabb22b9097a1a17d9d7dd8dd7bb09c5a790d2c`], // In practice, this should come from an environment variable and not be commited
      gas: 500000, // Example gas limit
    },
  },
};

export default config;

