import { describe, expect, it } from 'vitest';

import {
  parseGitHubRepo,
  softwareProjectStatusLabel,
} from './software-project.util';

describe('software-project.util', () => {
  it('parses GitHub URLs and owner/repo formats correctly', () => {
    // feliz
    expect(parseGitHubRepo('https://github.com/vinicius-gpl/ticket-os')).toEqual({
      owner: 'vinicius-gpl',
      repo: 'ticket-os',
    });
    expect(parseGitHubRepo('https://github.com/vinicius-gpl/ticket-os.git')).toEqual({
      owner: 'vinicius-gpl',
      repo: 'ticket-os',
    });
    expect(parseGitHubRepo('vinicius-gpl/ticket-os')).toEqual({
      owner: 'vinicius-gpl',
      repo: 'ticket-os',
    });

    // triste
    expect(parseGitHubRepo('')).toBeNull();
    expect(parseGitHubRepo('invalid-format')).toBeNull();
    expect(parseGitHubRepo('https://gitlab.com/owner/repo')).toBeNull();
  });

  it('translates status label to pt-BR', () => {
    expect(softwareProjectStatusLabel('active')).toBe('Ativo');
    expect(softwareProjectStatusLabel('maintenance')).toBe('Manutenção');
    expect(softwareProjectStatusLabel('deprecated')).toBe('Legado / Descontinuado');
  });
});
