<script lang="ts">
	import Layout from '$lib/components/layout/Layout.svelte';
	import SvelteNav from '$lib/components/navigation/SvelteNav.svelte';
	import { svelteNavStore } from '$stores/svelte-nav';
	function onScrollY(e: CustomEvent) {
		svelteNavStore.update((value) => (value === 'LOADING' ? value : { ...value, y: e.detail.y }));
	}
</script>

<Layout name="svelte" on:scrollY={onScrollY}>
	<aside id="aside" class="aside-root">
		<SvelteNav />
	</aside>
	<slot />
</Layout>
