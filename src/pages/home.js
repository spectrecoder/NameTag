import { React, useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import FormData from "form-data";
import Onboard from "bnc-onboard";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Loading from "./Loading";

/* imgs */
import Adventurer from "../img/Adventurer.png";
import Aetherborne from "../img/Aetherborne.png";
import Gemcutter from "../img/Gemcutter.png";
import Geomancer from "../img/Geomancer.png";
import Grandmaster from "../img/Grandmaster.png";
import Savant from "../img/Savant.png";
import Shaper from "../img/Shaper.png";
import Weaver from "../img/Weaver.png";

import AdventurerIcon from "../img/adventurericon.png";
import AetherborneIcon from "../img/aetherborneicon.png";
import GemcutterIcon from "../img/gemcuttericon.png";
import GeomancerIcon from "../img/geomancericon.png";
import GrandmasterIcon from "../img/grandmastericon.png";
import SavantIcon from "../img/savanticon.png";
import ShaperIcon from "../img/shapericon.png";
import WeaverIcon from "../img/weavericon.png";

import { ethers } from "ethers";

import {
    getWalletProvider,
    getContract,
    getCurrentWalletConnected,
} from "../web3/WalletProvider.js";

import contractABI from "../web3/contractabi.json";
import { checkResultErrors } from "ethers/lib/utils";

const nametagNftAddress = "0x8546AB0CE1AB3dC32691484EE5FDcadD7a05aC2a";

export default function () {
    const [image, setImage] = useState("");
    const [board_text, setBoardText] = useState("");
    const [board_title, setBoardTitle] = useState("Select Character");
    const [imgName, setImgName] = useState("");
    const [loading, setLoading] = useState(false);
    const [characterId, setCharacterId] = useState(-1);
    const [show, setShow] = useState(false);
    const [characterCount, setCharacterCount] = useState("");
    const [chracterPrice, setCharacterPrice] = useState("0");
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (image === "") {
            toast.warning("Please select avatar", {
                style: { background: "black" },
            });
            return;
        }

        if (imgName === "") {
            toast.warning("Please input character name", {
                style: { background: "black" },
            });
            return;
        }
        setShow(true);
    };

    const getCharacterProperties = (chid) => {
        let retvar = { Archetype: "", Rarity: "" };
        switch (chid) {
            case 0:
                retvar.Archetype = "Adventurer";
                retvar.Rarity = "Common";
                break;
            case 4:
                retvar.Archetype = "GrandMaster";
                retvar.Rarity = "Legendary";
                break;
            case 5:
                retvar.Archetype = "Savant";
                retvar.Rarity = "Epic";
                break;
            case 1:
                retvar.Archetype = "Aetherborne";
                retvar.Rarity = "Epic";
                break;
            case 3:
                retvar.Archetype = "Geomancer";
                retvar.Rarity = "Rare";
                break;
            case 6:
                retvar.Archetype = "Shaper";
                retvar.Rarity = "Rare";
                break;
            case 7:
                retvar.Archetype = "Weaver";
                retvar.Rarity = "Rare";
                break;
            case 2:
                retvar.Archetype = "Gemcutter";
                retvar.Rarity = "Rare";
                break;
        }

        return retvar;
    };

    const getCurrentTime = () => {
        const curtime = new Date();
        // console.log(Date.parse(curtime));
        return Date.parse(curtime);
        // new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16)
    }

    let pinataApiKey = "7c29e9aba6e0e32a199c";
    let pinataSecretApiKey =
        "a6dfb14dbba3bbd599bcf219da2da836396dd88cd3ac54c6b00c32f74f7abb4c";

    const mint = async (name, cid) => {
        let namecontract = getContract(nametagNftAddress, contractABI);
        // console.log("contract", namecontract);
        if (!namecontract) {
            toast.error("Contract Error", { style: { background: "black" } });
            setLoading(false);
            return false;
        }

        const mintprice = ethers.utils.formatUnits(
            await namecontract.getCharacterPrice(characterId),
            18
        );

        try {
            const tx = await namecontract.Mint(name, cid, characterId, {
                value: ethers.utils.parseUnits(mintprice, 18),
            });
            //   console.log(tx);
            let response = await tx.wait();
            if (response.status === 0) {
                toast.error("Transaction Failed", {
                    style: { background: "black" },
                });
            } else if (response.status === 1) {
                toast.success("Token is successfully minted", {
                    style: { background: "black" },
                });
            }

            setLoading(false);
            return true;
            // return {address, name, symbol, decimal, supply, balance, type, state};
        } catch (error) {
            toast.error("Mint Error", { style: { background: "black" } });
            console.log(error);
            setLoading(false);
            return false;
            // return null;
        }
    };

    const validate = async () => {
        if (!getWalletProvider()) {
            //   alert("Please connect metamask");
            toast.error("Wallet is not Connected", {
                style: { background: "black" },
            });
            setLoading(false);
            return false;
        }

        let namecontract = getContract(nametagNftAddress, contractABI);
        // console.log("contract", namecontract);
        if (!namecontract) {
            //   console.log("contract error");
            toast.error("contract error", { style: { background: "black" } });
            setLoading(false);
            return false;
        }

        const saleactive = await namecontract.saleIsActive();

        if (!saleactive) {
            toast.error("Sale is not active currently", {
                style: { background: "black" },
            });
            setLoading(false);
            return false;
        }

        const provider = new ethers.providers.Web3Provider(getWalletProvider());

        const balance = await provider.getBalance(
            (
                await getCurrentWalletConnected()
            ).address
        );

        const calculated = ethers.utils.formatUnits(balance, 18);

        const mintprice = ethers.utils.formatUnits(
            await namecontract.getCharacterPrice(characterId),
            18
        );

        if (parseFloat(calculated) < parseFloat(mintprice)) {
            toast.error("Insufficent funds", {
                style: { background: "black" },
            });
            setLoading(false);
            return false;
        }

        const characterSupply = await namecontract.getCharacterSupply(
            characterId
        );
        const characterMinted = await namecontract.getCharacterMinted(
            characterId
        );

        if (parseFloat(characterMinted) >= parseFloat(characterSupply)) {
            toast.error("Maximum Supply of selected Archetype Reached, can not be minted more", {
                style: { background: "black" },
            });
            setLoading(false);
            return false;
        }

        const mintedamount = await namecontract.getMintedAmont(
            (
                await getCurrentWalletConnected()
            ).address
        );
        const walletlimit = await namecontract.walletLimit();

        if (parseFloat(mintedamount) >= parseFloat(walletlimit)) {
            toast.error("Exceeds Personal Walllet Limits", {
                style: { background: "black" },
            });
            setLoading(false);
            return false;
        }

        const totoalsupply = await namecontract.totalSupply();
        const maxsuppy = await namecontract.MAX_SUPPLY();

        if (parseFloat(totoalsupply) >= parseFloat(maxsuppy)) {
            toast.error("Exceeds max supply of contract", {
                style: { background: "black" },
            });
            setLoading(false);
            return false;
        }

        const validate = await namecontract.validate(imgName);

        if (!validate[0]) {
            toast.error("Name Unavailable", {
                style: { background: "black" },
            });
            setLoading(false);
            return false;
        }

        const tokenid = await namecontract.getByName(imgName.toUpperCase());

        if (parseInt(tokenid) !== 0) {
            toast.error("Character Name is exist", {
                style: { background: "black" },
            });
            setLoading(false);
            return false;
        }

        const isdenylist = await namecontract.inDenyList(imgName.toUpperCase());

        if (isdenylist) {
            toast.error("Character Name is in DenyList", {
                style: { background: "black" },
            });
            setLoading(false);
            return false;
        }

        return true;
    };

    const srcToFile = (src, fileName, mimeType) => {
        return fetch(src)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], fileName, { type: mimeType });
            });
    };
    const upload = async () => {
        let imgurl = document.getElementById("upload_img").src;
        let data;

        function toDataURL(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    callback(reader.result);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.send();
        }

        toDataURL(imgurl, function (dataUrl) {
            data = dataUrl;
        });

        setLoading(true);

        if (!(await validate())) return;

        toast.dark("File Uploading", { style: { background: "black" } });

        srcToFile(data, imgName, "iamge/png")
            .then(function (file) {
                var fd = new FormData();
                fd.append("file", file);
                const metadata = JSON.stringify({
                    name: file.name,
                    keyvalues: {
                        exampleKey: "exampleValue",
                    },
                });
                fd.append("pinataMetadata", metadata);

                const pinataOptions = JSON.stringify({
                    cidVersion: 0,
                });
                fd.append("pinataOptions", pinataOptions);

                axios
                    .post(
                        "https://api.pinata.cloud/pinning/pinFileToIPFS",
                        fd,
                        {
                            maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
                            headers: {
                                "Content-Type": `multipart/form-data; boundary=${fd._boundary}`,
                                pinata_api_key: pinataApiKey,
                                pinata_secret_api_key: pinataSecretApiKey,
                            },
                        }
                    )
                    .then(function (response) {
                        console.log("img url", response);
                        console.log(file.name);
                        //handle response here
                        let IpfsHash = response.data.IpfsHash;
                        let jsonBody = {
                            pinataMetadata: {
                                name: file.name + ".json",
                            },
                            pinataContent: {
                                name: file.name,
                                description:
                                    "**WARNING**: Always check the Mythik Contract you are about to purchase has the correct name by entering the token ID  into the *getTokenName* function [Etherscan](https://rinkeby.etherscan.io/address/" +
                                    nametagNftAddress +
                                    ") found here.",
                                image:
                                    "https://gateway.pinata.cloud/ipfs/" +
                                    IpfsHash,
                                "date": getCurrentTime(),
                                attributes: [
                                    {
                                        "trait_type": "Archetype",
                                        "value": getCharacterProperties(characterId).Archetype
                                    },
                                    {
                                        "trait_type": "Rarity",
                                        "value": getCharacterProperties(characterId).Rarity
                                    }
                                ]
                            },
                        };
                        // buffer_json = JSON.stringify(buffer_json);
                        axios
                            .post(
                                "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                                jsonBody,
                                {
                                    headers: {
                                        pinata_api_key: pinataApiKey,
                                        pinata_secret_api_key:
                                            pinataSecretApiKey,
                                    },
                                }
                            )
                            .then(function (response) {
                                IpfsHash = response.data.IpfsHash;
                                // console.log("success", IpfsHash);
                                toast.success("File Uploaded", {
                                    style: { background: "black" },
                                });
                                toast.dark("NFT Minting", {
                                    style: { background: "black" },
                                });
                                mint(imgName, IpfsHash);
                                handleClose();
                            })
                            .catch(function (_error) {
                                //handle error here
                                setLoading(false);
                                handleClose();
                            });
                    })
                    .catch(function (error) {
                        setLoading(false);
                        handleClose();

                        //handle error here
                        console.log("error", error);
                    });
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const changeImageName = (str) => {
        setImgName(str);
    };

    const getChracterInfo = async (id) => {
        // console.log(id)
        if (!getWalletProvider()) {
            //   alert("Please connect metamask");
            toast.error("Wallet is not Connected", {
                style: { background: "black" },
            });
            // setLoading(false);
            return false;
        }

        let namecontract = getContract(nametagNftAddress, contractABI);
        // console.log("contract", namecontract);
        if (!namecontract) {
            //   console.log("contract error");
            toast.error("contract error", { style: { background: "black" } });
            // setLoading(false);
            return false;
        }

        const characterSupply = await namecontract.getCharacterSupply(id);

        const characterMinted = await namecontract.getCharacterMinted(id);

        setCharacterCount(
            characterMinted.toString() + "/" + characterSupply.toString()
        );

        const price = ethers.utils
            .formatUnits(await namecontract.getCharacterPrice(id), 18)
            .toString();

        console.log("price", price);

        setCharacterPrice(price);
    };
    const selectCharacter = async (e, id) => {
        setLoading(true);
        await getChracterInfo(id);
        setCharacterId(id);
        setImage(<img src={e} id="upload_img" />);
        displayCharacterInfo(id);
        setLoading(false);
        // getCurrentTime();
    };

    const displayCharacterInfo = (id) => {
        switch (id) {
            case 0:
                setBoardText(
                    "Diverse and plentiful, Adventurers are known for their daring battles and exciting tales. Crafting might not come as easily to an Adventurer as other archetypes, but they can learn any craft to prepare for their next campaign."
                );
                setBoardTitle("Adventurer");
                break;
            case 1:
                setBoardText(
                    "The Aetherborne are constantly connected to the celestial plane from which all Aether flows. Aetherborne is the only archetype besides Grandmaster that can manipulate magic to infuse any item they touch while ignoring alignment and rarity restrictions. An Aetherborne can also enchant item sets."
                );
                setBoardTitle("Aetherborne");
                break;
            case 2:
                setBoardText(
                    "Gemcutters are uniquely suited to crafting jewels and precious metals into rings, necklaces, and pendants. They gain a +2 modifier for all Quality Checks while jewelcrafting and it is the only archetype besides Grandmaster that can override the precious metals restriction and make jewelry with any wood, bone, stone, or metal (including legendary materials)."
                );
                setBoardTitle("Gemcutter");
                break;
            case 3:
                setBoardText(
                    "Geomancers are born with an innate understanding of earth that allows them to manipulate metal and stone with deftness and skill. They often find work crafting high-quality blades and heavy armors since they have a +2 modifier for all Quality Checks while blacksmithing. Geomancer is the only archetype besides Grandmaster that can work with legendary metals such as Mithril. "
                );
                setBoardTitle("Geomancer");
                break;
            case 4:
                setBoardText(
                    "The first adventurers to harness Aether to their will, Grandmasters gained their limitless abilities after unrestrained exposure to raw magic. Grandmasters are the ultimate crafters and enchanters; not inhibited by any alignment or rarity restrictions in any profession, and have a +4 modifier for all Quality Checks. They are especially gifted at enchanting armor sets, making them revered throughout the Aetherverse."
                );
                setBoardTitle("Grandmaster");
                break;
            case 5:
                setBoardText(
                    "Mysteriously gifted, Savants have gained a vast knowledge of crafting techniques through their own research and experimentation. Though limited by normal alignment and rarity restrictions, Savants have a +2 modifier for all Quality Checks in every profession. A Savant can also enchant item sets."
                );
                setBoardTitle("Savant");
                break;
            case 6:
                setBoardText(
                    "Shapers are renowned for their craftsmanship using wood and bone; their staves stand taller, their bows shoot farther, and their carvings carry an almost supernatural beauty. Shapers have a +2 modifier for all Quality Checks while woodworking and it is the only archetype besides Grandmaster that can work with legendary wood such as celestial lumber."
                );
                setBoardTitle("Shaper");
                break;
            case 7:
                setBoardText(
                    "Weavers use their genius in tailoring and leatherworking to make exquisite clothing, light armor, and medium armor fit for royalty. Weavers benefit from a +2 modifier for all Quality Checks while tailoring and leatherworking, and it is the only archetype besides Grandmaster that can work with legendary fabrics like shadowsilk and hides like dragonscale."
                );
                setBoardTitle("Weaver");
                break;
        }
    };

    return (
        <div className="home">
            <Loading className={loading ? "" : "loading_disable"} />
            <div className="board">
                <div className="left">
                    <div
                        className="board-item"
                        onClick={() => {
                            selectCharacter(Adventurer, 0);
                        }}
                        style={{
                            backgroundImage: `url(${AdventurerIcon})`,
                        }}
                    >
                        {/* <img src={Adventurer} /> */}
                        <p>Adventurer</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            selectCharacter(Aetherborne, 1);
                        }}
                        style={{
                            backgroundImage: `url(${AetherborneIcon})`,
                        }}
                    >
                        {/* <img src={Aetherborne} /> */}
                        <p>Aetherborne</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            selectCharacter(Gemcutter, 2);
                        }}
                        style={{
                            backgroundImage: `url(${GemcutterIcon})`,
                        }}
                    >
                        {/* <img src={Gemcutter} /> */}
                        <p>Gemcutter</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            selectCharacter(Geomancer, 3);
                        }}
                        style={{
                            backgroundImage: `url(${GeomancerIcon})`,
                        }}
                    >
                        {/* <img src={Geomancer} /> */}
                        <p>Geomancer</p>
                    </div>
                </div>
                <div className="board-main">
                    <h2>{board_title}</h2>
                    <p>{characterCount}</p>
                    <p className="board_text">{board_text}</p>
                    <div className="board-change">{image}</div>
                    <input
                        type="text"
                        placeholder="Enter Character Name"
                        name="ImageName"
                        value={imgName}
                        onChange={(e) => changeImageName(e.target.value)}
                    />
                    <div className="corner" onClick={handleShow}>
                        <p>MINT</p>
                        <p id="eth">{chracterPrice} ETH</p>
                    </div>
                </div>

                <div className="right">
                    <div
                        className="board-item"
                        onClick={() => {
                            selectCharacter(Grandmaster, 4);
                        }}
                        style={{
                            backgroundImage: `url(${GrandmasterIcon})`,
                        }}
                    >
                        {/* <img src={Grandmaster} /> */}
                        <p>Grandmaster</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            selectCharacter(Savant, 5);
                        }}
                        style={{
                            backgroundImage: `url(${SavantIcon})`,
                        }}
                    >
                        {/* <img src={Savant} /> */}
                        <p>Savant</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            selectCharacter(Shaper, 6);
                        }}
                        style={{
                            backgroundImage: `url(${ShaperIcon})`,
                        }}
                    >
                        {/* <img src={Shaper} /> */}
                        <p>Shaper</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            selectCharacter(Weaver, 7);
                        }}
                        style={{
                            backgroundImage: `url(${WeaverIcon})`,
                        }}
                    >
                        {/* <img src={Weaver} /> */}
                        <p>Weaver</p>
                    </div>
                </div>
            </div>
            <div className="button-items">
                <div className="button-item">
                    <a href="#">
                        <p>Tabletop</p>
                        <span>RPG-Ready</span>
                    </a>
                </div>
                <div className="button-item">
                    <a href="#">
                        {" "}
                        <p>6+</p>
                        <span>Professions</span>
                    </a>
                </div>
                <div className="button-item">
                    <a href="#">
                        <p>Unique</p>
                        <span>Loot & Gear</span>
                    </a>
                </div>
                <div className="button-item">
                    <a href="#">
                        {" "}
                        <p>Amazing</p>
                        <span>NFT Art</span>
                    </a>
                </div>
                <div className="button-item">
                    <a href="#">
                        {" "}
                        <p>Crafting</p>
                        <span>Guilds</span>
                    </a>
                </div>
                <div className="button-item">
                    <a href="#">
                        {" "}
                        <p>Passive</p>
                        <span>Income</span>
                    </a>
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
            />
            <Modal show={show} onHide={handleClose} className="img_modal">
                {image}
                <p className="name_input">{imgName}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="success"
                        style={{ margin: "5px" }}
                        onClick={() => {
                            upload();
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="danger"
                        style={{ margin: "5px" }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
