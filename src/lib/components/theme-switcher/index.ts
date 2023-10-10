import { writable } from 'svelte/store';

export interface ThemeStore {
	themes: string[];
	forced_theme?: string;
	theme: string;
	resolved_theme?: string;
	system_theme?: 'dark' | 'light';
}

function createThemeStore(initial_value: ThemeStore) {
	const { subscribe, update, set } = writable(initial_value);

	return {
		subscribe,
		set,
		update
	};
}

export const theme_store = createThemeStore({
	themes: [],
	forced_theme: undefined,
	theme: 'light',
	resolved_theme: undefined,
	system_theme: undefined
});
