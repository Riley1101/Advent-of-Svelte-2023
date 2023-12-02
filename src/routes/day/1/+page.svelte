<script lang="ts">
	import ChildCard from '$lib/components/ChildCard.svelte';
	import type { Child } from '$lib/types';
	import { onMount } from 'svelte';
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

	function updateTally(child: Child, newTally: number) {
		data = data.map((item) => {
			if (item.name === child.name) {
				item.tally = newTally;
			}
			return item;
		});
	}
</script>

<input
	bind:value={name}
	type="text"
	placeholder="Enter name"
	class="rounded-md active:border-green-500 focus:border-green-500"
/>

<input
	bind:value={tally}
	type="number"
	placeholder="Enter tally"
	class="rounded-md active:border-green-500 focus:border-green-500"
/>

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
		<legend class="text-3xl px-4">😇 </legend>
		{#each data.filter((item) => item.tally > 0) as child (child.name)}
			<ChildCard {child} {updateTally} />
		{/each}
	</div>
	<div class="gap-2 border p-4 rounded-md">
		<legend class="text-3xl px-4">😈 </legend>
		{#each data.filter((item) => item.tally < 0) as child (child.name)}
			<ChildCard {child} {updateTally} />
		{/each}
	</div>
</div>
