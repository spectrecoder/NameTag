import Onboard from "bnc-onboard";
// import Web3 from "web3";
import { ethers } from 'ethers';
import {chainId} from "./ChainInfo.js";

const wallets = [
    { walletName: "metamask", preferred: true }
  ];
  
  let walletProvider = null;

  const onboard = Onboard({

    networkId: chainId,     // dappId: "877e8915-22d9-450e-a9b8-799bfd51798e", // [String] The API key created by step one above// [Integer] The Ethereum network ID your Dapp uses.
    hideBranding: true,
    walletSelect: {
        wallets: wallets
    },
    subscriptions: {
        wallet: (wallet) => {
            walletProvider = wallet.provider;
             console.log(`${wallet.name} is now connected`);
        }
    }
  });
  
  export const connectWallet =  async () => {
    const currentState = onboard.getState();
    if(currentState["address"] != null) {
        return {
            address: currentState["address"],
            status: "👆🏽 Mint your GG Now.",
        }
    }
    const walletSelected = await onboard.walletSelect('MetaMask');
    if (walletSelected !== false) {
        const walletCheck = await onboard.walletCheck();
        if (walletCheck === true) {
            const currentState = onboard.getState();
            return {
                address: currentState["address"],
                status: "👆🏽 Mint your GG Now.",
            }
        } else {
            return {
                address: "",
                status: "😥 Connect your wallet account to the site.",
            }
        }
    }
  
  }
  
  export const disConnectWallet = () => {
    onboard.walletReset()
    return {
        address: "",
        status: "😥 Connect your wallet account to the site.",
    }
  }
  
  export const getCurrentWalletConnected = async () => {
    const currentState = onboard.getState();
  
    if(currentState["address"] != null) {
        return {
            address: currentState["address"],
            status: "👆🏽 Mint your GG Now.",
        }
    } else {
        return {
            address: "",
            status: "",
        }
    }
  }

  export const getWalletProvider = () => {
      return walletProvider;
  }
  
  export const getContract = (contractAddress, abi) => {
  
    let contract
  
    try {
          // const provider = new ethers.providers.Web3Provider(window.ethereum);
          const provider = new ethers.providers.Web3Provider(walletProvider);
          const signer = provider.getSigner();
          contract = new ethers.Contract(contractAddress, abi, signer)
    } catch (error) {
        contract = null
    }
    return contract
  }