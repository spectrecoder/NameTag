import common from "../img/1common.png";
import uncommon from "../img/2uncommon.png";
import rare from "../img/3rare.png";
import epic from "../img/4epic.png";
import legendary from "../img/5legendary.png";
import lightsword from "../img/lightsword.png";
import darksword from "../img/darksword.png";
import icesword from "../img/icesword.png";
import firesword from "../img/firesword1.png";
import divider from "../img/divider.png";
import divider2 from "../img/divider2.png";

export default function () {
    return (
        <div className="marketplace">
            <div className="content">
                <h2>
                    <span>NFT Crafting</span> for Tabletop RPGS
                </h2>
                <p>
                    Mythik
                    <span>
                        <sup>TM</sup>
                    </span>{" "}
                    is made by and for fans of all RPGs.
                </p>
                <p>Craft, upgrade, enchant... play.</p>
            </div>
            <img src={divider} />
            <div className="market-items">
                <div className="market-item">
                    <img src={common} />
                    <p>Common</p>
                </div>
                <div className="market-item">
                    <img src={uncommon} />
                    <p>Uncommon</p>
                </div>
                <div className="market-item">
                    <img src={rare} />
                    <p>Rare</p>
                </div>
                <div className="market-item">
                    <img src={epic} />
                    <p>Epic</p>
                </div>
                <div className="market-item">
                    <img src={legendary} />
                    <p>Legendary</p>
                </div>
            </div>
            <img src={divider} />
            <h2>Choose from Dozens of Materials and Enchantments</h2>
            <div className="dozens-knifes">
                <div>
                    <img src={lightsword} />
                    <img src={darksword} className="knife-left" />
                </div>
                <div>
                    <img src={icesword} />
                    <img src={firesword} className="knife-right" />
                </div>
            </div>
            <img src={divider2} />
        </div>
    );
}
