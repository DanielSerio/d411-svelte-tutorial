<script lang="ts">
	export let variant: 'code' | 'url' = 'code';
	export let color: 'primary' | 'secondary' | 'white' = 'primary';
</script>

<code class="inline-code {variant} {color}">
	<slot />
</code>
