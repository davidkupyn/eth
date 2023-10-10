<script>
	import { enhance } from '$app/forms';
	import { scale } from 'svelte/transition';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';

	export let form;
</script>

<main class="flex min-h-[calc(100dvh-6.5rem)] pt-24 md:pt-32 flex-col items-center px-6">
	<div class="max-w-md mb-56 w-full" in:scale={{ duration: 400, opacity: 0.9, start: 0.98 }}>
		<Card let:Header let:Footer class="w-full">
			<Header let:Title let:Description class="text-center">
				<Title>Request Password Reset</Title>
				<Description>Enter your email address to reset your password.</Description>
			</Header>
			<form use:enhance method="POST" class="space-y-5">
				<Input
					label="Email"
					name="email"
					type="email"
					value={$page.url.searchParams.get('email')}
					error={form?.message}
					required
				/>

				<Footer>
					<Button type="submit" class="w-full">Request</Button>
				</Footer>
			</form>
		</Card>
		<p class="text-center mt-3 text-sm">
			<Button variant="link" href="/sign-in" class="text-center -mx-3">Sign in</Button>
		</p>
	</div>
</main>
