<script lang="ts">
	export let y: number;
	export let stops: App.ProgressStops[];
</script>

<div class="page-progress">
	{#each stops as stop}
		<div class="stop">
			<a href={`#${stop.id}`} class="stop-block {y >= stop.y ? 'viewed' : ''}">
				<div class="bead">
					<i class="bi bi-{stop.icon}" />
				</div>
				<div class="text">{stop.name}</div>
			</a>
			{#if stop.subStops && stop.subStops.length}
				<div class="sub-stops">
					{#each stop.subStops as subStop}
						<a href={`#${subStop.id}`} class="stop-block {y >= subStop.y ? 'viewed' : ''}">
							<div class="bead" data-y={subStop.y}>
								<i class="bi bi-{subStop.icon}" />
							</div>
							<div class="text">{subStop.name}</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>
