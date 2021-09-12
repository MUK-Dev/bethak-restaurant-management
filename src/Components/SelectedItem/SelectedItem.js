import React from "react";
import classes from "./SelectedItem.module.css";
import Row from "../Row/Row";

const SelectedItem = (props) => {
	const { name, price, quantity } = props;
	return (
		<Row classes={`valign-wrapper ${classes.SelectedProduct}`}>
			<div className="col s7">
				<h5>{name}</h5>
				<p>
					<strong>Price: </strong>Rs {price}
				</p>
				<p>
					<strong>Quantity: </strong>
					{quantity}
				</p>
			</div>
			<div className="col s5">
				<button
					onClick={props.removeFromCart}
					className={`btn btn-floating btn-small waves-effect waves-light blue-grey darken-3 ${classes.Buttons}`}
				>
					<i className="material-icons">exposure_neg_1</i>
				</button>
				<button
					onClick={props.addToCart}
					className={`btn btn-floating btn-small waves-effect waves-light blue-grey darken-3 ${classes.Buttons}`}
				>
					<i className="material-icons">exposure_plus_1</i>
				</button>
			</div>
		</Row>
	);
};

export default SelectedItem;
