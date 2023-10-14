import divider from "../img/divider.png";
import charactersheet1 from "../img/charactersheet1.png";
import charactersheet2 from "../img/charactersheet2.png";

export default function () {
    return (
        <div className="charactersheet" id="charactersheet">
            <img src={divider} />
            <h2>
                <span>NFT</span> Character Sheet
            </h2>
            <img src={divider} />
            <br />
            <div className="charactersheet-body">
                <div className="character-size1">
                    <img src={charactersheet1} className="character-size1" />
                </div>
                <img src={charactersheet2} className="character-size2" />
                <div className="character-size1 content1">
                    <h2>Champion Backstory</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adlpiscing elit,
                        sed do elusmod tempor incididunt ut labore et dolore et
                        dolore magna aliqua.
                        <br />
                        Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip exea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        <br />
                        Excepteur sint occaecat cupidatat non proident. sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    );
}
