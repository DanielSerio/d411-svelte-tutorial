<script lang="ts">
	export let name: string;
	export let pageTitle: string;
	export let metaDesc: string | undefined = undefined;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	{#if metaDesc}
		<meta name="description" content={metaDesc} />
	{/if}
</svelte:head>
<main class="page page-{name}" id="page">
	<slot />
</main>
