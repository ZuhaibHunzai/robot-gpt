// dynamic import to reduce bundle size
export const loadWeb3Packages = async () => {
  let Web3Modal = import(
    "web3modal"
    /* webpackChunkName: "web3modal" */
  );
  let WalletConnectProvider = import(
    "@walletconnect/web3-provider"
    /* webpackChunkName: "web3-provider" */
  );

  [{ default: Web3Modal }, { default: WalletConnectProvider }] =
    await Promise.all([Web3Modal, WalletConnectProvider]);

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "12803c9f5919455ba1ac0be83197d502", // required
        rpc: {
          56: "https://bsc-dataseed.binance.org/", // BSC
          97: "https://data-seed-prebsc-2-s1.binance.org:8545", // BSC Testnet
          137: "https://polygon-mainnet.g.alchemy.com/v2/ma3nP6ZZCpI81yCWIBz2fPOD2BNBrVP5", // Polygon
          250: "https://rpc.ftm.tools", // Fantom
          4002: "https://rpc.testnet.fantom.network", // Fantom Testnet
          42161: "https://arb1.arbitrum.io/rpc", // Arbitrum
          80001: "https://rpc-mumbai.matic.today", // Mumbai
          421611: "https://rinkeby.arbitrum.io/rpc", // Arbitrum Testnet Rinkeby
        },
      },
    },
  };

  return new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
};
