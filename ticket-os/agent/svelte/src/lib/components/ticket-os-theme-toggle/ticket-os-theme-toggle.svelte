<script lang="ts">
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';
	import TicketOsButton from '$lib/components/ticket-os-button/ticket-os-button.svelte';
	import { useTheme } from '$lib/theme/theme.svelte';

	const theme = useTheme();
</script>

<TicketOsButton
	events={{ onClick: theme.toggle }}
	ui={{ variant: 'ghost', size: 'icon', title: 'Alternar tema' }}
>
	{#if theme.value === 'dark'}
		<MoonIcon size={16} />
	{:else}
		<SunIcon size={16} />
	{/if}
</TicketOsButton>
