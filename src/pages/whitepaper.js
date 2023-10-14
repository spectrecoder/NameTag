import divider from "../img/divider.png";
import divider2 from "../img/divider2.png";
import member1 from "../img/member1.png";
import member2 from "../img/member2.png";
import member3 from "../img/member3.png";
import roughborder from "../img/roughborder.png";
import crescent2 from "../img/crescent2.png";
import crescent1 from "../img/crescent1.png";
import { Button } from "react-bootstrap";

export default function () {
    return (
        <div className="whitepaper" id="whitepaper">
            <div className="paper-content">
                <img src={roughborder} className="rough" />
                <div className="paper-title">
                    <h2>
                        Part of the Expanding Aetherverse
                        <span>
                            <sup>TM</sup>
                        </span>
                    </h2>
                    <img src={divider} />
                    <p>
                        Mythik
                        <span>
                            <sup>TM</sup>
                        </span>{" "}
                        is made by Aetherverse
                        <span>
                            <sup>TM</sup>
                        </span>
                        Studios.
                    </p>
                    <p>
                        We believe NFTs are the future of computer and tabletop
                        gaming.
                    </p>
                    <p>Help us build the future together!</p>
                    <Button className="paper-button">
                        Read our White Paper
                    </Button>
                    <a href="#">
                        <p>Join Discord</p>
                    </a>
                    <img src={divider2} />
                </div>
            </div>
            <div className="team">
                <img src={crescent2} className="divider" />
                <div>
                    <h2>Team</h2>
                    <img src={divider} />
                    <div className="team-members">
                        <div className="team-member">
                            <img src={member1} />
                            <h3>John Doe</h3>
                            <p>Your Profession</p>
                        </div>
                        <div className="team-member">
                            <img src={member2} />
                            <h3>John Doe</h3>
                            <p>Your Profession</p>
                        </div>
                        <div className="team-member">
                            <img src={member3} />
                            <h3>John Doe</h3>
                            <p>Your Profession</p>
                        </div>
                    </div>
                </div>
                <img src={crescent1} className="divider" />
            </div>
        </div>
    );
}
