import React, { Component } from "react";

import classes from "./EditProducts.module.css";
import Row from "../../../Components/Row/Row";
import DeleteProduct from "../../../Components/DeleteProduct/DeleteProduct";
import firebase from "../../../firebase";
import Spinner from "../../../Components/Spinner/Spinner";

export default class EditProducts extends Component {
	state = {
		products: [],
		allProducts: [],
		showSpinner: false,
		search: "",
	};

	productsCollection = firebase.firestore().collection("products");

	async componentDidMount() {
		this.setState({ showSpinner: true });
		await this.productsCollection.onSnapshot((snaps) => {
			const p = [];
			snaps.forEach((snap) => {
				const item = {
					id: snap.id,
					...snap.data(),
				};
				p.push(item);
			});
			this.setState({ products: p, allProducts: p, showSpinner: false });
		});
	}

	deleteProduct = async (id) => {
		this.setState({ showSpinner: true });
		await this.productsCollection.doc(id).delete();
		this.setState({ showSpinner: false });
	};

	search = (e) => {
		const { allProducts } = this.state;
		this.setState({ search: e.target.value });
		if (e.target.value.length === 0) {
			return this.setState({ products: this.state.allProducts });
		}
		const newProducts = [];
		allProducts.map((p) => {
			if (p.name.toLowerCase().includes(e.target.value.toLowerCase())) {
				return newProducts.push(p);
			}
			return null;
		});
		this.setState({ products: newProducts });
	};

	render() {
		let products;
		if (this.state.showSpinner) {
			products = <Spinner />;
		} else {
			products = this.state.products.map((p) => {
				return (
					<div key={p.id} className="col s6 m4 l3">
						<DeleteProduct
							name={p.name}
							price={p.price}
							deleteButton={() => this.deleteProduct(p.id)}
						/>
					</div>
				);
			});
		}

		return (
			<div className={classes.Root}>
				<div className={`input-field ${classes.TextField} center-block`}>
					<input
						id="search"
						type="text"
						className="validate white-text"
						value={this.state.search}
						onChange={this.search}
						autoComplete="off"
						placeholder="Search"
					/>
				</div>
				<Row>{products}</Row>
			</div>
		);
	}
}
