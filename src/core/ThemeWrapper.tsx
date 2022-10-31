import React, { ReactNode } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "theme";

interface ThemeWrapperProps {
	children?: ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => (
	<ThemeProvider theme={appTheme}>{children}</ThemeProvider>
);

export default ThemeWrapper;
