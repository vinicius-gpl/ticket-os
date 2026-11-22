<script lang="ts">
  /**
   * O conteúdo do `TicketOsCollapsible` entra por `children`, que é um snippet — e snippet só
   * se escreve dentro de um componente. Este casulo dá um conteúdo fixo para o teste procurar.
   */
  import TicketOsCollapsible, { type TicketOsCollapsibleProps } from './ticket-os-collapsible.svelte';

  let props: Omit<TicketOsCollapsibleProps, 'children'> = $props();
</script>

<TicketOsCollapsible {...props}>
  <p data-testid="conteudo">Setor, responsável e período.</p>
</TicketOsCollapsible>
