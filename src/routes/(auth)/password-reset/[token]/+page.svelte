<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff } from 'lucide-svelte';

	export let form;
	let is_password_shown = false;
</script>

<Card let:Header let:Footer class="w-full">
	<Header let:Title let:Description class="text-center">
		<Title>Reset Password</Title>
		<Description>Enter your email address to reset your password.</Description>
	</Header>
	<form use:enhance method="POST" class="space-y-5">
		<Input
			label="New Password"
			name="password"
			description="Must be at least 6 characters long."
			type={is_password_shown ? 'text' : 'password'}
			error={form?.message}
			required
		>
			<Button
				type="button"
				variant="text"
				slot="suffix"
				size="icon"
				class="-mx-3.5"
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

		<Footer>
			<Button type="submit" class="w-full">Reset</Button>
		</Footer>
	</form>
</Card>
