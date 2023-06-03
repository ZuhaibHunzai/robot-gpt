import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  account: null,
  isWalletConnected: false,
  connectedChainId: null,
  isCorrectChain: false,
  web3Modal: null,
  web3PackagesLoaded: false,
  signer: null,
  provider: null,
  ethersProvider: null,
  isStateLoading: true,
};

const WalletContext = createContext(initialState);

export const WalletContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, payload) => ({ ...state, ...payload }),
    initialState
  );

  return (
    <WalletContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};

export const WalletUserContext = () => useContext(WalletContext);
