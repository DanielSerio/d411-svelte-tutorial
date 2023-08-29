export const BIND_EX_1 = `
<script lang="ts">
  let text: string = '';
</script>

<input type="text" bind:value={text} />
`;

export const BIND_EX_2 = `
<script lang="ts">
  let value: string = '';
</script>

<input type="text" bind:value  />
`;
