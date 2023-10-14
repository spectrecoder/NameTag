import { useState, useEffect } from "react";
const Loading = ({ ...restProps }) => {
    const [active, setActive] = useState("");

    useEffect(() => {});

    const tempfunction = (id) => {
        setActive(id);
    };

    return (
        <div id="load_div" {...restProps}>
            <img src="img/loading.gif" className="loading" />
        </div>
    );
};

export default Loading;
