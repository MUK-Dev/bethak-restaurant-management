import React from "react";

const TwoColumnsOnLarge = (props) => {
	return <div className={`col s12 m6 ${props.classes}`}>{props.children}</div>;
};

export default TwoColumnsOnLarge;
