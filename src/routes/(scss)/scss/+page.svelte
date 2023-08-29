<script lang="ts">
	import CodeBlock from '$lib/components/code/CodeBlock.svelte';
	import InlineCode from '$lib/components/code/InlineCode.svelte';
	import Page from '$lib/components/layout/Page.svelte';
	import '$lib/styles/module/_rendered-scss.scss';
	import {
		ITEM_MIXIN_EX_COMPILED,
		ITER_EX_1,
		ITER_EX_1_COMPILED,
		ITER_MIXIN_EX
	} from '$lib/utility/constants/scss/iteration';
	import {
		NTH_CHILD_EX_1,
		NTH_CHILD_EX_EVEN,
		NTH_CHILD_EX_ODD
	} from '$lib/utility/constants/scss/nth-child';
	import { scssNavStore } from '$stores/scss-nav';

	let introSection: HTMLElement;
	let iterationSection: HTMLElement;
	let toRemSection: HTMLElement;
	let nthChildSection: HTMLElement;
	let iter1Section: HTMLElement;
	let iterMixinSection: HTMLElement;

	$: if (
		introSection &&
		iterationSection &&
		toRemSection &&
		iter1Section &&
		nthChildSection &&
		iterMixinSection &&
		$scssNavStore !== 'LOADING'
	) {
		scssNavStore.update((value) => {
			if (value === 'LOADING') return value;
			else
				return {
					y: value.y,
					stops: [
						{
							name: 'SCSS Tips',
							id: 'basics',
							icon: 'globe',
							y: introSection.offsetTop,
							subStops: [
								{
									name: 'to-rem Function',
									id: 'toRem',
									icon: 'text',
									y: toRemSection.offsetTop
								}
							]
						},
						{
							name: 'Iteration',
							id: 'iteration',
							icon: 'globe',
							y: iterationSection.offsetTop,
							subStops: [
								{
									name: 'Iteration Example',
									id: 'iter1',
									icon: 'globe',
									y: iter1Section.offsetTop
								},
								{
									name: 'Iteration + Mixins',
									id: 'iterMixins',
									icon: 'globe',
									y: iterMixinSection.offsetTop
								}
							]
						},
						{
							name: 'nth-child',
							id: 'nthChild',
							icon: 'globe',
							y: nthChildSection.offsetTop,
							subStops: []
						}
					]
				};
		});
	}
</script>

<Page name="scss" pageTitle="SCSS Tips | Dock411">
	<div class="page-container">
		<section class="main-section" id="basics" bind:this={introSection}>
			<article>
				<h1>SCSS Tips</h1>
			</article>
		</section>
		<section id="toRem" bind:this={toRemSection}>
			<article>
				<h1>to-rem function</h1>
			</article>
			<CodeBlock
				lang="sass"
				value={`$target-font-size: 18;
			
@function to-rem($n) {
	@return calc($n / $target-font-size) * 1rem;
}`}
			/>
		</section>
		<section id="iteration" bind:this={iterationSection}>
			<article>
				<h1>Iteration</h1>
				<p>
					In sass, we can iterate! we can iterate through value arrays, but also key value . In this
					example, we interpolate the key into the class name using <InlineCode
						>#&lbrace;VALUE&rbrace;</InlineCode
					>
				</p>
			</article>
		</section>
		<section id="iter1" bind:this={iter1Section}>
			<CodeBlock lang="sass" value={ITER_EX_1} />
			<p>Compiles to:</p>
			<CodeBlock lang="sass" value={ITER_EX_1_COMPILED} />
		</section>
		<section id="iterMixins" bind:this={iterMixinSection}>
			<article>
				<h1>Iteration + mixins</h1>
				<p>we can also do creative things with a combination of iteration and mixins.</p>
			</article>
			<CodeBlock lang="sass" value={ITER_MIXIN_EX} />
			<p>Compiles to:</p>
			<CodeBlock lang="sass" value={ITEM_MIXIN_EX_COMPILED} />
		</section>
		<section class="main-section" id="nthChild" bind:this={nthChildSection}>
			<article>
				<h1>:nth-child, :nth-of-type, ...</h1>
				<p>
					We can control styles for specific siblings of an element that fit a specified pattern.
					This is not sass specific and is actually a CSS selector, but I figured it is worth
					covering
				</p>
			</article>
			<CodeBlock lang="scss" value={NTH_CHILD_EX_EVEN} />
			<p>Renders as:</p>
			<div class="boxes nth-even">
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
			</div>
			<CodeBlock lang="scss" value={NTH_CHILD_EX_ODD} />
			<p>Renders as:</p>
			<div class="boxes nth-odd">
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
			</div>
			<CodeBlock lang="scss" value={NTH_CHILD_EX_1} />
			<p>Renders as:</p>
			<div class="boxes nth-3n1">
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
				<div class="box" />
			</div>
		</section>
	</div>
</Page>
