<script lang="ts">
	import { scale } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { createTypeformTracker } from './typeform-tracker';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';

	const typeform_tracker = createTypeformTracker({
		onSubmit: (responseId) => {
			console.log('Typeform Submitted!', responseId);
		},
		onStepChange: (count) => {
			console.log('Typeform Step Changed!', count);
		},
		onStart: () => {
			console.log('Typeform Started!');
		}
	});

	onMount(() => {
		typeform_tracker.listen();
		return () => {
			typeform_tracker.cleanup();
		};
	});
	let typeformId = 'zkuiXIgh';
</script>

<svelte:head>
	{#if browser}
		{#key typeformId}
			<script src="//embed.typeform.com/next/embed.js"></script>
		{/key}
	{/if}
</svelte:head>
<main
	class="flex min-h-[calc(100dvh-6.5rem)] pt-24 md:pt-32 flex-col items-center px-6 bg-base-100 dark:bg-background"
>
	<div class="w-[800px] max-w-full mb-4 -mt-16">
		<Input
			label="Typeform ID"
			required
			class="w-full"
			bind:value={typeformId}
			error={!typeformId && 'Typeform ID is required'}
		/>
	</div>
	<Card class="h-[700px] w-[800px] max-w-full">
		{#key typeformId}
			<div
				in:scale={{ start: 0.95, duration: 300 }}
				data-tf-widget={typeformId}
				data-tf-opacity="0.5"
				data-tf-iframe-props="title=Form"
				data-tf-transitive-search-params
				data-tf-medium="snippet"
			/>
		{/key}
	</Card>
</main>
