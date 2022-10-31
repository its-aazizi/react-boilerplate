import { Context, ContextType } from "react";
import { IContextProps } from "shared/types";
import KeysOfPropsOfType from "./KeysOfPropsOfType";

export type StateOf<T> = Omit<T, KeysOfPropsOfType<T, (...args: any[]) => any>>;

export type IStateProps<TValues> = StateOf<ContextType<Context<IContextProps<TValues>>>>;
