export const EVENTS_EX_1 = `<script lang="ts">
function onChange(e) {
  if (!focused) {
    focused = true;
  }
}

function onClick(e) {
  alert(e);
}

let inputValue: string = '';
let focused: boolean = false;
</script>
<input type="text" bind:value={inputValue} on:change={onChange} />
<button type="button" on:click={onClick}>Click Me</button>
`;
