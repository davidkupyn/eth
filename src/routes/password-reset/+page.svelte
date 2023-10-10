<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let form;
</script>

<h1>Reset password</h1>
<form method="post" use:enhance>
	<label for="email">Email</label>
	<input name="email" id="email" value={$page.url.searchParams.get('email')} /><br />
	<input type="submit" />
</form>
{#if form?.message}
	<p class="error">{form.message}</p>
{/if}
{#if form?.success}
	<p>Your password reset link was sent to your inbox</p>
{/if}
<a href="/sign-in">Sign in</a>
