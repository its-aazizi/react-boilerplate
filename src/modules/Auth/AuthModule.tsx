import { Route } from "react-router-dom";

import { Module } from "shared/types";

import { LoginPage, RegisterPage } from "./Pages";
import { routes } from "./constants";

class AuthModule implements Module {
	getRoutes = () => [<Route key="auth-routes">{this.getPublicRoutes()}</Route>];

	getPublicRoutes = () => {
		console.log({ path: routes.login.getPath() });
		return [
			<Route key={routes.login.getElementKey()} path={routes.login.getPath()} element={<LoginPage />} />,
			<Route key={routes.register.getElementKey()} path={routes.register.getPath()} element={<RegisterPage />} />
		];
	};
}

export default AuthModule;
