import { writable } from 'svelte/store';

export function createProtectedStore<T>(initial?: T) {
	const store = writable<T>(initial);

	return {
		...store
	};
}
