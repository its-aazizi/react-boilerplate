export default interface IActions<T> {
	setState: (state: T | ((state: T) => T)) => void;
}
