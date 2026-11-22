<script lang="ts">
  /**
   * O controle do `TicketOsFilterField` entra por `children`, que é um snippet — e snippet só se
   * escreve dentro de um componente. Este casulo põe um controle fixo para o teste procurar.
   */
  import TicketOsFilterField from './ticket-os-filter-field.svelte';

  let { label, className, isEmpty = false }: { label: string; className?: string; isEmpty?: boolean } =
    $props();
</script>

{#if isEmpty}
  <TicketOsFilterField data={{ label }} ui={{ className }} />
{:else}
  <TicketOsFilterField data={{ label }} ui={{ className }}>
    <button type="button">Todas</button>
  </TicketOsFilterField>
{/if}
