import React, { Component } from "react";

import classes from "./AddProducts.module.css";
import firebase from "../../../firebase";
import Spinner from "../../../Components/Spinner/Spinner";

export default class AddProducts extends Component {
	state = {
		nameField: "",
		priceField: NaN,
		showSpinner: false,
	};

	productsCollection = firebase.firestore().collection("products");

	addProductHandler = async (e) => {
		e.preventDefault();
		this.setState({ showSpinner: true });
		const product = {
			name: this.state.nameField,
			price: this.state.priceField,
		};
		try {
			await this.productsCollection.add(product);
		} catch (err) {
			return console.log(err);
		}
		this.setState({ nameField: "", priceField: NaN, showSpinner: false });
	};

	nameValueChanger = (e) => {
		this.setState({ nameField: e.target.value });
	};

	priceValueChanger = (e) => {
		this.setState({ priceField: parseInt(e.target.value) });
	};

	render() {
		const form = (
			<form onSubmit={this.addProductHandler}>
				<div className={`input-field ${classes.TextField} center-block`}>
					<input
						id="name"
						type="text"
						className="validate white-text"
						value={this.state.nameField}
						onChange={this.nameValueChanger}
						autoComplete="off"
						placeholder="Name of Product"
					/>
				</div>
				<div className={`input-field ${classes.TextField} center-block`}>
					<input
						id="price"
						type="number"
						className="validate white-text"
						value={isNaN(this.state.priceField) ? "" : this.state.priceField}
						onChange={this.priceValueChanger}
						autoComplete="off"
						placeholder="Price of Product"
					/>
					<p className="white-text">
						*Rs* will be included when the product is displayed
					</p>
				</div>
				{this.state.showSpinner ? (
					<Spinner />
				) : (
					<button
						type="submit"
						className="btn btn-block waves-effect waves-light grey darken-4 "
					>
						Add Product
					</button>
				)}
			</form>
		);
		return <div className={classes.Root}>{form}</div>;
	}
}
