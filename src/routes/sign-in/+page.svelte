<script>
	import { enhance } from '$app/forms';
	import { scale } from 'svelte/transition';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff } from 'lucide-svelte';

	export let form;

	let isPasswordShown = false;
	let email = '';
</script>

<main class="flex min-h-[calc(100dvh-6.5rem)] pt-24 md:pt-32 flex-col items-center px-6">
	<div class="max-w-md mb-56 w-full" in:scale={{ duration: 400, opacity: 0.9, start: 0.98 }}>
		<Card let:Header let:Footer class="w-full">
			<Header let:Title let:Description class="text-center">
				<Title>Sign in</Title>
				<Description>Sign in to your account to continue.</Description>
			</Header>
			<form use:enhance method="POST" class="space-y-5">
				<Input
					label="Email"
					name="email"
					type="email"
					error={form?.email}
					required
					bind:value={email}
				/>
				<div>
					<Input
						label="Password"
						name="password"
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
					<Button
						variant="link"
						href={`/password-reset${email ? `?email=${email}` : ''}`}
						class="-mx-4">Forgot Password?</Button
					>
				</div>

				<Footer>
					<Button type="submit" class="w-full">Sign in</Button>
				</Footer>
			</form>
		</Card>
		<p class="text-center mt-3 text-sm">
			New to Ethera?
			<Button variant="link" href="/sign-up" class="text-center -mx-3">Create an account</Button>
		</p>
	</div>
</main>
