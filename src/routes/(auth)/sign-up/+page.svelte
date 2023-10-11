<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff } from 'lucide-svelte';

	export let form;

	let isPasswordShown = false;
	let loading = false;
</script>

<Card let:Header let:Footer class="w-full">
	<Header let:Title let:Description class="text-center">
		<Title>Sign up</Title>
		<Description>Create an account to get started.</Description>
	</Header>
	<form
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await new Promise((r) => setTimeout(r, 200));
				loading = false;
				update();
			};
		}}
		method="POST"
		class="space-y-5"
	>
		<Input label="Email" name="email" type="email" error={form?.email} required />
		<Input
			label="Password"
			name="password"
			description="Must be at least 6 characters long."
			type={isPasswordShown ? 'text' : 'password'}
			error={form?.password}
			required
		>
			<Button
				type="button"
				variant="text"
				slot="suffix"
				class="-mx-4"
				on:click={() => {
					isPasswordShown = !isPasswordShown;
				}}
			>
				{#if isPasswordShown}
					<Eye size="20" />
				{:else}
					<EyeOff size="20" />
				{/if}
			</Button>
		</Input>

		<Footer>
			<Button type="submit" class="w-full" {loading} disabled={loading}>Sign up</Button>
		</Footer>
	</form>
</Card>
<p class="text-center mt-3 text-sm">
	Already have an account?
	<Button variant="link" href="/sign-in" class="text-center -mx-3">Sign in</Button>
</p>
