const safelyParseJSON = <T>(json: string): T => {
	let parsed;

	try {
		parsed = JSON.parse(json);
	} catch (error) {
		console.warn({ error });
	}

	return parsed as T;
};

const isMobileSafari = () => {
	const isIOS =
		(/iPad|iPhone|iPod/.test(navigator.platform) ||
			(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
		!(window as any).MSStream;
	return isIOS && navigator.userAgent.match(/AppleWebKit/);
};

export { safelyParseJSON, isMobileSafari };
