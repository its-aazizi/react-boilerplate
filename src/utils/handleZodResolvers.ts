import { AxiosResponse } from "axios";
import { z } from "zod";

export interface ZodResolverHandler {
	field?: string;
	data: {
		[x: string]: any;
	};
}

export const handleZodResolvers = async (
	resolvers: {
		resolver: z.ZodObject<any>;
		fields?: string[];
	}[],
	response: AxiosResponse<any, any>
) => {
	if (!import.meta.env.DEV) return response;

	let validData = {};

	resolvers.forEach(({ resolver, fields }) => {
		if (fields?.length) {
			fields.forEach(field => {
				if (Array.isArray(response.data[field])) {
					const isParsed = response.data[field]
						.map(df => {
							return !!resolver.parse(df);
						})
						.every(f => f);

					if (isParsed) {
						validData[field] = response.data[field];
					}
				} else {
					validData[field] = resolver.parse(response.data[field]);
				}
			});
		} else {
			validData = resolver.parse(response.data);
		}
	});

	return {
		...response,
		data: validData
	};
};
