import React from "react";
import { Link } from "react-router-dom";
import classes from "./PageSwitchButton.module.css";

const PageSwitchButton = (props) => {
	return (
		<Link
			className={`btn btn-small waves-effect waves-light blue btn-floating blue-grey darken-3 ${classes.Button}`}
			to={props.path}
			replace={props.replace ? props.replace : false}
		>
			<i className="material-icons">{props.icon}</i>
		</Link>
	);
};

export default PageSwitchButton;
