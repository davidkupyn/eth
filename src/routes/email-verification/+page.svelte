<script>
	import { enhance } from '$app/forms';
	import { scale } from 'svelte/transition';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { CheckCircle2, Mail } from 'lucide-svelte';

	let isEmailResent = false;

	$: {
		if (isEmailResent)
			setTimeout(() => {
				isEmailResent = false;
			}, 5000);
	}
</script>

<main class="flex min-h-[calc(100dvh-6.5rem)] pt-24 md:pt-32 flex-col items-center px-6">
	<div class="max-w-md mb-56 w-full" in:scale={{ duration: 400, opacity: 0.9, start: 0.98 }}>
		<Card let:Header let:Footer class="w-full">
			<Header let:Title let:Description class="text-center space-y-4">
				<Mail class="mx-auto text-accent" size="32" />
				<Title>Email verification</Title>
				<Description>
					A verification link has been sent to your email address. Please click on the link that has
					just been sent to your email account to verify your email and finish the registration.
				</Description>
			</Header>
			<form
				use:enhance
				method="POST"
				class="space-y-5"
				on:submit={() => {
					console.log('yo');

					setTimeout(() => {
						console.log('yo');
						isEmailResent = false;
					}, 100);
				}}
			>
				<Footer>
					{#if isEmailResent}
						<p
							class="mx-auto flex text-sm items-center h-9"
							in:scale={{ start: 0.95, duration: 300 }}
						>
							<CheckCircle2 class="mr-2 text-success" size="20" />
							Your verification link was resent
						</p>
					{:else}
						<div class="w-full" in:scale={{ start: 0.95, duration: 300 }}>
							<Button
								type="submit"
								class="w-full"
								variant="secondary"
								on:click={() => (isEmailResent = true)}
							>
								Resend
							</Button>
						</div>
					{/if}
				</Footer>
			</form>
		</Card>
	</div>
</main>
