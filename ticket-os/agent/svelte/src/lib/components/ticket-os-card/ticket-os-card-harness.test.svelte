<script lang="ts">
	import TicketOsCard, { type TicketOsCardProps } from './ticket-os-card.svelte';

	let { data, ui }: TicketOsCardProps = $props();
</script>

<TicketOsCard {data} {ui}>
	{#snippet children()}
		<p>42%</p>
	{/snippet}
</TicketOsCard>
