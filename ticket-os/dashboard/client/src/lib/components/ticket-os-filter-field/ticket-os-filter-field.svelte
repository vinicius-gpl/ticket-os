<script lang="ts" module>
  import type { Snippet } from 'svelte';

  /**
   * Um filtro com o NOME em cima: "Situação", "Departamento", "Estoque".
   *
   * Sem o nome, três ou quatro controles lado a lado são uma fileira de pastilhas e seletores
   * que não dizem o que cada um filtra — a pessoa descobre por tentativa. O rótulo é o mesmo
   * do campo de formulário (`ticket-os-text-field`), para a barra de filtros e o "Buscar" acima
   * dela parecerem a mesma família.
   *
   * O controle entra por `children` (um `ticket-os-option-picker`, normalmente). O nome para o
   * leitor de tela continua sendo o `ariaLabel` do próprio controle.
   */
  export type TicketOsFilterFieldProps = {
    data: { label: string };
    ui?: { className?: string };
    children?: Snippet;
  };
</script>

<script lang="ts">
  import { cn } from '$lib/utils/cn';

  let { data, ui, children }: TicketOsFilterFieldProps = $props();
</script>

<div class={cn('flex w-full min-w-0 max-w-full flex-col sm:w-auto gap-1.5', ui?.className)}>
  <span class="text-ink-700 text-sm font-medium">{data.label}</span>
  {@render children?.()}
</div>
