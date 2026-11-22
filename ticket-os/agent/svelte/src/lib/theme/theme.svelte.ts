// Tema simplificado em relação ao hook do projeto de referência
// (acerola-reader usa @tauri-apps/plugin-store + 4 paletas + modo "system").
// Aqui só existem duas paletas (escuro/claro), persistidas em localStorage
// como o pedido original especifica — sem API de plugin nenhuma.

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'ticket-os-agent-theme';
const DEFAULT_THEME: Theme = 'dark';

function loadInitial(): Theme {
	if (typeof window === 'undefined') return DEFAULT_THEME;
	const saved = window.localStorage.getItem(STORAGE_KEY);
	return saved === 'light' ? saved : DEFAULT_THEME;
}

const initial = loadInitial();
let theme = $state<Theme>(initial);

function apply(value: Theme) {
	if (typeof document === 'undefined') return;
	document.documentElement.setAttribute('data-theme', value);
}

apply(initial);

export function useTheme() {
	return {
		get value() {
			return theme;
		},
		toggle() {
			theme = theme === 'dark' ? 'light' : 'dark';
			window.localStorage.setItem(STORAGE_KEY, theme);
			apply(theme);
		}
	};
}
