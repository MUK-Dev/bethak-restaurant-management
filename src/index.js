import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

import Admin from "./Pages/Admin/Admin";
import Home from "./Pages/Home/Home";
import Validate from "./Pages/Validate/Validate";
import Orders from "./Pages/Admin/Orders/Orders";
import AddProducts from "./Pages/Admin/AddProducts/AddProducts";
import EditProducts from "./Pages/Admin/EditProducts/EditProducts";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/validate" exact component={Validate} />
					<Route path="/admin">
						<Admin>
							<Switch>
								<Route path="/admin/" exact component={Orders} />
								<Route
									path="/admin/add-product"
									exact
									component={AddProducts}
								/>
								<Route
									path="/admin/edit-products"
									exact
									component={EditProducts}
								/>
							</Switch>
						</Admin>
					</Route>
				</Switch>
			</App>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
