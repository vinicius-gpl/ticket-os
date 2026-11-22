<script lang="ts">
	import TicketOsTooltip, { type TicketOsTooltipProps } from './ticket-os-tooltip.svelte';

	let {
		text = 'Dica rápida',
		ui,
		hasContent = false,
		triggerText = 'Passe o mouse'
	}: {
		text?: string;
		ui?: TicketOsTooltipProps['ui'];
		hasContent?: boolean;
		triggerText?: string;
	} = $props();
</script>

<TicketOsTooltip data={{ text }} {ui}>
	<span>{triggerText}</span>
	{#snippet content()}
		{#if hasContent}
			<span data-testid="tooltip-custom-content">Conteúdo Rico</span>
		{/if}
	{/snippet}
</TicketOsTooltip>
