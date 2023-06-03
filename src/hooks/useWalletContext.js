import { ethers } from "ethers";
import { WalletUserContext } from "../context/wallet/index";
import { ACCEPTED_CHAIN_ID } from "../constants/constants";

export const useWalletContext = () => {
  const { dispatch, isWalletConnected, provider, web3Modal } =
    WalletUserContext();

  const getNetworkInfo = async (provider) => {
    if (!provider) return;

    const chainId = await provider.request({ method: "eth_chainId" });

    let isCorrectNetworkInfo = false;

    if (parseInt(chainId) === parseInt(ACCEPTED_CHAIN_ID))
      isCorrectNetworkInfo = true;

    dispatch({
      connectedChainId: chainId,
      isCorrectChain: isCorrectNetworkInfo,
    });

    // if (!isCorrectNetworkInfo) return await switchNetwork(provider);
  };

  /**
   * @dev it will popup web3 modal and gets user wallet address once they select provider.
   * @returns void
   */
  const walletConnect = async () => {
    if (!web3Modal || isWalletConnected) return;
    try {
      const provider = await web3Modal.connect();

      const ethersProvider = new ethers.providers.Web3Provider(provider, "any");

      const signer = ethersProvider.getSigner();
      const account = await signer.getAddress();

      dispatch({
        isWalletConnected: true,
        isStateLoading: false,
        account,
        signer,
        provider,
        ethersProvider,
      });
    } catch (err) {
      console.error(err);
    }

    // on wallet connect success get network info
    getNetworkInfo(provider);
  };

  const updateSinger = async () => {
    try {
      if (!provider) return;
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const account = await signer.getAddress();
      dispatch({
        isWalletConnected: true,
        account,
        signer,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @dev clear cached provider and resets account and wallet connect status.
   */
  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
    dispatch({
      account: null,
      isWalletConnected: false,
    });
  };

  return { disconnectWallet, getNetworkInfo, updateSinger, walletConnect };
};
