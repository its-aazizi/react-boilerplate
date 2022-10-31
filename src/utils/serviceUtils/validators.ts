import { isPossiblePhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";

export const validateEmail = (email: string) => {
	const emailRegex = new RegExp(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
	return emailRegex.test(email);
};

export const validatePhoneNumber = (number: string) => {
	const phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/);
	return phoneRegex.test(number);
};

export const phoneValidator = (phone: string) => {
	const parsedPhone = parsePhoneNumberFromString(phone);
	return isPossiblePhoneNumber(phone) && (parsedPhone?.isValid() || parsedPhone?.isPossible());
};

export const validatePositiveNumber = (num: string) => {
	const numberRegex = new RegExp(/^\d*\.?\d*$/);

	return numberRegex.test(num);
};

export const validateUrlRegex = new RegExp(
	/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/i
);

export const validateURL = (url: string) => {
	// eslint-disable-next-line no-useless-escape
	const expression =
		/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	const urlRegex = new RegExp(expression);

	return urlRegex.test(url);
};

export const validateYoutube = (url: string) => {
	const exp =
		/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	const urlRegex = new RegExp(exp);

	return urlRegex.test(url);
};
