<script lang="ts">
	//import '$lib/styles/critical/index.scss'; // <-- uncomment when working on critical styles (so you don't have to build on every change)
	import '$lib/styles/module/_code.scss';
	import '$lib/styles/module/_navigation.scss';
	import { onMount } from 'svelte';
	import { navStore } from '../stores/nav';
	import log from '$lib/utility/log/log';

	onMount(() => {
		if (typeof window !== 'undefined') {
			log();
		}
	});
</script>

<div
	class="root-layout {$navStore === 'LOADING'
		? 'load'
		: $navStore.isExpanded
		? 'nav-expanded'
		: 'nav-minimized'}"
>
	<slot />
</div>
