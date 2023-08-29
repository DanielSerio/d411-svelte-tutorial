<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { svelte } from '@replit/codemirror-lang-svelte';
	import { sass } from '@codemirror/lang-sass';
	import { oneDark } from '@codemirror/theme-one-dark';
	export let value: string;
	export let lang: string;
</script>

<div class="code-block">
	{#if lang === 'javascript'}
		<CodeMirror bind:value lang={javascript()} theme={oneDark} />
	{:else if lang === 'svelte'}
		<CodeMirror bind:value lang={svelte()} theme={oneDark} />
	{:else}
		<CodeMirror bind:value lang={sass()} theme={oneDark} />
	{/if}
</div>
