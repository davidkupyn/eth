<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff } from 'lucide-svelte';

	export let form;

	let is_password_shown = false;
	let email_value = '';
	let loading = false;
</script>

<Card let:Header let:Footer class="w-full">
	<Header let:Title let:Description class="text-center">
		<Title>Sign in</Title>
		<Description>Sign in to your account to continue.</Description>
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
		<Input
			label="Email"
			name="email"
			type="email"
			error={form?.email}
			required
			bind:value={email_value}
		/>
		<div>
			<Input
				label="Password"
				name="password"
				type={is_password_shown ? 'text' : 'password'}
				error={form?.password}
				required
			>
				<Button
					type="button"
					variant="text"
					slot="suffix"
					class="-mx-3.5"
					size="icon"
					on:click={() => {
						is_password_shown = !is_password_shown;
					}}
				>
					{#if is_password_shown}
						<Eye size="16" />
					{:else}
						<EyeOff size="16" />
					{/if}
				</Button>
			</Input>
			<Button
				variant="link"
				href={`/password-reset${email_value ? `?email=${email_value}` : ''}`}
				class="-mx-4">Forgot Password?</Button
			>
		</div>

		<Footer>
			<Button type="submit" class="w-full" {loading} disabled={loading}>Sign in</Button>
		</Footer>
	</form>
</Card>
<p class="text-center mt-3 text-sm">
	New to Ethera?
	<Button variant="link" href="/sign-up" class="text-center -mx-3">Create an account</Button>
</p>
