import { browser } from '$app/environment';

export const getMetakey = () => {
	if (!browser) return 'CMD';
	const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

	if (isMac) {
		return 'CMD';
	} else {
		return 'CTRL';
	}
};
