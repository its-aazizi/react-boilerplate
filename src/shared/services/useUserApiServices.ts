import { useMemo } from "react";

import { API_URLS } from "shared/constants";
import useHttpActions from "shared/services/api/core/useHttpActions";
import { UserModel, userResolver } from "shared/types";

import { BaseConverter } from "./converters";

const useUserService = () => {
	const actions = useHttpActions();

	return useMemo(
		() => ({
			getUser: async (id: string) => {
				return BaseConverter.convert<{ user: UserModel }>(
					await actions.get(API_URLS.USER.ME(id), undefined, {
						resolvers: [{ resolver: userResolver, fields: ["user"] }]
					})
				);
			}
		}),
		[actions]
	);
};

export default useUserService;
