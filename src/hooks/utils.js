import { useLayoutEffect, useRef } from "react";
import { loadWeb3Packages, WalletUserContext } from "../context/index";
import { useWalletContext } from "./useWalletContext";

// checks the wallet connection status and update state if wallet is connected on page refresh
export const useCheckWalletConnection = () => {
  const hasBeenChecked = useRef(false);

  const { walletConnect } = useWalletContext();

  const { dispatch, web3PackagesLoaded } = WalletUserContext();

  useLayoutEffect(() => {
    (() => {
      const isConnected = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");

      if (!isConnected) return dispatch({ isStateLoading: false });
      if (web3PackagesLoaded && !hasBeenChecked.current) {
        walletConnect();
        hasBeenChecked.current = true;
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3PackagesLoaded]);
};

// loads web packages
export const useInitializePackages = () => {
  const { dispatch } = WalletUserContext();

  useLayoutEffect(() => {
    loadWeb3Packages().then((web3Modal) => {
      dispatch({
        web3Modal,
        web3PackagesLoaded: true,
      });
    });
  }, [dispatch]);
};

/**
 * @dev it will listen to provder events and update the states.
 * @returns void
 */
export const useOnProviderChange = () => {
  const { dispatch, provider } = WalletUserContext();

  const { getNetworkInfo, updateSinger } = useWalletContext();

  useLayoutEffect(() => {
    provider &&
      (() => {
        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
          if (accounts && accounts.length)
            return dispatch({
              account: accounts[0],
              isWalletConnected: true,
            });
          dispatch({
            account: null,
            isWalletConnected: false,
          });
        });

        // Subscribe to chainId change
        provider.on("chainChanged", () => {
          getNetworkInfo(provider);
          updateSinger();
        });
      })();

    // eslint-disable-next-line
  }, [provider]);
};
