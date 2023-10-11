<script lang="ts">
	import { scale } from 'svelte/transition';
</script>

<main
	class="flex min-h-[calc(100dvh-6.5rem)] pt-24 md:pt-32 flex-col items-center px-6 bg-base-100 dark:bg-background"
>
	<div class="max-w-md mb-56 w-full" in:scale={{ duration: 400, opacity: 0.9, start: 0.95 }}>
		<slot />
	</div>
</main>
