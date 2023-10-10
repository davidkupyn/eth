<script>
	import { page } from '$app/stores';
	import ThemeProvider from '$lib/components/theme-switcher/theme-provider.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Separator from '$lib/components/ui/separator.svelte';
	import { cn } from '$lib/helpers';
	import { Zap } from 'lucide-svelte';
	import '../app.postcss';

	export let data;
</script>

<svelte:head>
	<title>Ethera</title>
	<meta
		name="description"
		content="Empower your web development with Ethera - combining Lucia, Drizzle ORM, Tailwind CSS, and SvelteKit for speed and elegance."
	/>
	<meta name="author" content="David Kupyn" />
</svelte:head>
<ThemeProvider attribute="class" disable_transition_on_change storage_key="essense-theme" />

<header
	class={cn('w-full z-20', $page.url.pathname === '/' ? 'absolute' : 'border-b border-border')}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-12">
		<a
			href="/"
			aria-label="Go to home page"
			class="font-bold flex items-center gap-2 p-1 focus-visible:ring-2 focus-visible:outline-none rounded-lg transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
		>
			<Zap size="20" class="text-accent" />
			Ethera
		</a>
		<nav>
			<ul class="inline-flex gap-4 items-center">
				{#if !data.user_email}
					<li>
						<Button href="/sign-in" variant="ghost">Sign in</Button>
					</li>
					<li>
						<Button href="/sign-up">Sign up</Button>
					</li>
				{:else}
					<li>
						<Button href="/sign-out" variant="ghost" class="-mx-4">Sign out</Button>
					</li>
				{/if}
			</ul>
		</nav>
	</div>
</header>

<slot />

<footer
	class={cn(
		'border-muted z-[0] w-full bg-background',
		$page.url.pathname === '/' ? 'absolute bottom-0' : 'border-t'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-14 relative bottom-0">
		<span class="mx-auto text-sm text-muted-foreground font-medium">&copy David Kupyn</span>
	</div>
</footer>
