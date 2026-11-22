<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AppShell from '$lib/components/ticket-os-app-shell/ticket-os-app-shell.svelte';

  const { Story } = defineMeta({
    title: 'Components/TicketOsSidebarControls',
    component: AppShell,
  });
</script>

<Story name="Expanded">
  {#snippet template()}
    <AppShell><p>Arraste a borda para recolher o menu.</p></AppShell>
  {/snippet}
</Story>
<Story name="Collapsed">
  {#snippet template()}
    <AppShell initialSidebarOpen={false}><p>Arraste a borda para expandir o menu.</p></AppShell>
  {/snippet}
</Story>
