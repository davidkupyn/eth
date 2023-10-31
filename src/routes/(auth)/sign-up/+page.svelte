<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import Form from '$lib/components/ui/form.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { z } from 'zod';

	export let data;

	const SignUpSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6).max(255)
	});
	let is_password_shown = false;
	let loading = false;
</script>

<Card let:Header let:Footer class="w-full">
	<Header let:Title let:Description class="text-center">
		<Title>Sign up</Title>
		<Description>Create an account to get started.</Description>
	</Header>
	<Form form={data.form} class="space-y-5" let:errors let:handle_input schema={SignUpSchema}>
		<Input
			label="Email"
			on:input={handle_input}
			name="email"
			type="email"
			error={errors.email?.join(', ')}
			required
		/>
		<Input
			label="Password"
			name="password"
			description="Must be at least 6 characters long."
			type={is_password_shown ? 'text' : 'password'}
			error={errors.password?.join(', ')}
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

		<Footer>
			<Button type="submit" class="w-full" {loading} disabled={loading}>Sign up</Button>
		</Footer>
	</Form>
</Card>
<p class="text-center mt-3 text-sm">
	Already have an account?
	<Button variant="link" href="/sign-in" class="text-center -mx-3">Sign in</Button>
</p>
