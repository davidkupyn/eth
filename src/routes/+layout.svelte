<script>
	import { page } from '$app/stores';
	import ThemeProvider from '$lib/components/theme-switcher/theme-provider.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { cn } from '$lib/helpers';
	import { Gauge } from 'lucide-svelte';
	import '../app.postcss';
	import { Avatar } from '$lib/components/ui/avatar';

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
	class={cn(
		'w-full z-20 bg-gradient-to-b from-background to-transparent',
		$page.url.pathname === '/' ? 'absolute' : 'border-b border-border'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-12">
		<a
			href="/"
			aria-label="Go to home page"
			class="font-bold flex items-center gap-2 p-1 focus-visible:ring-2 focus-visible:outline-none rounded-lg transition ring-offset-base-50 dark:ring-offset-base-950 focus-visible:ring-primary-600"
		>
			<Gauge size="20" class="text-accent" />
			Ethera
		</a>
		<nav>
			<ul class="inline-flex gap-3 items-center">
				{#if !data.user_email}
					<li>
						<Button href="/sign-in" variant="ghost" size="sm">Sign in</Button>
					</li>
					<li>
						<Button href="/sign-up" size="sm">Sign up</Button>
					</li>
				{:else}
					<li>
						<Button href="/sign-out" variant="ghost" size="sm">Sign out</Button>
					</li>
					<li>
						<Avatar
							src="https://api.dicebear.com/7.x/thumbs/svg?radius=50&size=32&backgroundColor=transparent&seed={data.user_email}&shapeColor=EF3959"
							alt="Profile Picture"
							class="bg-background"
							fallback={data.user_email[0].toUpperCase()}
						/>
					</li>
				{/if}
			</ul>
		</nav>
	</div>
</header>
{#if $page.url.pathname === '/'}
	<svg
		class="absolute pointer-events-none inset-0 top-3.5 h-[400px] w-full stroke-foreground dark:stroke-muted-foreground opacity-10 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
		aria-hidden
	>
		<defs>
			<pattern
				id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
				width="200"
				height="200"
				x="50%"
				y="-1"
				patternUnits="userSpaceOnUse"><path d="M100 200V.5M.5 .5H200" fill="none" /></pattern
			>
		</defs>
		<svg x="50%" y="-1" class="overflow-visible fill-foreground/20">
			<path
				d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
				stroke-width="0"
			/>
		</svg>
		<rect
			width="100%"
			height="100%"
			stroke-width="0"
			fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
		/>
	</svg>
{/if}
<slot />

<footer
	class={cn(
		'border-muted z-[0] w-full bg-background',
		$page.url.pathname === '/' ? 'absolute bottom-0' : 'border-t'
	)}
>
	<div class="container mx-auto flex justify-between items-center px-6 h-14 relative bottom-0">
		<span class="mx-auto text-sm text-muted-foreground">&copy David Kupyn</span>
	</div>
</footer>
