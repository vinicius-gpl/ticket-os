<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TicketOsTooltip from './ticket-os-tooltip.svelte';
	import TicketOsButton from '../ticket-os-button/ticket-os-button.svelte';

	const { Story } = defineMeta({
		title: 'Components/TicketOsTooltip',
		component: TicketOsTooltip
	});
</script>

<Story name="Default">
	<TicketOsTooltip data={{ text: 'Informações rápidas ao passar o mouse' }}>
		<TicketOsButton ui={{ variant: 'ghost', size: 'sm' }}>Passe o mouse</TicketOsButton>
	</TicketOsTooltip>
</Story>

<Story name="Bottom Position">
	<TicketOsTooltip data={{ text: 'Exibido abaixo do elemento' }} ui={{ side: 'bottom' }}>
		<TicketOsButton ui={{ variant: 'outline', size: 'sm' }}>Posição Inferior</TicketOsButton>
	</TicketOsTooltip>
</Story>

<Story name="Rich Content">
	<TicketOsTooltip>
		<TicketOsButton ui={{ variant: 'secondary', size: 'sm' }}>Conteúdo Rico</TicketOsButton>
		{#snippet content()}
			<div class="p-1 text-xs">
				<p class="font-bold">Dica Detalhada</p>
				<p class="text-muted-foreground">Suporte a múltiplos elementos HTML internos.</p>
			</div>
		{/snippet}
	</TicketOsTooltip>
</Story>

<Story name="Long Text (edge case)">
	<TicketOsTooltip
		data={{
			text: 'Texto de ajuda muito longo para validar como o tooltip se comporta com largura máxima e quebra de linha em telas compactas.'
		}}
	>
		<TicketOsButton ui={{ size: 'sm' }}>Texto Longo</TicketOsButton>
	</TicketOsTooltip>
</Story>

<Story name="Empty Text (edge case)">
	<TicketOsTooltip data={{ text: '' }}>
		<TicketOsButton ui={{ variant: 'outline', size: 'sm' }}>Sem Texto</TicketOsButton>
	</TicketOsTooltip>
</Story>
