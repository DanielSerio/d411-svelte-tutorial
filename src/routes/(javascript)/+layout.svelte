<script lang="ts">
	import Layout from '$lib/components/layout/Layout.svelte';
	import JavascriptNav from '$lib/components/navigation/JavascriptNav.svelte';
	import { javascriptNavStore } from '$stores/javascript-nav';
	function onScrollY(e: CustomEvent) {
		javascriptNavStore.update((value) =>
			value === 'LOADING' ? value : { ...value, y: e.detail.y }
		);
	}
</script>

<Layout name="javascript" on:scrollY={onScrollY}>
	<aside id="aside" class="aside-root">
		<JavascriptNav />
	</aside>
	<slot />
</Layout>
