<script lang="ts">
	import Layout from '$lib/components/layout/Layout.svelte';
	import ScssNav from '$lib/components/navigation/SCSSNav.svelte';
	import { scssNavStore } from '$stores/scss-nav';
	function onScrollY(e: CustomEvent) {
		scssNavStore.update((value) => (value === 'LOADING' ? value : { ...value, y: e.detail.y }));
	}
</script>

<Layout name="scss" on:scrollY={onScrollY}>
	<aside id="aside" class="aside-root">
		<ScssNav />
	</aside>
	<slot />
</Layout>
