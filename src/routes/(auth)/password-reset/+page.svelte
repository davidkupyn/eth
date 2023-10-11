<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { CheckCircle2, LockKeyhole } from 'lucide-svelte';
	import { scale } from 'svelte/transition';

	export let form;

	let is_email_sent = false;
	let loading = false;
</script>

<Card let:Header let:Footer class="w-full">
	<Header let:Title let:Description class="text-center space-y-4">
		<LockKeyhole class="mx-auto text-accent" size="32" />
		<Title>Request Password Reset</Title>
		<Description>Enter your email address to reset your password.</Description>
	</Header>
	<form
		use:enhance={({ formData }) => {
			if (is_email_sent) return;
			loading = true;
			goto(`/password-reset?email=${formData.get('email')}`);

			return async ({ result, update }) => {
				loading = false;
				if (result.type === 'success') {
					is_email_sent = true;
					setTimeout(() => {
						is_email_sent = false;
					}, 5000);
				}
				await update({
					reset: false
				});
			};
		}}
		method="POST"
		class="space-y-5"
	>
		<Input
			label="Email"
			name="email"
			type="email"
			value={$page.url.searchParams.get('email')}
			error={form?.message}
			disabled={is_email_sent}
			required
		/>

		<Footer>
			{#if is_email_sent}
				<p class="mx-auto flex text-sm items-center h-9" in:scale={{ start: 0.95, duration: 300 }}>
					<CheckCircle2 class="mr-2 text-success" size="20" />
					Your password reset link was sent
				</p>
			{:else}
				<div class="w-full" in:scale={{ start: 0.95, duration: 300 }}>
					<Button type="submit" class="w-full" {loading} disabled={loading}>Continue</Button>
				</div>
			{/if}
		</Footer>
	</form>
</Card>
<p class="text-center mt-3">
	<Button variant="link" href="/sign-in">Go back to sign in</Button>
</p>
