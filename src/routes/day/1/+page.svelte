<script lang="ts">
	import ChildCard from '$lib/components/ChildCard.svelte';
	import type { Child } from '$lib/types';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	$: isCategorized = false;
	let name = '';
	let tally = 0;

	const [send, receive] = crossfade({
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;
			return {
				duration: 200,
				easing: quintOut,
				css: (t) => {
					return `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`;
				}
			};
		}
	});
	function categorize() {
		isCategorized = !isCategorized;
	}

	const dataUrl = 'https://advent.sveltesociety.dev/data/2023/day-one.json';

	let data: Child[];
	$: data = [];

	onMount(async () => {
		const res = await fetch(dataUrl);
		data = await res.json();
	});

	function add() {
		data = [{ name, tally: tally }, ...data];
		name = '';
		tally = 0;
	}

	$: nice = data.filter((item) => (isCategorized ? item.tally > 0 : true));
	$: naugthy = data.filter((item) => (isCategorized ? item.tally < 0 : false));
</script>

<input
	bind:value={name}
	type="text"
	placeholder="Enter name"
	class="rounded-md active:border-green-500 focus:border-green-500 mb-4"
/>

<input
	bind:value={tally}
	type="number"
	placeholder="Enter tally"
	class="rounded-md active:border-green-500 focus:border-green-500 mb-4"
/>
<br class="block md:hidden" />
<button
	on:click={add}
	class="px-4 py-2 border bg-secondary text-white rounded-md hover:scale-105 duration-200 max-w-max mb-4"
	>Add</button
>

<button
	on:click={categorize}
	class="px-4 py-2 border bg-secondary text-white rounded-md hover:scale-105 duration-200 max-w-max mb-4"
	>Categorize</button
>

<div class="grid grid-cols-2 gap-4 w-full">
	<fieldset
		class=" border pt-2 p-4 rounded-md"
		style:border-color={isCategorized ? 'rgba(0,0,255,0.1)' : ''}
	>
		<legend class="text-3xl px-4">{!isCategorized ? '👦 👧' : '😇 '}</legend>
		{#each nice as child (child.name)}
			<ChildCard {child} {send} {receive} />
		{/each}
	</fieldset>
	<fieldset
		class="gap-2 border p-4 rounded-md duration-200"
		style:border-color={!isCategorized ? 'transparent' : 'rgba(255,0,0,0.1)'}
	>
		{#if isCategorized}
			<legend class="text-3xl px-4">😈 </legend>
		{/if}
		{#each naugthy as child (child.name)}
			<ChildCard {child} {send} {receive} />
		{/each}
	</fieldset>
</div>
