<script lang="ts">
	import { MEDIA } from './constants';

	export let forced_theme: string | undefined;
	export let storage_key: string;
	export let attribute: string;
	export let enable_system: boolean;
	export let default_theme: string;
	export let value: { [theme_name: string]: string } | undefined;
	export let attrs: any;

	// These are minified via Terser and then updated by hand, don't recommend

	const updateDOM = (name: string, literal?: boolean) => {
		name = value?.[name] || name;
		const val = literal ? name : `'${name}'`;

		if (attribute === 'class') {
			return `d.add(${val})${`;document.documentElement.style.setProperty('color-scheme', ${val})`}`;
		}

		return `d.setAttribute('${attribute}', ${val})${`;document.documentElement.style.setProperty('color-scheme', ${val})`}`;
	};

	$: defaultSystem = default_theme === 'system';
	// Code-golfing the amount of characters in the script
	$: optimization =
		attribute === 'class'
			? `var d=document.documentElement.classList;${`d.remove(${attrs
					.map((t: string) => `'${t}'`)
					.join(',')})`};`
			: `var d=document.documentElement;`;

	// Encapsulate script tag into string to not mess with the compiler
	$: themeScript = `<${'script'}>${
		forced_theme
			? `!function(){${optimization}${updateDOM(forced_theme)}}()`
			: enable_system
			? `!function(){try {${optimization}var e=localStorage.getItem('${storage_key}');${
					!defaultSystem ? updateDOM(default_theme) + ';' : ''
			  }if("system"===e||(!e&&${defaultSystem})){var t="${MEDIA}",m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
					'dark'
			  )}}else{${updateDOM('light')}}}else if(e){ ${
					value ? `var x=${JSON.stringify(value)};` : ''
			  }${updateDOM(value ? 'x[e]' : 'e', true)}}}catch(e){}}()`
			: `!function(){try{${optimization}var e=localStorage.getItem("${storage_key}");if(e){${
					value ? `var x=${JSON.stringify(value)};` : ''
			  }${updateDOM(value ? 'x[e]' : 'e', true)}}else{${updateDOM(default_theme)};}}catch(t){}}();`
	}</${'script'}>`;
</script>

<svelte:head>
	{@html themeScript}
</svelte:head>
