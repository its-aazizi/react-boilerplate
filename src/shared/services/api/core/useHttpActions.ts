import { useMemo } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import appConfig from "config/appConfig";
import { omit } from "ramda";
import { z } from "zod";
import { handleZodResolvers } from "utils/handleZodResolvers";
import ApiError from "./ApiError";
import useJwt from "./jwt";
import { useUnAuthorizedInterceptor } from "../interceptors";

interface OptionProps {
	customErrorHandlers?: any[];
}

interface AxiosZodOptions extends AxiosRequestConfig {
	resolvers?: { resolver: z.ZodObject<any>; fields?: string[] }[];
}

const useHttpActions = (options?: OptionProps) => {
	const { injectJwt, injectBase } = useJwt();
	const interceptUnAuthorized = useUnAuthorizedInterceptor();

	return useMemo(() => {
		const errorInterceptors: any[] = options?.customErrorHandlers || [interceptUnAuthorized];

		const config: AxiosRequestConfig = {
			baseURL: appConfig.GLOBAL_CONSTANTS.BACKEND_API_URL,
			withCredentials: false,
			validateStatus: status => status >= 200 && status < 300
		};

		const request = axios.create(config);

		request.interceptors.response.use(
			response => response,
			response => {
				if (response.response) {
					const { status, data } = response.response;
					const apiErrorInstance = new ApiError(status, data.errors || [], data.message);
					errorInterceptors.forEach(f => f(apiErrorInstance));
					throw apiErrorInstance;
				} else {
					throw Error(response.message);
				}
			}
		);
		return {
			get: async (url: string, params?: any, options?: AxiosZodOptions): Promise<any> => {
				try {
					const response = await request.get(url, await injectJwt({ params, ...omit(["resolvers"], options) }));

					if (options?.resolvers) return handleZodResolvers(options.resolvers, response);

					return response;
				} catch (error) {
					console.error({ error });
				}
			},
			post: async <T>(url: string, formData: T, options?: AxiosZodOptions): Promise<any> => {
				try {
					const response = await request.post(url, formData, await injectJwt(omit(["resolvers"], options)));

					if (options?.resolvers) return handleZodResolvers(options.resolvers, response);

					return response;
				} catch (error) {
					console.error({ error });
				}
			},
			delete: async <T>(
				url: string,
				data?: any,
				params?: any,
				options?: AxiosZodOptions
			): Promise<AxiosResponse<T>> => {
				const config = { url, data, params, ...options };
				return request.delete(url, await injectJwt(config));
			},
			put: async <T>(url: string, data: any, params?: any, options?: AxiosZodOptions): Promise<AxiosResponse<T>> => {
				return request.put(url, data, { params, ...(await injectJwt(options)) });
			},
			patch: async <T>(url: string, data: any, params?: any, options?: AxiosZodOptions): Promise<AxiosResponse<T>> => {
				return request.patch(url, data, { params, ...(await injectJwt(options)) });
			},
			getOriginal: <T>(url: string, params?: any, options?: AxiosZodOptions): Promise<AxiosResponse<T>> => {
				return request.get(url, { params, ...injectBase(options) });
			},
			putOriginal: <T>(url: string, data: any, params?: any, options?: AxiosZodOptions): Promise<AxiosResponse<T>> => {
				return request.put(url, data, { params, ...options });
			},
			getBlob: async (url: string, options?: AxiosZodOptions): Promise<string> => {
				return axios({
					url,
					method: "GET",
					responseType: "blob",
					...(await injectJwt(options))
				}).then(response => window.URL.createObjectURL(new Blob([response.data], { type: "text/csv;charset=utf-8;" })));
			}
		};
	}, [injectJwt, injectBase, interceptUnAuthorized, options]);
};

export default useHttpActions;
