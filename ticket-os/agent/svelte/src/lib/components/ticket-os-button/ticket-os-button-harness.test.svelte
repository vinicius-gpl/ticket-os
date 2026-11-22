<script lang="ts">
	import TicketOsButton, { type TicketOsButtonProps } from './ticket-os-button.svelte';

	let { events, ui }: TicketOsButtonProps = $props();
</script>

<TicketOsButton {events} {ui}>
	{#snippet children()}
		Abrir Dashboard
	{/snippet}
</TicketOsButton>
