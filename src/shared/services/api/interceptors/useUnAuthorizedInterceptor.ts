import { useCallback } from "react";
// import config from "config/appConfig";
// import { useNavigate } from "react-router-dom";
import ApiError from "../core/ApiError";

// const { GLOBAL_CONSTANTS } = config;

const useUnAuthorizedInterceptor = () => {
	// const navigate = useNavigate();
	// const url = `${window.location.pathname}${window.location.search}`;

	return useCallback(
		({ status }: ApiError) => {
			console.warn("useUnAuthorizedInterceptor() UNAUTHORIZED", { status, location });
			// if (status === 401) {
			// 	for (const key in localStorage) {
			// 		if (key.includes(GLOBAL_CONSTANTS.LOCAL_STORAGE_PREFIX ?? "")) localStorage.removeItem(key);
			// 	}

			// 	navigate(`${CORE_URLS.LOGIN}?next=${url}`);
			// }
		},
		// [navigate, url]
		[]
	);
};

export default useUnAuthorizedInterceptor;
