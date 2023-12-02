<script>
	import { redirect } from '@sveltejs/kit';

	/** @type {import('./$types').PageData} */
	export let data;

	const { challenge } = data;
	if (!challenge) {
		throw redirect(307, '/404');
	}
</script>

<div class="mx-auto p-4 max-w-4xl">
	<!--
	<div class="border rounded-md prose p-4">
		<h1 class="mb-2">{challenge.title}</h1>
		<p class="text-lg mb-0">{challenge.description}</p>
	</div>
    -->

	<div class="mt-4">
		<slot />
	</div>
</div>
