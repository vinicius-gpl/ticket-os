<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';

  import ProjectTimelineDialog from './ticket-os-project-timeline-dialog.svelte';
  import { type SoftwareProject } from '@template/shared/schemas/software-project.schema';

  const mockProject: SoftwareProject = {
    id: 1,
    name: 'ticket-os',
    description: 'Sistema de suporte e chamados',
    repositoryUrl: 'vinicius-gpl/ticket-os',
    githubRepoOwner: 'vinicius-gpl',
    githubRepoName: 'ticket-os',
    responsibleId: null,
    responsibleName: null,
    status: 'active',
    color: 'blue',
    openTicketsCount: 2,
    pullRequestsCount: 10,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: null,
  };

  const { Story } = defineMeta({
    title: 'Features/System/TicketOsProjectTimelineDialog',
    component: ProjectTimelineDialog,
  });
</script>

<Story
  name="Default"
  args={{
    data: {
      project: mockProject,
      items: [],
    },
    state: {
      isOpen: true,
      isLoading: false,
      error: null,
    },
    actions: {
      onClose: fn(),
    },
  }}
/>
