export const buildRouteTree = (rawTree: any) =>
	(function loop(tree, path: string[] = []): any {
		return Object.keys(tree)
			.map(key => [key, tree[key]])
			.reduce((acc, [key, value]) => {
				const xPath: string[] = [...path, key];

				const routeData = {
					getPath: makeGetPath(`/${xPath.join("/")}`),
					getElementKey: () => key
				};

				if (value === null) {
					return { ...acc, [key]: routeData };
				}

				return {
					...acc,
					[key]: {
						...loop(value, xPath),
						...routeData
					}
				};
			}, {});
	})(rawTree);

const makeGetPath = (path: string) => (queryParams: any) => {
	const params = queryParams
		? `?${Object.entries(queryParams)
				.map(x => x.join("="))
				.join("&")}`
		: "";
	return `${path}${params}`;
};
