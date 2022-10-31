import { useCallback, useMemo } from "react";
import { useUserStore } from "../contexts";

import { useUserApiService } from "../services";

const useUser = () => {
	const userService = useUserApiService();

	const store = useUserStore();
	const { setState, setInitial } = useUserStore();

	const methods = useMemo(() => {
		return {
			setUser(user: any) {
				setState({ user });
			},
			getUser: async (id: string) => {
				setState({ loading: true });
				try {
					const res = await userService.getUser(id);
					console.log({ res });
				} catch (error) {
					console.warn({ error });
				} finally {
					setState({ loading: true });
				}
			},
			resetState() {
				setState({
					user: undefined,
					globalUserId: undefined,
					workspaces: [],
					communityAppLink: "",
					userVerified: true,
					ignoreGuidedTour: false
				});
			},
			resetStore() {
				setInitial();
				methods.resetState();
			}
		};
	}, [setState, userService, setInitial]);

	const getData = useCallback(() => {
		return store;
	}, [store]);

	return { ...methods, getData };
};

export default useUser;
