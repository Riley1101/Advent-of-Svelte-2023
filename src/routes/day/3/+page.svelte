<script lang="ts">
	import type { Present } from '$lib/types';
	import { onMount } from 'svelte';
	let data: Present[] = [];
	let cart: Present[] = [];

	const MAX_CART_WEIGHT = 100;

	$: cartWeight = Math.round(cart.reduce((acc, present) => acc + present.weight, 0));

	$: availableWeight = MAX_CART_WEIGHT - cartWeight;

	onMount(async () => {
		const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
		data = await res.json();
		data = data.map((present, id) => ({ ...present, id: id }));
	});

	function dragStart(event: DragEvent & { currentTarget: HTMLButtonElement }, present: Present) {
		if (event.currentTarget == null) return;
		event.dataTransfer?.setData('text/plain', JSON.stringify(present));
		event.currentTarget.classList.add('opacity-20');
	}

	function drop(
		event: DragEvent & { currentTarget: HTMLUListElement },
		to: 'inventory' | 'sleigh'
	) {
		if (event.dataTransfer === null) return;
		event.preventDefault();
		const json = event.dataTransfer.getData('text/plain');
		const item = JSON.parse(json) as Present;
		if (to == 'inventory') {
			moveItem('sleigh', 'inventory', item);
		} else {
			if (availableWeight < item.weight) return;
			moveItem('inventory', 'sleigh', item);
		}
	}

	function moveItem(from: 'inventory' | 'sleigh', to: 'inventory' | 'sleigh', item: Present) {
		if (from === 'inventory' && to === 'sleigh') {
			data = data.filter((present) => present.name !== item.name);
			cart = [item, ...cart];
		} else if (from === 'sleigh' && to === 'inventory') {
			cart = cart.filter((present) => present.name !== item.name);
			data = [item, ...data];
		}
	}
</script>

<div class="mt-12 text-center">
	<h1 class="text-4xl font-bold">Santa's Sleigh Load Balancer</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
		<fieldset class=" border pt-2 rounded-md hover:border-blue-500/30">
			<legend class="text-xl px-4">Inventory</legend>
			<ul
				aria-grabbed="true"
				class="grid grid-cols-2 w-full gap-4 h-full p-4"
				on:drop={(e) => drop(e, 'inventory')}
				on:dragover={(e) => e.preventDefault()}
			>
				{#each data as present (present.id)}
					<button
						on:dragover={() => false}
						disabled={present.weight > availableWeight}
						draggable="true"
						class="border p-4 rounded-md max-h-[60px] text-gray-800 disabled:opacity-20"
						on:dragstart={(e) => dragStart(e, present)}
						tabindex="0"
					>
						{present.name} - {present.weight} <i class="text-sm pl-2">/ kg</i>
					</button>
				{/each}
			</ul>
		</fieldset>
		<fieldset class="gap-2 border rounded-md duration-200 hover:border-green-500/30 max-h-[1000px]">
			<legend class="text-xl px-4"
				>Sleigh
				<span class="text-sm italic">{cartWeight}/{MAX_CART_WEIGHT}</span>
				<span class="text-sm italic">kg</span>
			</legend>
			<ul
				class="flex flex-col min-h-[700px] flex-wrap w-full gap-2 p-4"
				on:drop={(e) => drop(e, 'sleigh')}
				on:dragover={(e) => e.preventDefault()}
			>
				{#each cart as present (present.id)}
					<button
						on:dragover={() => false}
						draggable="true"
						class="border p-4 rounded-md max-h-[60px] shrink-0 grow text-gray-800 basis-1/2"
						on:dragstart={(e) => dragStart(e, present)}
					>
						{present.name} - {present.weight} <i class="text-sm pl-2">/ kg</i>
					</button>
				{/each}
			</ul>
		</fieldset>
	</div>
</div>
