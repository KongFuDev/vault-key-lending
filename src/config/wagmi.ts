import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { CHAIN_ID, RPC_URL, WALLET_CONNECT_PROJECT_ID } from './constants';

export const config = getDefaultConfig({
  appName: 'Vault Key Lending',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});
