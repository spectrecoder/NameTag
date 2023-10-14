import logo from "../img/logo.png";
import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import {
    connectWallet,
    disConnectWallet,
    getCurrentWalletConnected,
    getWalletProvider,
} from "../web3/WalletProvider.js";

import { chainId } from "../web3/ChainInfo.js";

function Navbar() {
    const [isShow, setIsShow] = React.useState(false);
    const [showText, setShowText] = useState(false);

    const [account, setAccount] = useState("");
    const [connected, setConnected] = useState(false);

    const toggleMiniMenu = () => {
        setIsShow(!isShow);
    };

    useEffect(() => {
        // console.log(account)
        // console.log(walletProvider)

        if (!getWalletProvider()) {
            setConnected(false);
        } else if (
            parseInt(getWalletProvider().chainId) === parseInt(chainId)
        ) {
            setAccount(getCurrentWalletConnected().address);
            setConnected(true);
            getWalletProvider().on("chainChanged", handleChainChanged);
        }

        // if(getWalletProvider()) {
        //     setAccount(getCurrentWalletConnected().address);
        //     setConnected(true);
        //     // toast.dark("wallet is connected")
        // } else {
        //     setConnected(false);
        //     // toast.dark("wallet is unconnected")
        // }
    }, [account]);

    const walletconnect = () => {
        if (connected) {
            disconnectButtonClick();
        } else {
            connetButtonClick();
        }
    };

    const handleChainChanged = async () => {
        try {
            await getWalletProvider().request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${chainId}` }],
            });
        } catch (error) {
            disconnectButtonClick();
        }
    };

    const mobilewalletconnect = () => {
        if (connected) {
            disconnectButtonClick();
        } else {
            connetButtonClick();
        }
        toggleMiniMenu();
    };

    const connetButtonClick = async () => {
        await connectWallet();

        // console.log((await getCurrentWalletConnected()).address)

        if (
            parseInt(getWalletProvider().chainId) === parseInt(chainId) &&
            (await getCurrentWalletConnected()).address !== ""
        ) {
            // toast.dark("Wallet is connected");
            setAccount(getCurrentWalletConnected().address);
            toast.success("Wallet is connected", {
                style: { background: "black" },
            });
        } else {
            setAccount("");
            disConnectWallet();
        }
    };

    const disconnectButtonClick = () => {
        setAccount("");
        disConnectWallet();
        // toast.dark("Wallet is disconnected")
        toast.success("Wallet is disconnected", {
            style: { background: "black" },
        });
    };

    return (
        <div>
            <div className="navbar">
                <div className="navbar-logo">
                    <img src={logo} />
                </div>
                <ul className="flex navbar-center">
                    <li>
                        <OverlayTrigger
                            key={"bottom"}
                            placement={"bottom"}
                            overlay={
                                <Tooltip id={`tooltip-bottom`}>
                                    Coming soon.
                                </Tooltip>
                            }
                        >
                            <a variant="secondary" href="#">
                                NFT Marketplace
                            </a>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <a href="#charactersheet">Character Sheet</a>
                    </li>
                    <li>
                        <a href="#whitepaper">White Paper</a>
                    </li>
                </ul>
                <ul className="wallet-buttons">
                    <li>
                        <a href="#">Join Discord</a>
                    </li>
                    <a href="#" onClick={walletconnect}>
                        <div className="wallet">
                            {!connected && (
                                <p className="wallet_connect">CONNECT</p>
                            )}
                            {connected && (
                                <p className="wallet_connect">DISCONNECT</p>
                            )}
                            <p>WALLET</p>
                        </div>
                    </a>
                </ul>
                <button className="menu-icon" onClick={toggleMiniMenu}>
                    <i className="bi bi-list-task"></i>
                </button>
            </div>
            <div className={isShow ? "sub-navbar" : "d-none"}>
                <ul>
                    <li>
                        <a href="#" onClick={toggleMiniMenu}>
                            NFT Marketplace{" "}
                            <span
                                style={{
                                    fontSize: "smaller",
                                    color: "#8f8181",
                                }}
                            >
                                (Comming soon)
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#charactersheet" onClick={toggleMiniMenu}>
                            Character Sheet
                        </a>
                    </li>
                    <li>
                        <a href="#whitepaper" onClick={toggleMiniMenu}>
                            White Paper
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={() => toggleMiniMenu}>
                            Join Discord
                        </a>
                    </li>
                    <li>
                        {!connected && (
                            <a href="#" onClick={mobilewalletconnect}>
                                Connect Wallet
                            </a>
                        )}
                        {connected && (
                            <a href="#" onClick={mobilewalletconnect}>
                                Disconnect Wallet
                            </a>
                        )}
                    </li>
                </ul>
            </div>
            {/* <ToastContainer closeButton={true} position="bottom-right" /> */}
        </div>
    );
}

export default Navbar;
