import IActions from "./IActions";

export type IContextProps<TValues> = TValues & IActions<TValues>;
