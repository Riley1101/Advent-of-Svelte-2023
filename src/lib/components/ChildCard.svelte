<script lang="ts">
	import type { Child } from '$lib/types';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	export let child: Child;

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
