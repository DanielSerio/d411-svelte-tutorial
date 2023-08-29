export const CUSTOM_EVENT_EX_1A = `<script lang="ts">
  import { createEventDispatcher } from 'svelte';

	let count: number = 0;
	const dispatch = createEventDispatcher<{ clickedTwice: { customPropName: string } }>();

	function onClick() {
		count += 1;
		if (count === 2) {
			dispatch('clickedTwice', { customPropName: 'Custom Event Fired!' });
		}
	}
</script>

<button type="button" on:click={onClick}>Click Me</button>
`;

export const CUSTOM_EVENT_EX_1B = `<script lang="ts">
  import CustomButton from './CustomButton.svelte';

	function onClickedTwice(e) {
		alert(e.detail.customPropName)
	}
</script>

<CustomButton on:clickedTwice={onClickedTwice} />`;
