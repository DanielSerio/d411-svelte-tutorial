<script lang="ts">
	import CodeBlock from '$lib/components/code/CodeBlock.svelte';
	import Page from '$lib/components/layout/Page.svelte';
	import {
		EFF_FILTER,
		EFF_MAP,
		UNORDERED_EFF_FOR_EACH
	} from '$lib/utility/constants/javascript/array';
	import { javascriptNavStore } from '$stores/javascript-nav';
	let introSection: HTMLElement;
	let randSection: HTMLElement;
	let arraySection: HTMLElement;
	let filterSection: HTMLElement;
	let mapSection: HTMLElement;
	let forEachSection: HTMLElement;

	$: if (
		$javascriptNavStore !== 'LOADING' &&
		introSection &&
		arraySection &&
		filterSection &&
		mapSection &&
		forEachSection
	) {
		javascriptNavStore.update((value) => {
			if (value === 'LOADING') return value;
			else
				return {
					y: value.y,
					stops: [
						{
							id: 'basics',
							name: 'Javascript Tips',
							icon: 'globe',
							y: introSection.offsetTop,
							subStops: [
								{
									name: 'Random String',
									id: 'randString',
									icon: 'shuffle',
									y: randSection.offsetTop
								}
							]
						},
						{
							name: 'Array Methods',
							icon: 'code',
							id: 'array',
							y: arraySection.offsetTop,
							subStops: [
								{
									name: 'Filter',
									id: 'filter',
									icon: 'filter',
									y: filterSection.offsetTop
								},
								{
									name: 'Map',
									id: 'map',
									icon: 'map',
									y: mapSection.offsetTop
								},
								{
									name: 'ForEach',
									id: 'forEach',
									icon: 'arrow-repeat',
									y: forEachSection.offsetTop
								}
							]
						}
					]
				};
		});
	}
</script>

<Page name="javascript" pageTitle="JS Tips | Dock411">
	<div class="page-container">
		<section class="main-section" id="basics" bind:this={introSection}>
			<article>
				<h1>Javascript Tips</h1>
			</article>
		</section>
		<section id="rand" bind:this={randSection}>
			<article>
				<p>Random String</p>
			</article>
			<CodeBlock
				lang="javascript"
				value="const randomString = () => Math.random().toString(36).replace(/^0\./, '');"
			/>
		</section>
		<section class="main-section" bind:this={arraySection}>
			<article>
				<h1>Efficient Array Methods</h1>
				<p>
					Note that these functions are about twice as fast as the built in array methods. The loop
					being used is half of the size of the array, we are just making sure to call the callbacks
					on the items on both sides of the center point.
				</p>
			</article>
		</section>
		<section bind:this={filterSection}>
			<article>
				<h1>Efficient Filter</h1>
			</article>
			<CodeBlock lang="javascript" value={EFF_FILTER} />
		</section>
		<section bind:this={mapSection}>
			<article>
				<h1>Efficient Map</h1>
			</article>
			<CodeBlock lang="javascript" value={EFF_MAP} />
		</section>
		<section bind:this={forEachSection}>
			<article>
				<h1>Efficient ForEach</h1>
				<p>
					<b>NOTE:</b> this function does <strong>NOT</strong> execute the callback function on the
					items <strong>IN ORDER</strong>. The callback is actually called twice per iteration
					cycle: once on the `backwardIndex` and once on the `forwardIndex`
				</p>
			</article>
			<CodeBlock lang="javascript" value={UNORDERED_EFF_FOR_EACH} />
		</section>
	</div>
</Page>
