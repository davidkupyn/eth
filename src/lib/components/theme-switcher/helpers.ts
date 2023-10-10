import { browser } from '$app/environment';
import { MEDIA } from './constants';

export const get_theme = (key: string, fallback?: string): string | undefined => {
	if (typeof window === 'undefined') return undefined;
	let theme;
	theme = localStorage.getItem(key) || undefined;
	return theme || fallback;
};

export const disable_animation = () => {
	if (!browser) return () => {};
	const css = document.createElement('style');
	css.appendChild(
		document.createTextNode(
			`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
		)
	);
	document.head.appendChild(css);

	return () => {
		(() => window.getComputedStyle(document.body))();
		setTimeout(() => {
			document.head.removeChild(css);
		}, 1);
	};
};

export const get_system_theme = (e?: MediaQueryList): string => {
	if (!browser) return 'light';
	if (!e) {
		e = window.matchMedia(MEDIA);
	}

	const isDark = e.matches;
	const systemTheme = isDark ? 'dark' : 'light';
	return systemTheme;
};
