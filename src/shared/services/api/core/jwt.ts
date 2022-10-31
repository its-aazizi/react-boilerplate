import { useMemo } from "react";

import config from "config/appConfig";
// TODO: fix refresh token functionality
// import Auth from "@aws-amplify/auth";
// import { DateTime, Interval } from "date-fns";

import useLocalStorage from "../../localStorage/localStorage";

let cashedToken = "";
let cashedRefreshToken = "";
let cashedExpiredTime = 0;

const useJwt = () => {
	const localStorage = useLocalStorage();

	return useMemo(() => {
		const refreshToken = async () => {
			// const cognitoUser = await Auth.currentAuthenticatedUser();
			// const refreshToken = cashedRefreshToken || (localStorage.get(config.REFRESH_TOKEN_KEY, null) as string);
			// return new Promise((resolve, reject) => {
			// 	cognitoUser.refreshSession({ getToken: () => refreshToken }, (err, session) => {
			// 		if (err) {
			// 			reject(err);
			// 		}
			// 		resolve(session);
			// 	});
			// });
		};

		const setJwt = (token: string, refreshToken: string, expired: number): void => {
			cashedToken = token;
			cashedRefreshToken = refreshToken;
			cashedExpiredTime = expired;

			localStorage.set(config.TOKEN_KEY, token);
			localStorage.set(config.REFRESH_TOKEN_KEY, refreshToken);
			localStorage.set(config.TOKEN_EXPIRED_KEY, expired.toString());
		};

		const getJwt = async (): Promise<string> => {
			// const token = cashedToken || (localStorage.get(config.TOKEN_KEY, null) as string);
			// const expiredTime = cashedExpiredTime || (localStorage.get(config.TOKEN_EXPIRED_KEY, 0) as number);
			// let validToken = token;
			// if (expiredTime) {
			// 	new Date(expiredTime).get
			// 	const expiredDatetime = DateTime.fromSeconds(expiredTime);
			// 	const currentDatetime = DateTime.now();
			// 	const diff = Interval.fromDateTimes(currentDatetime, expiredDatetime);
			// 	const diffMinutes = diff.length("minutes");
			// 	if (isNaN(diffMinutes) || diffMinutes < 15) {
			// 		const newSession = (await refreshToken()) as any; // CognitoUserSession
			// 		if (newSession) {
			// 			const token = newSession.getAccessToken().getJwtToken();
			// 			const refreshToken = newSession.getRefreshToken().getToken();
			// 			const expired = newSession.getIdToken().payload.exp;
			// 			if (token && refreshToken && expired) {
			// 				setJwt(token, refreshToken, expired);
			// 				validToken = token;
			// 			} else {
			// 				throw new Error("Can’t refresh token");
			// 			}
			// 		}
			// 	}
			// }
			// return validToken;
			return "";
		};

		const hasJwt = (): boolean => {
			const token = cashedToken || (localStorage.get(config.TOKEN_KEY, null) as string);
			return !!token;
		};

		return {
			hasJwt,
			getJwt,
			setJwt,
			injectJwt: async config => {
				const token = await getJwt();
				const header = token ? { Authorization: `Bearer ${token}` } : {};
				return {
					...config,
					headers: {
						"Content-Type": "application/json",
						...header,
						...(config ? config.headers || {} : {})
					}
				};
			},
			injectBase: config => {
				return {
					...config,
					headers: {
						"Content-Type": "application/json",
						...(config ? config.headers || {} : {})
					}
				};
			},
			clearJwt: () => {
				cashedToken = "";
				localStorage.remove(config.TOKEN_KEY);
			}
		};
	}, [localStorage]);
};

export default useJwt;
