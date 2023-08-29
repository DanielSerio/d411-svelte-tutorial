<script lang="ts">
	import Layout from '$lib/components/layout/Layout.svelte';
	import RootNav from '$lib/components/navigation/RootNav.svelte';
</script>

<Layout name="root">
	<aside id="aside" class="aside-root">
		<RootNav />
	</aside>
	<slot />
</Layout>
