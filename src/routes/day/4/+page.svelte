<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	let chartData: number[] = [100, 2, 20, 100, 38];

	let isMonitoring = false;
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
				return d + 'px';
			})
			.text(function (d) {
				return d;
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
	<div class="border rounded-md w-full h-[400px] mt-4 flex flex-row">
		<div bind:this={ctx} class="chart"></div>
	</div>

	<button
		class="mt-4 px-4 py-2 border bg-secondary text-white rounded-md hover:scale-105 duration-200 max-w-max mb-4"
		>{isMonitoring ? 'Monitoring' : 'Monitor'}
	</button>
</div>

<style>
	.chart {
		max-width: 400px;
		display: flex;
		align-items: center;
		overflow-x: auto;
	}
	.chart :global(div) {
		max-width: max-content;
		border-radius: 5px;
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
		transform-origin: center;
	}
</style>
