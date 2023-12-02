<script lang="ts">
	import ChildCard from '$lib/components/ChildCard.svelte';
	import type { Child } from '$lib/types';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	$: isCategorized = false;
	let name = '';
	let tally = 0;

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
	<div class=" border pt-2 p-4 rounded-md">
		<legend class="text-3xl px-4">{!isCategorized ? '👦 👧' : '😇 '}</legend>
		{#each data.filter((item) => (isCategorized ? item.tally > 0 : true)) as child (child.name)}
			<ChildCard {child} />
		{/each}
	</div>
	{#if isCategorized}
		<div class="gap-2 border p-4 rounded-md duration-200" in:fade out:fade>
			<legend class="text-3xl px-4">😈 </legend>
			{#each data.filter((item) => (isCategorized ? item.tally < 0 : false)) as child (child.name)}
				<ChildCard {child} />
			{/each}
		</div>
	{/if}
</div>
