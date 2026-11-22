<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TicketOsThemeToggle from './ticket-os-theme-toggle.svelte';

	const { Story } = defineMeta({
		title: 'Components/TicketOsThemeToggle',
		component: TicketOsThemeToggle
	});
</script>

<Story name="Default" />

<Story name="Within Toolbar Container">
	<div class="bg-card border-border flex w-fit items-center gap-2 rounded-lg border p-2">
		<span class="text-muted-foreground text-xs">Alternar tema:</span>
		<TicketOsThemeToggle />
	</div>
</Story>
