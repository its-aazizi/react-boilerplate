/**
 * Returns union of keys of TContainer where TContainer[key] extends TProperty
 */
type KeysOfPropsOfType<TContainer, TProperty, K = keyof TContainer> = K extends keyof TContainer
	? TContainer[K] extends TProperty
		? K
		: never
	: never;

export default KeysOfPropsOfType;
