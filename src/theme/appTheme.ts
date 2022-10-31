import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Theme {}

	interface ThemeOptions {}
}

// To update theme, https://mui.com/material-ui/customization/default-theme/
const theme = createTheme({});

export default theme;
