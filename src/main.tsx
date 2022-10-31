import { StrictMode, Suspense } from "react";

import { Box } from "@mui/system";
import ReactDOM from "react-dom/client";

import AuthModule from "modules/Auth/AuthModule";

import generateRoutes from "./core/routes";

const authModule = new AuthModule();
const modules = [authModule];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<Suspense fallback={<Box>Loading...</Box>}>{generateRoutes(modules)}</Suspense>
	</StrictMode>
);
