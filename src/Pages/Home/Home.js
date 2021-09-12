import React, { Component } from "react";

import classes from "./Home.module.css";
import Row from "../../Components/Row/Row";
import TwoColumnsOnLarge from "../../Components/TwoColumnsOnLarge/TwoColumnsOnLarge";
import RestaurantImage from "../../Assets/restaurant.svg";
import Product from "../../Components/Product/Product";
import firebase from "../../firebase";
import Spinner from "../../Components/Spinner/Spinner";
import SelectedItem from "../../Components/SelectedItem/SelectedItem";
import PageSwitchButton from "../../Components/PageSwitchButton/PageSwitchButton";

export default class Admin extends Component {
	state = {
		products: [],
		selectedProducts: [],
		allProducts: [],
		showSpinner: false,
		search: "",
		totalPrice: 0,
	};
	productCollection = firebase.firestore().collection("products");
	orderCollection = firebase.firestore().collection("orders");

	componentDidMount() {
		this.setState({ showSpinner: true });
		this.productCollection.onSnapshot((snaps) => {
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

	addToCart(id, name, price) {
		const newSelectedProducts = [...this.state.selectedProducts];
		const elementIndex = this.state.selectedProducts.findIndex(
			(e) => e.id === id
		);
		if (elementIndex !== -1) {
			newSelectedProducts[elementIndex].quantity =
				newSelectedProducts[elementIndex].quantity + 1;
			this.setState({
				selectedProducts: newSelectedProducts,
				totalPrice:
					this.state.totalPrice + newSelectedProducts[elementIndex].price,
			});
		} else {
			const item = {
				id,
				name,
				price,
				quantity: 1,
			};
			newSelectedProducts.push(item);
			this.setState({
				selectedProducts: newSelectedProducts,
				totalPrice: this.state.totalPrice + item.price,
			});
		}
	}

	removeFromCart = (id) => {
		const newSelectedProducts = [...this.state.selectedProducts];
		const elementIndex = this.state.selectedProducts.findIndex(
			(e) => e.id === id
		);
		if (newSelectedProducts[elementIndex].quantity === 1) {
			const price = newSelectedProducts[elementIndex].price;
			newSelectedProducts.splice(elementIndex, 1);
			this.setState({
				selectedProducts: newSelectedProducts,
				totalPrice: this.state.totalPrice - price,
			});
		} else {
			newSelectedProducts[elementIndex].quantity =
				newSelectedProducts[elementIndex].quantity - 1;
			this.setState({
				selectedProducts: newSelectedProducts,
				totalPrice:
					this.state.totalPrice - newSelectedProducts[elementIndex].price,
			});
		}
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

	confirmOrder = async () => {
		this.setState({ showSpinner: true });
		try {
			await this.orderCollection.add({
				products: this.state.selectedProducts,
				totalPrice: this.state.totalPrice,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		} catch (err) {
			return console.log(err);
		}
		this.setState({ selectedProducts: [], totalPrice: 0, showSpinner: false });
	};

	render() {
		return (
			<div className={classes.Root}>
				<PageSwitchButton path="/validate" icon="transfer_within_a_station" />
				<div className={`valign-wrapper ${classes.TopSection}`}>
					<h2 className="text-accent-1 materialize-red-text">Bethak</h2>
					<img
						src={RestaurantImage}
						alt="Restaurant"
						className={classes.RestaurantImage}
					/>
				</div>
				<Row classes={classes.Row}>
					<TwoColumnsOnLarge classes={classes.List}>
						<div className={`input-field ${classes.TextField}`}>
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
						{this.state.showSpinner ? (
							<div className={`center-block ${classes.Spinner}`}>
								<Spinner />
							</div>
						) : this.state.products.length > 0 ? (
							this.state.products.map((p) => {
								return (
									<div key={p.id} className={classes.SingleProduct}>
										<Product
											name={p.name}
											price={p.price}
											addToCart={(name, price) =>
												this.addToCart(p.id, name, price)
											}
										/>
									</div>
								);
							})
						) : (
							<h6 className="center-block grey-text">No Products Added</h6>
						)}
					</TwoColumnsOnLarge>
					<TwoColumnsOnLarge classes={classes.List}>
						<Row classes={classes.Row}>
							<div className="col s9">
								<button
									className={`btn btn-large waves-effect waves-light center-block blue-grey darken-3 ${
										this.state.selectedProducts.length > 0 ? "" : "disabled"
									} ${classes.Visible}`}
									onClick={this.confirmOrder}
								>
									Confirm Order<i className="material-icons right">send</i>
								</button>
							</div>
							<div className="col s3">
								<h6 className="white-text">
									<strong>Total Price: </strong>
									{this.state.totalPrice}
								</h6>
							</div>
						</Row>

						{this.state.selectedProducts.length > 0 ? (
							this.state.selectedProducts.map((p) => {
								return (
									<div key={p.id} className={classes.SingleProduct}>
										<SelectedItem
											name={p.name}
											price={p.price}
											quantity={p.quantity}
											addToCart={() => this.addToCart(p.id)}
											removeFromCart={() => {
												this.removeFromCart(p.id);
											}}
										/>
									</div>
								);
							})
						) : (
							<h6 className="center-block grey-text">
								Selected Products Will Be Shown Here
							</h6>
						)}
					</TwoColumnsOnLarge>
				</Row>
			</div>
		);
	}
}
