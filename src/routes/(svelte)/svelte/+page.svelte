<script lang="ts">
	import CodeBlock from '$lib/components/code/CodeBlock.svelte';
	import InlineCode from '$lib/components/code/InlineCode.svelte';
	import Page from '$lib/components/layout/Page.svelte';
	import { BIND_EX_1, BIND_EX_2 } from '$lib/utility/constants/svelte/bind';
	import {
		CUSTOM_EVENT_EX_1B,
		CUSTOM_EVENT_EX_1A
	} from '$lib/utility/constants/svelte/custom-events';
	import { EVENTS_EX_1 } from '$lib/utility/constants/svelte/events';
	import {
		LAYOUTS_EX_1,
		LAYOUTS_EX_2,
		LAYOUT_DIR_EX_1,
		LAYOUT_DIR_EX_2,
		LAYOUT_DIR_EX_3
	} from '$lib/utility/constants/svelte/layouts';
	import {
		STORES_EX_1,
		STORES_EX_2,
		STORES_TYPES_EX_1
	} from '$lib/utility/constants/svelte/stores';
	import { svelteNavStore } from '$stores/svelte-nav';

	let basicsSection: HTMLElement;
	let bindingsSection: HTMLElement;
	let eventsSection: HTMLElement;
	let customEventsSection: HTMLElement;
	let layoutsSection: HTMLElement;
	let layoutDirsSection: HTMLElement;
	let storesSection: HTMLElement;

	$: if ($svelteNavStore !== 'LOADING' && basicsSection && bindingsSection && eventsSection) {
		svelteNavStore.update((value) => {
			if (value === 'LOADING') return value;
			else
				return {
					y: value.y,
					stops: [
						{
							id: 'basics',
							name: 'Basics',
							icon: 'globe',
							y: basicsSection.offsetTop,
							subStops: [
								{
									name: 'Bindings',
									id: 'bindings',
									icon: 'globe',
									y: bindingsSection.offsetTop
								},
								{
									name: 'Events',
									id: 'events',
									icon: 'globe',
									y: eventsSection.offsetTop
								},
								{
									name: 'Custom Events',
									id: 'customEvents',
									icon: 'globe',
									y: customEventsSection.offsetTop
								}
							]
						},
						{
							name: 'Layouts',
							id: 'layouts',
							icon: 'window',
							y: layoutsSection.offsetTop,
							subStops: [
								{
									name: 'Layout Directories',
									id: 'layoutDirectories',
									icon: 'folder',
									y: layoutDirsSection.offsetTop
								}
							]
						},
						{
							name: 'Stores',
							id: 'stores',
							icon: 'database',
							y: storesSection.offsetTop,
							subStops: []
						}
					]
				};
		});
	}
</script>

<Page name="svelte" pageTitle="Svelte Tutorial | Dock411">
	<div class="page-container">
		<section class="main-section" id="basics" bind:this={basicsSection}>
			<article>
				<h1>Svelte Basics</h1>
				<p>
					To fully grasp the basics of svelte, I would suggest checking out the actual <a
						href="https://kit.svelte.dev/docs/introduction">docs</a
					>. This guide is a quick reference/overview of concepts in svelte.
				</p>
			</article>
		</section>
		<section id="bindings" bind:this={bindingsSection}>
			<article>
				<h1>Binding</h1>
				<p>Binding in svelte is very simple :).</p>
			</article>

			<CodeBlock lang="svelte" value={BIND_EX_1} />
			<article>
				<p>
					We can use shortcuts if the variable we are binding to is the same name as the element
					property
				</p>
			</article>
			<CodeBlock lang="svelte" value={BIND_EX_2} />
		</section>
		<section id="events" bind:this={eventsSection}>
			<article>
				<h1>Events</h1>
				<p>
					attaching event listeners is also very simple in svelte! we do so simply with <InlineCode
						>on:</InlineCode
					>.
				</p>
			</article>
			<CodeBlock lang="svelte" value={EVENTS_EX_1} />
		</section>
		<section id="customEvents" bind:this={customEventsSection}>
			<article>
				<h2>Custom Events</h2>
				<p>
					Creating custom events in svelte is pretty straight-forward. First we create an event
					dispatcher, and then we dispatch the event when the conditions are correct.
				</p>
				<p>
					Below we create a dispatcher in <InlineCode variant="url">CustomButton.svelte</InlineCode
					>...
				</p>
			</article>
			<CodeBlock lang="svelte" value={CUSTOM_EVENT_EX_1A} />
			<article>
				<p>
					and use the button with our custom event in <InlineCode variant="url"
						>+page.svelte</InlineCode
					>
				</p>
			</article>
			<CodeBlock lang="svelte" value={CUSTOM_EVENT_EX_1B} />
		</section>
		<section class="main-section" id="layouts" bind:this={layoutsSection}>
			<h1>Svelte Layouts</h1>
			<article>
				<p>
					Layouts in svelte are file-system based, and uses the folder structure in src/routes
					directory.
				</p>
				<p>
					There are a few rules and exceptions to this. For instance, what if we want to make a
					dynamic url parameter? Well, we can use the bracket notation!
				</p>
				<p>
					<InlineCode variant="url">/product/[serial]/+page.svelte</InlineCode>
				</p>
				<p>
					In the case above, <InlineCode>[serial]</InlineCode> is now dynamic! But, how do we get the
					value of <InlineCode>[serial]</InlineCode> into <InlineCode variant="url"
						>+page.svelte</InlineCode
					>?
				</p>
				<p>
					Using a +page.ts/+page.js file! If we make the file <InlineCode variant="url"
						>/product/[serial]/+page.ts</InlineCode
					>, we can implement a <InlineCode>load</InlineCode> function and pass the value to +page.svelte.
				</p>
			</article>
			<CodeBlock lang="javascript" value={LAYOUTS_EX_1} />
			<p>And to get the value into <InlineCode variant="url">+page.svelte</InlineCode></p>
			<CodeBlock lang="svelte" value={LAYOUTS_EX_2} />
		</section>
		<section id="layoutDirectories" bind:this={layoutDirsSection}>
			<article>
				<h1>Layout Directories</h1>
				<p>
					Sometimes we don't want to use the same <InlineCode variant="url"
						>+layout.svelte</InlineCode
					> file further into a path. For this reason, the special layout directory exists. To use one,
					simply wrap the directory name in parenthesis, like so: <InlineCode>(dirname)</InlineCode
					>.
				</p>
				<p>
					To continue with our example above, lets say we have 3 layouts to consider: a main view, a
					form view, and a simple view.
				</p>
				<p>
					<InlineCode variant="url">(main)/product/[serial]/+page.svelte</InlineCode>
				</p>
				<p>
					<InlineCode variant="url">(form)/product/[serial]/endorse-form/+page.svelte</InlineCode>
				</p>
				<p>
					<InlineCode variant="url">(simple)/product/[serial]/thank-you/+page.svelte</InlineCode>
				</p>
				<p>We can now create +layout.svelte files in the layout directory root.</p>
				<p><InlineCode variant="url">(main)/+layout.svelte</InlineCode></p>
				<CodeBlock lang="svelte" value={LAYOUT_DIR_EX_1} />
				<p><InlineCode variant="url">(form)/+layout.svelte</InlineCode></p>
				<CodeBlock lang="svelte" value={LAYOUT_DIR_EX_2} />
				<p><InlineCode variant="url">(simple)/+layout.svelte</InlineCode></p>
				<CodeBlock lang="svelte" value={LAYOUT_DIR_EX_3} />
			</article>
		</section>
		<section class="main-section" id="stores" bind:this={storesSection}>
			<h1>Svelte Stores</h1>
			<article>
				<p>
					Stores are a fundamental part of application/component lifecycles in svelte. Stores are
					essentially just observables, because unlike uni-directional frameworks like React,
					svelte's data flows both ways. This is why we can simply <InlineCode>bind:</InlineCode> to
					control elements.
				</p>
				<p>
					Stores are a good way to tie an item from browser storage into the UI. I have a go-to
					utility function, that, over time, has become more & more configurable. I have not really
					found cases in which the function needs anything else other than what you see here.
				</p>
			</article>
			<p><InlineCode variant="url">/src/lib/utility/utility.types.ts</InlineCode></p>
			<CodeBlock lang="javascript" value={STORES_TYPES_EX_1} />
			<p><InlineCode variant="url">/src/lib/utility/store/create-storage-store.ts</InlineCode></p>
			<CodeBlock lang="javascript" value={STORES_EX_1} />
			<article>
				<p>
					If you notice, in the type for <InlineCode>StorageStoreConfig</InlineCode>, we define a <InlineCode
						>getMethods</InlineCode
					> function. This allows us to use a callback function that creates an object with a set of
					methods, using the created store. Here is an example use case of <InlineCode
						>createStorageStore</InlineCode
					>.
				</p>
			</article>
			<p />
			<CodeBlock lang="javascript" value={STORES_EX_2} />
		</section>
	</div>
</Page>
