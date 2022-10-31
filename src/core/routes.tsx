import { ReactNode } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "modules/Home/Pages";

import { Module } from "shared/types";

import ThemeWrapper from "./ThemeWrapper";

const routes = (modules: Module[]) => {
	return (
		<ThemeWrapper>
			<BrowserRouter key="root">
				<Routes>
					<Route path="/" element={<HomePage />} />
					{/* TODO: Add error routes */}
					{/* <Route key={"AccessDenied"} path="/AccessDenied" element={<AccessDenied />} /> */}
					{modules.map(({ getRoutes }) => (getRoutes ? getRoutes() : null) as ReactNode)}
				</Routes>
			</BrowserRouter>
			{/* TODO: implement toast message functionality */}
			{/* <ToastContainer /> */}
		</ThemeWrapper>
	);
};

export default routes;
