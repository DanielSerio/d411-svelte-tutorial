<script lang="ts">
	import SubNav from './SubNav.svelte';
	import { javascriptNavStore } from '$stores/javascript-nav';
	import PageProgress from './PageProgress.svelte';

	let stops: (App.ProgressStops | App.NavigationProgressStop)[] = [
		{
			name: 'Javascript Tips',
			icon: 'globe',
			id: 'basics',
			subStops: [
				{
					name: 'Random String',
					id: 'randString',
					icon: 'shuffle'
				}
			]
		},
		{
			name: 'Array Methods',
			icon: 'code',
			id: 'array',
			subStops: [
				{
					name: 'Filter',
					id: 'filter',
					icon: 'filter'
				},
				{
					name: 'Map',
					id: 'map',
					icon: 'map'
				},
				{
					name: 'ForEach',
					id: 'forEach',
					icon: 'arrow-repeat'
				}
			]
		}
	];

	function mapStops(stop: App.NavigationProgressStop | App.NavigationProgressSubStop): any {
		if ($javascriptNavStore !== 'LOADING') {
			const filtered = $javascriptNavStore.stops.filter((s) => s.id === stop.id);

			if (filtered.length) {
				if ((stop as App.NavigationProgressStop).subStops !== undefined) {
					const mapSubStops = (stp: App.NavigationProgressSubStop) => {
						if (!filtered[0].subStops) return { ...stp };
						const nFiltered = filtered[0].subStops.filter((s) => s.id === stp.id);
						return {
							...stp,
							y: nFiltered.length ? nFiltered[0].y : 0
						};
					};

					const subStops = (stop as App.NavigationProgressStop)
						.subStops as App.NavigationProgressSubStop[];
					console.log(subStops.map(mapStops));
					return {
						...stop,
						subStops: subStops.length ? subStops.map(mapSubStops) : undefined,
						y: filtered[0].y
					};
				}

				return {
					...stop,
					y: filtered[0].y
				};
			}
		}
		return {
			...stop,
			y: 0
		};
	}

	let progressStops: App.ProgressStops[] = [];
	$: if ($javascriptNavStore !== 'LOADING' && $javascriptNavStore.stops) {
		progressStops = stops.map(mapStops) as App.ProgressStops[];
	}
</script>

<SubNav name="javascript">
	{#if $javascriptNavStore !== 'LOADING'}
		<PageProgress y={$javascriptNavStore.y} stops={progressStops} />
	{/if}
</SubNav>
