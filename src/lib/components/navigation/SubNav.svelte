<script lang="ts">
	import { page } from '$app/stores';
	import { toggleNav } from '$stores/nav';
	import RouteSvg from '../Svg/RouteSvg.svelte';

	export let name: string;

	$: navItems = [
		{
			name: 'svelte',
			text: 'Svelte Tutorial',
			isActive: $page.url.pathname.includes('svelte')
		},
		{
			name: 'javascript',
			text: 'Javascript Tips',
			isActive: $page.url.pathname.includes('javascript')
		},
		{
			name: 'scss',
			text: 'SCSS Tips',
			isActive: $page.url.pathname.includes('scss')
		}
	];
</script>

<nav class="sub-nav sub-nav-{name}" id="mainNav">
	<div class="menu-area">
		<button class="menu-btn" title="Menu" type="button" on:click={toggleNav}>
			<i class="bi bi-list" /></button
		>
	</div>
	<div class="top">
		{#each navItems as navItem}
			<a class:active={navItem.isActive} href="/{navItem.name}">
				<RouteSvg name={navItem.name} isActive={navItem.isActive} />
				<span class="text">{navItem.text}</span>
			</a>
		{/each}
	</div>
	<div class="nav-body">
		<div class="nav-content">
			<slot />
		</div>
	</div>
	<figure class="logo">
		<img src="https://dock411.com/logo.png" alt="" />
	</figure>
</nav>
