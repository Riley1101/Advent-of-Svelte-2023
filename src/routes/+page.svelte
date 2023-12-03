<script lang="ts">
	import Icon from '@iconify/svelte';
	let completedDays = [1, 2];
	let days = Array.from({ length: 30 }, (_, i) => i + 1);
	let isCompleted = (day: number) => (completedDays.includes(day) ? 'rgba(0, 255, 0, 0.03)' : '');
</script>

<div class="min-h-[700px] p-4 max-w-2xl mx-auto mt-12">
	<div class="flex flex-col gap-2 mb-12">
		<h1 class="text-2xl md:text-5xl font-bold">Advent of svelte 2023</h1>
		<div class="mt-4 flex flex-col gap-2">
			<p class="text-lg mb-4">Join Advent of Svelte 2023 and get better at Svelte!</p>
			<div>
				<a
					href="https://advent.sveltesociety.dev/"
					class="px-4 py-3 border bg-secondary text-white rounded-md hover:scale-105 duration-200 max-w-max mb-4 hover:bg-primary"
				>
					Join Event
				</a>
			</div>
			<div class="mt-12">
				<h2 class="text-2xl font-bold mb-2">Solutions</h2>
				<ul class="gap-2 list-disc grid grid-cols-1 md:grid-cols-2 text-lg">
					{#each days as day (day)}
						<li
							class="flex flex-row my-2 rounded-md cursor-pointer border-y transition-all items-center justify-between"
							style:background-color={isCompleted(day)}
						>
							<a
								href="/day/{day}"
								class="hover:text-primary h-full w-1/2 border-l-2 hover:border-l-primary py-2 px-2 rounded-md flex items-center pl-4"
							>
								{#if isCompleted(day)}
									<Icon icon="icons8:checked" class="text-green-500 mr-2" />
								{/if}
								Day {day}
							</a>
							<a
								target="_blank"
								href={'https://github.com/Riley1101/Advent-of-Svelte-2023/tree/main/src/routes/day/' +
									day}
								class="hover:text-green-500 h-full w-1/2 justify-end pr-4 border-r-2 hover:border-r-green-500 flex items-center rounded-md"
							>
								Code
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
