<script module lang="ts">
	import { Badge, type BadgeVariant } from '$lib/components/ui/badge';

	export type TicketOsBadgeTone = 'default' | 'online' | 'offline';

	export type TicketOsBadgeProps = {
		ui?: {
			tone?: TicketOsBadgeTone;
			class?: string;
		};
	};

	const TONE_VARIANT: Record<TicketOsBadgeTone, BadgeVariant> = {
		default: 'secondary',
		online: 'default',
		offline: 'destructive'
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	let { ui, children }: TicketOsBadgeProps & { children?: Snippet } = $props();

	const toneClass = $derived(ui?.tone === 'online' ? 'bg-chart-4 text-base' : undefined);
</script>

<Badge variant={TONE_VARIANT[ui?.tone ?? 'default']} class={cn('uppercase', toneClass, ui?.class)}>
	{@render children?.()}
</Badge>
