<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	const dispatch = createEventDispatcher<{ scrollY: { y: number } }>();

	function handleWindowScroll(e: Event) {
		const target = (e.target as any).scrollingElement as HTMLElement;
		dispatch('scrollY', { y: target.scrollTop });
	}
</script>

<svelte:window on:scroll={handleWindowScroll} />

<div class="layout layout-{name}" id="layout">
	<slot />
</div>
