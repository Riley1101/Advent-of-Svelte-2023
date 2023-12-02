<script>
	import '../styles/app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Advent of Svelte 2023 Solutions</title>
	<meta name="title" content="Advent of Svelte 2023 Solutions" />
	<meta name="description" content="Advent of Svelte 2023 Solutions " />
</svelte:head>

<Header />
<main class="font-mono">
	<slot />
</main>
