<script lang="ts">
  import type { SoftwareTimelineEvent } from '@template/shared/schemas/software-timeline.schema';
  import * as Tooltip from '$lib/components/ticket-os-tooltip/ticket-os-tooltip';
  import CalendarEvent from './ticket-os-github-calendar-event.svelte';
  let { event, compact = false }: { event: SoftwareTimelineEvent; compact?: boolean } = $props();
</script>

<Tooltip.Provider delayDuration={0}><CalendarEvent {event} {compact} /></Tooltip.Provider>
