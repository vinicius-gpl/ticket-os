import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FakeStorage } from '../../tests/fake-storage';

const STORAGE_KEY = 'ticket-os-agent-theme';

async function freshTheme() {
	// O módulo guarda o tema num $state no escopo do módulo, então cada teste
	// precisa de uma instância nova pra não herdar o estado do teste anterior.
	vi.resetModules();
	return import('./theme.svelte');
}

beforeEach(() => {
	vi.stubGlobal('localStorage', new FakeStorage());
	document.documentElement.removeAttribute('data-theme');
});

describe('useTheme', () => {
	it('começa no tema escuro quando não há nada salvo', async () => {
		// feliz
		const { useTheme } = await freshTheme();
		const theme = useTheme();
		expect(theme.value).toBe('dark');
		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
	});

	it('alterna entre escuro e claro e persiste no localStorage', async () => {
		// feliz
		const { useTheme } = await freshTheme();
		const theme = useTheme();

		theme.toggle();
		expect(theme.value).toBe('light');
		expect(window.localStorage.getItem(STORAGE_KEY)).toBe('light');
		expect(document.documentElement.getAttribute('data-theme')).toBe('light');

		theme.toggle();
		expect(theme.value).toBe('dark');
	});

	it('ignora valor inválido salvo no localStorage e cai no padrão', async () => {
		// triste: alguém (ou uma versão antiga) gravou um tema que não existe mais
		window.localStorage.setItem(STORAGE_KEY, 'nord');
		const { useTheme } = await freshTheme();
		expect(useTheme().value).toBe('dark');
	});
});
