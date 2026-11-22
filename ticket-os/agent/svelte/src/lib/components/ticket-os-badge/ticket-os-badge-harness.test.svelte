<script lang="ts">
	import TicketOsBadge, { type TicketOsBadgeProps } from './ticket-os-badge.svelte';

	let { ui, text = 'rótulo' }: TicketOsBadgeProps & { text?: string } = $props();
</script>

<TicketOsBadge {ui}>
	{#snippet children()}
		{text}
	{/snippet}
</TicketOsBadge>
