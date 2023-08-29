<script lang="ts">
	import { svelteNavStore } from '$stores/svelte-nav';
	import PageProgress from './PageProgress.svelte';
	import SubNav from './SubNav.svelte';
	let stops: (App.ProgressStops | App.NavigationProgressStop)[] = [
		{
			name: 'Basics',
			icon: 'globe',
			id: 'basics',
			subStops: [
				{
					name: 'Binding',
					id: 'bindings',
					icon: 'arrow-repeat'
				},
				{
					name: 'Events',
					id: 'events',
					icon: 'toggles'
				},
				{
					name: 'Custom Events',
					id: 'customEvents',
					icon: 'toggles2'
				}
			]
		},
		{
			name: 'Layouts',
			id: 'layouts',
			icon: 'window',
			subStops: [
				{
					name: 'Layout Directories',
					id: 'layoutDirectories',
					icon: 'folder'
				}
			]
		},
		{
			name: 'Stores',
			id: 'stores',
			icon: 'database',
			subStops: []
		}
	];

	function mapStops(stop: App.NavigationProgressStop | App.NavigationProgressSubStop): any {
		if ($svelteNavStore !== 'LOADING') {
			const filtered = $svelteNavStore.stops.filter((s) => s.id === stop.id);

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
	$: if ($svelteNavStore !== 'LOADING' && $svelteNavStore.stops) {
		progressStops = stops.map(mapStops) as App.ProgressStops[];
	}
</script>

<SubNav name="svelte">
	{#if $svelteNavStore !== 'LOADING'}
		<PageProgress y={$svelteNavStore.y} stops={progressStops} />
	{/if}
</SubNav>
