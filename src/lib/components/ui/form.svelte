<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';
	type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { SuperValidated, ZodValidation } from 'sveltekit-superforms';
	import { superForm, type FormOptions } from 'sveltekit-superforms/client';

	type $$Props = HTMLAttributes<HTMLFormElement> & {
		form: SuperValidated<ZodValidation<T>, any>;
		options?: FormOptions<ZodValidation<T>, any>;
		schema: T;
	};
	export let form: $$Props['form'];
	export let schema: $$Props['schema'];
	export let options: $$Props['options'] = undefined;
	// add generic here
	const config = superForm(form, options);
	const { fields, errors, form: formStore } = config;

	function handle_input(event: Event) {
		const target = event.target as HTMLInputElement;
		fields[target.name] = target.value;
	}

	$: console.log(fields);
</script>

<form use:config.enhance method="POST" {...$$restProps}>
	<slot {config} errors={$errors} fields={$formStore} {handle_input} />
</form>
