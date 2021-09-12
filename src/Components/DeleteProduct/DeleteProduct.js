import React from "react";
import classes from "./DeleteProduct.module.css";

const DeleteProduct = (props) => {
	const { name, price, deleteButton } = props;
	return (
		<div className={`card ${classes.Card}`}>
			<span className="card-title">{name}</span>
			<div className="card-content">
				<p>
					<strong>Price: </strong>
					{price}
				</p>
			</div>
			<button
				className="btn-floating halfway-fab waves-effect waves-light red"
				onClick={deleteButton}
			>
				<i className="material-icons">delete_forever</i>
			</button>
		</div>
	);
};

export default DeleteProduct;
