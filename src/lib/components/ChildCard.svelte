<script lang="ts">
	import type { Child } from '$lib/types';
	import { flip } from 'svelte/animate';
	import type { CrossfadeParams, TransitionConfig } from 'svelte/transition';
	export let child: Child;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let send: (node: any, params: CrossfadeParams & { key: any }) => () => TransitionConfig;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let receive: (node: any, params: CrossfadeParams & { key: any }) => () => TransitionConfig;

	let getPercent = (child: Child) => {
		let percent = `${Math.abs(child.tally)}%`;

		if (child.tally > 0) {
			return [percent, 'rgba(0,0,255,0.08)'];
		}
		return [percent, 'rgba(255,0,0,0.08)'];
	};

	let [percent, color] = getPercent(child);
</script>

<div
	in:receive={{ key: child.id }}
	out:send={{ key: child.id }}
	animate:flip
	class={`grid relative my-2 border rounded-md px-4 py-2 border-l-2 overflow-hidden hover:border-l-primary cursor-pointer hover:bg-primary/5  transition-all`}
	class:color
>
	<div
		class="absolute w-full h-full rounedd-md top-0 left-0"
		style:width={percent}
		style:background-color={color}
	></div>
	<div class="flex flex-row items-center justify-between">
		<span>
			{child.name}
		</span>
		<span>
			{child.tally}
		</span>
	</div>
</div>
