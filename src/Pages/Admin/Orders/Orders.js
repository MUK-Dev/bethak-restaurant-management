import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min";

import classes from "./Orders.module.css";
import firebase from "../../../firebase";
import Spinner from "../../../Components/Spinner/Spinner";
import Order from "../../../Components/Order/Order";
import Row from "../../../Components/Row/Row";

export default class Orders extends Component {
	state = {
		orders: [],
		allOrders: [],
		fromDate: "",
		toDate: "",
		revenue: 0,
		showSpinner: false,
		showRemoveFilter: false,
		showRecord: false,
	};
	ordersCollection = firebase.firestore().collection("orders");

	async componentDidMount() {
		this.setState({ showSpinner: true });
		await this.ordersCollection
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshots) => {
				const orders = [];
				snapshots.forEach((snap) => {
					const item = {
						id: snap.id,
						...snap.data(),
					};
					orders.push(item);
				});
				this.calculateRevenue(orders);
				this.setState({ orders, allOrders: orders, showSpinner: false });
			});

		let elems1 = document.querySelectorAll(".datepicker1");
		let instances1 = M.Datepicker.init(elems1, {
			onClose: () => {
				this.setState({ fromDate: instances1[0].date });
			},
		});
		let elems2 = document.querySelectorAll(".datepicker2");
		let instances2 = M.Datepicker.init(elems2, {
			onClose: () => {
				this.setState({ toDate: instances2[0].date });
			},
		});
	}

	filter = (e) => {
		e.preventDefault();
		this.setState({ showSpinner: true });
		const filteredOrders = [];
		this.state.allOrders.map((o) => {
			const timestamp = o.timestamp.seconds * 1000;

			if (
				new Date(timestamp).getDate() >=
					new Date(this.state.fromDate).getDate() &&
				new Date(timestamp).getDate() <= new Date(this.state.toDate).getDate()
			) {
				return filteredOrders.push(o);
			}
			return null;
		});
		this.calculateRevenue(filteredOrders);
		this.setState({
			orders: filteredOrders,
			showRemoveFilter: true,
			showSpinner: false,
		});
	};

	calculateRevenue = (orders) => {
		let r = 0;
		for (let o in orders) {
			r = r + orders[o].totalPrice;
		}
		this.setState({ revenue: r });
	};

	removeFilter = () => {
		this.calculateRevenue(this.state.allOrders);
		this.setState({
			orders: this.state.allOrders,
			fromDate: "",
			toDate: "",
			showRemoveFilter: false,
		});
	};

	toggleRecord = () => {
		this.setState({ showRecord: !this.state.showRecord });
	};

	render() {
		const orders = this.state.orders.map((o) => {
			return (
				<div key={o.id}>
					<Order
						products={o.products}
						price={o.totalPrice}
						timestamp={o.timestamp}
					/>
					<hr />
				</div>
			);
		});

		let disabled;
		if (this.state.fromDate !== "" && this.state.toDate !== "") {
			disabled = false;
		} else {
			disabled = true;
		}
		const fromDate = isNaN(new Date(this.state.fromDate))
			? null
			: new Date(this.state.fromDate);
		const toDate = isNaN(new Date(this.state.toDate))
			? null
			: new Date(this.state.toDate);

		const record = (
			<div
				className={[
					classes.RecordShow,
					this.state.showRecord ? null : classes.RecordHide,
				].join(" ")}
			>
				<Row classes={["valign-wrapper", classes.NoMargin].join(" ")}>
					<button onClick={this.toggleRecord} className="col s2">
						<i
							className={[
								"material-icons",
								classes.Icon,
								this.state.showRecord ? null : classes.IconInverted,
							].join(" ")}
						>
							arrow_back
						</i>
					</button>
					<div className="col s10">
						<p className="white-text">
							<strong>Total Orders: </strong>
							{this.state.orders.length}
						</p>
						<p className="white-text">
							<strong>Total Revenue: Rs </strong>
							{this.state.revenue}
						</p>
					</div>
				</Row>
			</div>
		);

		return (
			<div className={classes.Root}>
				{record}
				<button
					className={`btn btn-small waves-effect waves-light grey darken-4 ${
						this.state.showRemoveFilter ? "" : classes.ClearFilterButton
					}`}
					onClick={this.removeFilter}
				>
					Clear Filters
				</button>
				<form onSubmit={this.filter}>
					<input
						type="text"
						placeholder="From Date"
						readOnly
						value={
							fromDate
								? `${fromDate.getDate()}/${
										fromDate.getMonth() + 1
								  }/${fromDate.getFullYear()}`
								: ""
						}
						className={`datepicker1 white-text ${classes.DataPicker}`}
					/>
					<input
						type="text"
						placeholder="To Date"
						readOnly
						value={
							toDate
								? `${toDate.getDate()}/${
										toDate.getMonth() + 1
								  }/${toDate.getFullYear()}`
								: ""
						}
						className={`datepicker2 white-text ${classes.DataPicker}`}
					/>
					<button
						className={`btn btn-small btn-floating waves-effect waves-light grey darken-4 ${
							disabled ? "disabled" : ""
						}`}
					>
						<i className="material-icons">filter_list</i>
					</button>
				</form>
				{this.state.showSpinner ? (
					<div style={{ margin: "70px 0 0 0" }}>
						<Spinner />
					</div>
				) : (
					<div>{orders}</div>
				)}
			</div>
		);
	}
}
