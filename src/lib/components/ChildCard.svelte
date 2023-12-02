<script lang="ts">
	import type { Child } from '$lib/types';
	import { flip } from 'svelte/animate';
	import type { CrossfadeParams, TransitionConfig } from 'svelte/transition';

	export let child: Child;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let send: (node: any, params: CrossfadeParams & { key: any }) => () => TransitionConfig;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let receive: (node: any, params: CrossfadeParams & { key: any }) => () => TransitionConfig;
</script>

<div
	in:receive={{ key: child.name }}
	out:send={{ key: child.name }}
	animate:flip
	class={`grid   my-2 border rounded-md px-4 py-2 border-l-2 hover:border-l-primary cursor-pointer hover:bg-primary/5  transition-all`}
	style:background-color={child.tally > 0 ? 'rgba(0,0,255,0.08)' : 'rgba(255,0,0,0.08)'}
>
	<div class="flex flex-row items-center justify-between">
		<span>
			{child.name}
		</span>
		<span>
			{child.tally}
		</span>
	</div>
</div>
