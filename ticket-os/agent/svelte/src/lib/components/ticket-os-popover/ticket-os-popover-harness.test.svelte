<script lang="ts">
	import TicketOsPopover, { type TicketOsPopoverProps } from './ticket-os-popover.svelte';

	let {
		title = 'Detalhes',
		description = 'Mais informações',
		ui,
		hasContent = true,
		triggerText = 'Abrir painel'
	}: {
		title?: string;
		description?: string;
		ui?: TicketOsPopoverProps['ui'];
		hasContent?: boolean;
		triggerText?: string;
	} = $props();
</script>

<TicketOsPopover data={{ title, description }} {ui}>
	<span>{triggerText}</span>
	{#snippet content()}
		{#if hasContent}
			<div data-testid="popover-content">Conteúdo interno</div>
		{/if}
	{/snippet}
</TicketOsPopover>
