<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TicketOsPopover from './ticket-os-popover.svelte';
	import TicketOsButton from '../ticket-os-button/ticket-os-button.svelte';

	const { Story } = defineMeta({
		title: 'Components/TicketOsPopover',
		component: TicketOsPopover
	});
</script>

<Story name="Default">
	<TicketOsPopover
		data={{
			title: 'Sobre o Agente',
			description: 'Informações de telemetria e versão'
		}}
	>
		{#snippet children()}
			<TicketOsButton ui={{ variant: 'outline', size: 'sm' }}>Abrir Popover</TicketOsButton>
		{/snippet}
		{#snippet content()}
			<div class="space-y-1 p-2 text-xs">
				<p>Versão: 1.0.0</p>
				<p>Status: Operacional</p>
			</div>
		{/snippet}
	</TicketOsPopover>
</Story>

<Story name="Side Top">
	<TicketOsPopover data={{ title: 'Dica Superior' }} ui={{ side: 'top', align: 'center' }}>
		{#snippet children()}
			<TicketOsButton ui={{ variant: 'secondary', size: 'sm' }}>Abrir Acima</TicketOsButton>
		{/snippet}
		{#snippet content()}
			<p class="p-2 text-xs">Aberto acima do elemento disparador.</p>
		{/snippet}
	</TicketOsPopover>
</Story>

<Story name="Side Right">
	<TicketOsPopover data={{ title: 'Painel Lateral' }} ui={{ side: 'right', align: 'start' }}>
		{#snippet children()}
			<TicketOsButton ui={{ variant: 'ghost', size: 'sm' }}>Abrir à Direita</TicketOsButton>
		{/snippet}
		{#snippet content()}
			<p class="p-2 text-xs">Exibido alinhado ao lado direito.</p>
		{/snippet}
	</TicketOsPopover>
</Story>

<Story name="Content Only">
	<TicketOsPopover>
		{#snippet children()}
			<TicketOsButton ui={{ size: 'sm' }}>Sem Cabeçalho</TicketOsButton>
		{/snippet}
		{#snippet content()}
			<div class="p-3 text-xs">
				<p class="font-medium">Conteúdo direto</p>
				<p class="text-muted-foreground">Sem título nem descrição no cabeçalho.</p>
			</div>
		{/snippet}
	</TicketOsPopover>
</Story>

<Story name="Long Content (edge case)">
	<TicketOsPopover
		data={{
			title: 'Termos e Condições Extensos',
			description: 'Descrição longa para testar capacidade do container'
		}}
		ui={{ class: 'max-w-xs' }}
	>
		{#snippet children()}
			<TicketOsButton ui={{ variant: 'destructive', size: 'sm' }}>Conteúdo Longo</TicketOsButton>
		{/snippet}
		{#snippet content()}
			<div class="text-muted-foreground space-y-1 p-2 text-xs">
				<p>
					Texto detalhado de múltiplos parágrafos para validar scrolling ou quebra de linha interna.
				</p>
			</div>
		{/snippet}
	</TicketOsPopover>
</Story>
