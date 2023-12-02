<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	const [send, receive] = crossfade({
		duration: 1500,
		easing: quintOut
	});
	let animate = false;
</script>

<button
	on:click={() => {
		animate = !animate;
	}}
>
	Toggle
</button>

{#if animate}
	<h1 in:send={{ key: 1 }} out:receive={{ key: 1 }}>BIG ELEM</h1>
{:else}
	<small in:send={{ key: 2 }} out:receive={{ key: 2 }}>small elem</small>
{/if}
