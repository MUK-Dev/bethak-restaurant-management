import React from "react";

const Row = (props) => {
	return <div className={`row ${props.classes}`}>{props.children}</div>;
};

export default Row;
