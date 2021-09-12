import React from "react";

import classes from "./Order.module.css";
import OrderedProduct from "./OrderedProduct/OrderedProduct";
import Row from "../Row/Row";

const Order = (props) => {
	const { products, price, timestamp } = props;
	const orderDate = new Date(timestamp.seconds * 1000);
	let colMedAndUp;
	if (products.length === 1) {
		colMedAndUp = "m12";
	} else if (products.length === 2) {
		colMedAndUp = "m6";
	} else if (products.length === 3) {
		colMedAndUp = "m4";
	} else {
		colMedAndUp = "m3";
	}
	return (
		<div className={classes.Order}>
			<p>
				<strong>Order Date</strong>{" "}
				{`${orderDate.getDate()}/${
					orderDate.getMonth() + 1
				}/${orderDate.getFullYear()}`}
			</p>
			<p>
				<strong>Total Price: </strong>Rs {price}
			</p>
			<Row classes={classes.Row}>
				{products.map((p) => {
					return (
						<div key={p.id} className={`col s12 ${colMedAndUp}`}>
							<OrderedProduct
								name={p.name}
								price={p.price}
								quantity={p.quantity}
							/>
						</div>
					);
				})}
			</Row>
		</div>
	);
};

export default Order;
