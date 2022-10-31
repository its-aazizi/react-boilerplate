export default {
	TOKEN_KEY: "token",
	REFRESH_TOKEN_KEY: "refresh-token",
	TOKEN_EXPIRED_KEY: "token-expired",
	HOOK_STORAGE_KEYS: {
		AUTH_DATA: "AuthData",
		USER_DATA: "UserData"
	},
	ROUTES: {
		HOME: "/home",
		LOGIN: "/login",
		UNAUTHORIZED: "/401",
		FORBIDDEN: "/403",
		NOT_FOUND: "/404"
	},
	GLOBAL_CONSTANTS: {
		BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL,
		LOCAL_STORAGE_PREFIX: import.meta.env.VITE_LOCAL_STORAGE_PREFIX
	}
};
