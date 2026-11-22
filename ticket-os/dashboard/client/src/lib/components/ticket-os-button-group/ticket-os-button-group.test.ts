import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import TicketOsButtonGroup from './ticket-os-button-group.svelte';

const options = [
  { value: 'day', label: 'Dia' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mês' },
];
const ui = { ariaLabel: 'Recorte do período' };

describe('TicketOsButtonGroup', () => {
  // feliz
  it('names the group and marks only the chosen option', () => {
    render(TicketOsButtonGroup, { props: { data: { options, value: 'week' }, ui } });

    expect(screen.getByRole('group', { name: 'Recorte do período' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Semana' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Dia' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('tells the screen which option the person picked', async () => {
    const onChange = vi.fn();
    render(TicketOsButtonGroup, {
      props: { data: { options, value: 'week' }, ui, actions: { onChange } },
    });

    await fireEvent.click(screen.getByRole('button', { name: 'Mês' }));

    expect(onChange).toHaveBeenCalledWith('month');
  });

  // triste
  it('locks every option when disabled', () => {
    render(TicketOsButtonGroup, {
      props: { data: { options, value: 'week' }, ui, state: { isDisabled: true } },
    });

    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled();
  });

  it('marks nothing when the value matches no option', () => {
    render(TicketOsButtonGroup, { props: { data: { options, value: '' }, ui } });

    for (const button of screen.getAllByRole('button'))
      expect(button).toHaveAttribute('aria-pressed', 'false');
  });
});
