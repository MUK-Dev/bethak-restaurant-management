import React, { Component } from "react";
import classes from "./Validate.module.css";
import firebase from "../../firebase";

import Spinner from "../../Components/Spinner/Spinner";
import PageSwitchButton from "../../Components/PageSwitchButton/PageSwitchButton";

export default class Validate extends Component {
	state = {
		key: "",
		pass: "",
		showSpinner: false,
	};
	passwordCollection = firebase.firestore().collection("password");

	componentDidMount() {
		this.setState({ showSpinner: true });
		this.passwordCollection
			.get()
			.then((res) => {
				res.forEach((s) => {
					if (s.id === "f4BMJN3W0qu9BqkvyCFH") {
						this.setState({ key: s.data().key, showSpinner: false });
					}
				});
			})
			.catch((err) => {
				console.log(err);
				this.setState({ showSpinner: false });
			});
	}

	passwordHandler = (e) => {
		this.setState({ pass: e.target.value });
		if (e.target.value === this.state.key) {
			this.props.history.replace("/admin");
		}
	};

	render() {
		return (
			<div className={classes.Root}>
				<PageSwitchButton path="/" icon="arrow_back" />
				{this.state.showSpinner ? (
					<Spinner />
				) : (
					<div className={`input-field center-block ${classes.TextField}`}>
						<input
							type="password"
							className="validate white-text"
							value={this.state.pass}
							onChange={this.passwordHandler}
							autoComplete="off"
							placeholder="Enter Password"
						/>
					</div>
				)}
			</div>
		);
	}
}
