import React from "react";

import classes from "./Product.module.css";

const Product = (props) => {
	const { name, price } = props;
	return (
		<button
			onClick={() => props.addToCart(name, price)}
			className={classes.Product}
		>
			<h5>{name}</h5>
			<p>
				<strong>Price: </strong>Rs {price}
			</p>
		</button>
	);
};

export default Product;
