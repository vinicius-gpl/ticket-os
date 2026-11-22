import { type StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.svelte'],
  /* A logo e o favicon moram em `static/`, como no app: sem isto, `/favicon.svg` caía no
     ícone do próprio Storybook. */
  staticDirs: ['../static'],
  /* `addon-essentials` não existe mais: do Storybook 9 em diante controls, actions,
     viewport, backgrounds e docs vêm no core, e o pacote foi descontinuado. Sobra o a11y,
     que continua sendo addon — e é o que o CONTRIBUTING exige em todo primitivo. O
     addon-svelte-csf traz o formato `<Story>` que o Svelte 5 usa no lugar do CSF3 do React. */
  addons: ['@storybook/addon-a11y', '@storybook/addon-svelte-csf'],
  /* `sveltekit`, e não `svelte-vite`: desde o Storybook 10 o svelte-vite recusa projeto
     SvelteKit, e o catálogo nem abria. */
  framework: { name: '@storybook/sveltekit', options: {} },
  core: { disableTelemetry: true },
};

export default config;
