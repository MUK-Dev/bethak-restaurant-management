import React, { Component } from "react";
import classes from "./Admin.module.css";
import { NavLink } from "react-router-dom";

import PageSwitchButton from "../../Components/PageSwitchButton/PageSwitchButton";

export default class Admin extends Component {
	render() {
		return (
			<div>
				<PageSwitchButton
					path="/"
					icon="transfer_within_a_station"
					replace={true}
				/>
				<div className={`navbar-fixed ${classes.Fixed}`}>
					<nav className={`center-align ${classes.Nav}`}>
						<NavLink
							to="/admin"
							className={classes.NavButton}
							activeClassName={classes.Active}
							exact
						>
							Orders
						</NavLink>
						<NavLink
							to="/admin/add-product"
							className={classes.NavButton}
							activeClassName={classes.Active}
							exact
						>
							Add New Product
						</NavLink>
						<NavLink
							to="/admin/edit-products"
							className={classes.NavButton}
							activeClassName={classes.Active}
							exact
						>
							Edit Products
						</NavLink>
					</nav>
				</div>
				<div>{this.props.children}</div>
			</div>
		);
	}
}
