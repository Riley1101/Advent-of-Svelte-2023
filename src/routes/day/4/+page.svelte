<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	let chartData: number[] = [100, 2, 20, 100, 38];

	let fetching = false;
	let ctx: HTMLDivElement;

	onMount(() => {
		mapDataToChart();
	});

	function mapDataToChart(chartData: number[] = []) {
		d3.select(ctx)
			.selectAll('div')
			.data(chartData)
			.enter()
			.append('div')
			.transition()
			.duration(200)
			.ease(d3.easeLinear)
			.style('height', function (d) {
				return d + '%';
			});
	}

	function fetchEveryThreeSeconds() {
		setInterval(() => {
			if (fetching) return;
			fetching = true;
			fetch('https://advent.sveltesociety.dev/data/2023/day-four.json')
				.then((res) => res.json())
				.then((data) => {
					chartData.push(data.heartRate);
					chartData = chartData;
				});
			fetching = false;
		}, 1000);
	}

	onMount(() => {
		fetchEveryThreeSeconds();
	});

	$: mapDataToChart(chartData);
</script>

<div class="mt-12 text-center">
	<h1 class="text-4xl font-bold">Santa's Health Monitor</h1>
	<div
		class="border rounded-md w-full max-w-[100vw] relative h-[400px] mt-12 flex flex-row justify-end overflow-x-scroll"
	>
		<div bind:this={ctx} class="chart">
			<span class="absolute w-full top-1/2 p-[1px] bg-red-500/20 -translate-y-1/2"></span>
		</div>
	</div>
</div>

<style>
	.chart {
		padding: 1em;
		display: flex;
		gap: 1px;
		align-items: center;
		position: relative;
	}
	.chart :global(div) {
		max-width: max-content;
		border-radius: 5px;
		font: 10px sans-serif;
		background-color: red;
		text-align: right;
		padding: 2px;
		margin: 1px;
		color: white;
		transform-origin: center;
	}
</style>
