import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
	plugins: [
		react(),
		svgr(),
		eslint({
			fix: true,
			failOnError: false
		})
	],
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "./src/assets"),
			config: path.resolve(__dirname, "./src/config"),
			core: path.resolve(__dirname, "./src/core"),
			modules: path.resolve(__dirname, "./src/modules"),
			shared: path.resolve(__dirname, "./src/shared"),
			theme: path.resolve(__dirname, "./src/theme"),
			utils: path.resolve(__dirname, "./src/utils")
		}
	},
	server: {
		port: 3000
	},
	build: {
		outDir: "./build"
	}
});
