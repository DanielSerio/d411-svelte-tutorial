<script lang="ts">
	import { scssNavStore } from '$stores/scss-nav';
	import PageProgress from './PageProgress.svelte';
	import SubNav from './SubNav.svelte';

	let stops: (App.ProgressStops | App.NavigationProgressStop)[] = [
		{
			name: 'SCSS Tips',
			id: 'basics',
			icon: 'globe',
			subStops: [
				{
					name: 'to-rem Function',
					id: 'toRem',
					icon: 'code'
				}
			]
		},
		{
			name: 'Iteration',
			id: 'iteration',
			icon: 'globe',

			subStops: [
				{
					name: 'Iteration Example',
					id: 'iter1',
					icon: 'globe'
				},
				{
					name: 'Iteration + Mixins',
					id: 'iterMixins',
					icon: 'globe'
				}
			]
		},
		{
			name: 'nth-child',
			id: 'nthChild',
			icon: 'globe',
			subStops: []
		}
	];

	function mapStops(stop: App.NavigationProgressStop | App.NavigationProgressSubStop): any {
		if ($scssNavStore !== 'LOADING') {
			const filtered = $scssNavStore.stops.filter((s) => s.id === stop.id);

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
	$: if ($scssNavStore !== 'LOADING' && $scssNavStore.stops) {
		progressStops = stops.map(mapStops) as App.ProgressStops[];
	}
</script>

<SubNav name="scss">
	{#if $scssNavStore !== 'LOADING'}
		<PageProgress y={$scssNavStore.y} stops={progressStops} />
	{/if}
</SubNav>
