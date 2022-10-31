import create, { SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { BaseStateProps } from "shared/types";

const createStore = <T>({
	initialState,
	persistant = false,
	persistantName = "vyoo__web_"
}: {
	initialState: T;
	persistant?: boolean;
	persistantName?: string;
}): (() => T & BaseStateProps & { setState: SetState<T & BaseStateProps> }) => {
	const createState = (set: SetState<T & BaseStateProps>) => {
		const init = {
			...initialState,
			isLoading: false,
			set,
			setState: set,
			setInitial: () => set(init)
		};

		return init;
	};

	const createDataStore = persistant ? persist(createState, { name: persistantName }) : createState;
	/* @ts-expect-error: valid params */
	return create<T & BaseStateProps>(devtools(createDataStore));
};

export default createStore;
