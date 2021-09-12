import React from "react";
import classes from "./OrderedProduct.module.css";

const OrderedProduct = (props) => {
	const { name, price, quantity } = props;
	return (
		<div className={classes.Root}>
			<h6>
				<strong>Name: </strong>
				{name}
			</h6>
			<p>
				<strong>Price of Single Unit: </strong>
				{price}
			</p>
			<p>
				<strong>Quantity Bought: </strong>
				{quantity}
			</p>
		</div>
	);
};

export default OrderedProduct;
