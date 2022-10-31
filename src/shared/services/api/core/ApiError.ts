export default class ApiError extends Error {
	constructor(public status: number, public errors: Error[] | undefined, public message: string) {
		super(message || "API error");
	}
}
