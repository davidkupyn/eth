<script lang="ts">
	import { browser } from '$app/environment';
	import { COLOR_SCHEMES, MEDIA } from './constants';
	import { disable_animation, get_system_theme, get_theme } from './helpers';
	import { theme_store } from './index';
	import ThemeScript from './theme-script.svelte';

	export let forced_theme: string | undefined = undefined;
	export let disable_transition_on_change = false;
	export let enable_system: boolean = true;
	export let enable_color_scheme: boolean = true;
	export let storage_key: string = 'theme';
	export let themes: string[] = enable_system ? ['light', 'dark', 'system'] : ['light', 'dark'];
	export let default_theme: string = enable_system ? 'system' : 'light';
	export let attribute: string | 'class' = 'data-theme';
	export let value:
		| {
				[theme_name: string]: string;
		  }
		| undefined = undefined;

	const initial_theme = get_theme(storage_key, default_theme);
	theme_store.set({
		theme: initial_theme ?? default_theme,
		forced_theme,
		resolved_theme: initial_theme === 'system' ? get_theme(storage_key) : initial_theme,
		themes: enable_system ? [...themes, 'system'] : themes,
		system_theme: (enable_system ? get_theme(storage_key) : undefined) as
			| 'light'
			| 'dark'
			| undefined
	});

	$: theme = $theme_store.theme;
	$: resolved_theme = $theme_store.resolved_theme;

	const attrs = value ? Object.values(value) : themes;

	const handleMediaQuery = (e?: MediaQueryList) => {
		const system_theme = get_system_theme(e);
		$theme_store.resolved_theme = system_theme;

		if (theme === 'system' && !forced_theme) changeTheme(system_theme, false);
	};

	const changeTheme = (theme: string, updateStorage = true, updateDOM = true) => {
		let name = value?.[theme] || theme;

		const enable = disable_transition_on_change && updateDOM ? disable_animation() : null;

		if (updateStorage) {
			try {
				localStorage.setItem(storage_key, theme);
			} catch (e) {
				// Unsupported
			}
		}

		if (theme === 'system' && enable_system) {
			const resolved = get_system_theme();
			name = value?.[resolved] || resolved;
		}

		if (updateDOM && browser) {
			const d = document.documentElement;

			if (attribute === 'class') {
				d.classList.remove(...(attrs as string[]));
				d.classList.add(name);
			} else {
				d.setAttribute(attribute, name);
			}
			enable?.();
		}
	};

	const media_handler = (...args: any) => handleMediaQuery(...args);

	const storage_handler = (e: StorageEvent) => {
		if (e.key !== storage_key) return;
		$theme_store.theme = e.newValue || default_theme;
	};

	const on_window = (window: Window) => {
		// Always listen to System preference
		const media = window.matchMedia(MEDIA);
		// Intentionally use deprecated listener methods to support iOS & old browsers
		media.addListener(media_handler);
		media_handler(media);
		// localStorage event handling
		window.addEventListener('storage', storage_handler);
		return {
			destroy() {
				window.removeEventListener('storage', storage_handler);
				media.removeListener(media_handler);
			}
		};
	};

	// color-scheme handling
	$: if (enable_color_scheme && browser) {
		let color_scheme =
			// If theme is forced to light or dark, use that
			forced_theme && COLOR_SCHEMES.includes(forced_theme)
				? forced_theme
				: // If regular theme is light or dark
				theme && COLOR_SCHEMES.includes(theme)
				? theme
				: // If theme is system, use the resolved version
				theme === 'system'
				? resolved_theme || null
				: null;

		// color-scheme tells browser how to render built-in elements like forms, scrollbars, etc.
		// if color-scheme is null, this will remove the property
		document.documentElement.style.setProperty('color-scheme', color_scheme);
	}

	$: {
		if (forced_theme) {
			changeTheme(theme, true, false);
		} else {
			changeTheme(theme);
		}
	}
</script>

<ThemeScript
	{forced_theme}
	{storage_key}
	{attribute}
	{enable_system}
	{default_theme}
	{value}
	{attrs}
/>

<svelte:window use:on_window />
