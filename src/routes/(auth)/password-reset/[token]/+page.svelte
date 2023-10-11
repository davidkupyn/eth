<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff } from 'lucide-svelte';

	export let form;
	let isPasswordShown = false;
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
			type={isPasswordShown ? 'text' : 'password'}
			error={form?.message}
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
			<Button type="submit" class="w-full">Reset</Button>
		</Footer>
	</form>
</Card>
