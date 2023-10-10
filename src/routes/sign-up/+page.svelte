<script>
	import { enhance } from '$app/forms';
	import { scale } from 'svelte/transition';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';

	export let form;
</script>

<main class="flex min-h-[calc(100dvh-6.5rem)] justify-center items-center px-6">
	<div class="max-w-md mb-56 w-full" in:scale={{ duration: 300, opacity: 0.9, start: 0.95 }}>
		<Card let:Header let:Footer class="w-full">
			<Header let:Title let:Description>
				<Title>Sign up</Title>
				<Description>Create an account to get started.</Description>
			</Header>
			<form use:enhance method="POST" class="space-y-5">
				<Input label="Email" name="email" type="email" error={form?.email} required />

				<Input label="Password" name="password" type="password" error={form?.password} required />

				<Footer class="justify-end">
					<Button>Sign up</Button>
				</Footer>
			</form>
		</Card>
	</div>
</main>
