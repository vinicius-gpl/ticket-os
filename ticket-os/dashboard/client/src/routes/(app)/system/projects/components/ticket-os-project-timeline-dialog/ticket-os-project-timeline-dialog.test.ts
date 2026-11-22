import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

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

describe('TicketOsProjectTimelineDialog', () => {
  // feliz
  it('renders dialog header with project name', () => {
    render(ProjectTimelineDialog, {
      props: {
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
          onClose: vi.fn(),
        },
      },
    });

    expect(screen.getByText('Timeline — ticket-os')).toBeInTheDocument();
  });

  // triste
  it('renders error message when state has an error', () => {
    render(ProjectTimelineDialog, {
      props: {
        data: {
          project: mockProject,
          items: [],
        },
        state: {
          isOpen: true,
          isLoading: false,
          error: 'Falha ao carregar eventos da timeline',
        },
        actions: {
          onClose: vi.fn(),
        },
      },
    });

    expect(screen.getByText('Falha ao carregar eventos da timeline')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(ProjectTimelineDialog, {
      props: {
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
          onClose,
        },
      },
    });

    const closeBtn = screen.getByRole('button', { name: 'Fechar diálogo' });
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
