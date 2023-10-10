async function sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function min_delay<T>(promise: Promise<T>, ms: number) {
	let [p] = await Promise.all([promise, sleep(ms)]);

	return p;
}
