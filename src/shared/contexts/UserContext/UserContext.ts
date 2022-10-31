import config from "config/appConfig";
import { IStateProps } from "utils/StateOf";
import createStore from "utils/createStore";
import { UserModel } from "shared/types";

const localStorageKey = `${config.GLOBAL_CONSTANTS.LOCAL_STORAGE_PREFIX}${config.HOOK_STORAGE_KEYS.USER_DATA}`;

export interface Values {
	user?: UserModel;
	loading: boolean;
}

export const initialState: IStateProps<Values> = {
	loading: false,
	user: undefined
};

export default createStore<Values>({
	initialState,
	persistant: true,
	persistantName: localStorageKey
});
