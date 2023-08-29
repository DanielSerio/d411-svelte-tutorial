export const LAYOUTS_EX_1 = `import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => {
  const serial = params.serial;

  return {
    serial
  };
};
`;
export const LAYOUTS_EX_2 = `<script lang="ts">
  import Page from '$lib/components/layout/Page.svelte';
  export let data;
</script>

<Page name="products">
  <h1>Product Serial: {data.serial}</h1>
</Page>
`;

export const LAYOUT_DIR_EX_1 = `<script lang="ts">
import Layout from '$lib/components/layout/Layout.svelte';
import Nav from '$lib/components/navigation/Nav.svelte';
</script>

<Layout name="main">
  <aside id="aside" class="aside-root">
    <Nav />
  </aside>
  <slot />
</Layout>
`;

export const LAYOUT_DIR_EX_2 = `<script lang="ts">
import Layout from '$lib/components/layout/Layout.svelte';
</script>

<Layout name="form">
  <div class="backdrop" />
  <slot />
</Layout>
`;

export const LAYOUT_DIR_EX_3 = `<script lang="ts">
import Layout from '$lib/components/layout/Layout.svelte';
</script>

<Layout name="simple">
  <slot />
</Layout>
`;
