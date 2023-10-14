import divider from "../img/divider.png";
import divider2 from "../img/divider2.png";
import medium from "../img/medium.png";
import medium_mobile from "../img/medium_mobile.png";
import twitter from "../img/twitter.png";
import twitter_mobile from "../img/twitter_mobile.png";
import discord from "../img/discord.png";
import discord_mobile from "../img/discord_mobile.png";
import logo from "../img/logo.png";
import roughborder from "../img/roughborder.png";
import { Col, Row } from "react-bootstrap";

export default function () {
    return (
        <div className="inventory">
            <div className="roadmap">
                <img src={roughborder} className="rough" />
                <div className="roadmap-content">
                    <h2>Roadmap</h2>
                    <img src={divider} />
                    <p>
                        We are working hard to make Mythik
                        <span>
                            <sup>TM</sup>
                        </span>{" "}
                        the best experience possible.
                    </p>
                    <p>
                        Read an indepth explanation of our{" "}
                        <a href="#">roadmap here.</a>
                    </p>
                    <Row className="roadmap-titles">
                        <Col className="roadmap-title">
                            <h3>2022Q1</h3>
                            <p>Name and Guild</p>
                            <p>Reservations</p>
                            <br />
                            <p>NFT Character</p>
                            <p>Sheet</p>
                        </Col>
                        <Col className="roadmap-title">
                            <h3>2022Q1</h3>
                            <p>Name and Guild</p>
                            <p>Reservations</p>
                            <br />
                            <p>NFT Character</p>
                            <p>Sheet</p>
                        </Col>
                        <Col className="roadmap-title">
                            <h3>2022Q1</h3>
                            <p>Name and Guild</p>
                            <p>Reservations</p>
                            <br />
                            <p>NFT Character</p>
                            <p>Sheet</p>
                        </Col>
                        <Col className="roadmap-title">
                            <h3>2022Q1</h3>
                            <p>Name and Guild</p>
                            <p>Reservations</p>
                            <br />
                            <p>NFT Character</p>
                            <p>Sheet</p>
                        </Col>
                    </Row>
                    <img src={divider2} />
                </div>
            </div>
            <div className="contact-social">
                <div className="socials">
                    <h2>Join Our Discord & Social Media</h2>
                    <div className="social-items">
                        <img src={medium} />
                        <img src={twitter} />
                        <img src={discord} />
                    </div>
                    <img src={logo} />
                    <div>
                        <a href="#">Press</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Legal Documentation</a>
                        <a href="#">About Us</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Sitemap</a>
                    </div>
                    <p>
                        All trademarks referenced herein are the properties of
                        their respective owners.
                    </p>
                    <p>
                        @2022 Aetherverse
                        <span>
                            <sup>TM</sup>
                        </span>{" "}
                        Studios. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
