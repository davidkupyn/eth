<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { createTypeformTracker } from './typeform-tracker';
	import { Card } from '$lib/components/ui/card';

	const typeform_tracker = createTypeformTracker({
		onSubmit: (responseId) => {
			console.log('Typeform Submitted!', responseId);
		},
		onStepChange: (count) => {
			console.log('Typeform Step Changed!', count);
		}
	});

	onMount(() => {
		typeform_tracker.listen();
		return () => {
			typeform_tracker.cleanup();
		};
	});
</script>

<svelte:head>
	{#if browser}
		<script src="//embed.typeform.com/next/embed.js"></script>
	{/if}
</svelte:head>
<main
	class="flex min-h-[calc(100dvh-6.5rem)] pt-24 md:pt-32 flex-col items-center px-6 bg-base-100 dark:bg-background"
>
	<Card class=" h-[700px] w-[800px] max-w-full ">
		<div
			data-tf-widget="YIY7KthX"
			data-tf-opacity="0"
			data-tf-iframe-props="title=My typeform"
			data-tf-transitive-search-params
			data-tf-medium="snippet"
		/>
	</Card>
</main>
