export const THEME = {
  default: {
    text: '#f4f5fc',
    secondary: '#2f3954',
    tertiary: '#5b6c9c',
    accent: '#8ebbff',
    background: '#1d202f',
  },
  orange: {
    text: '#e5e5e5',
    secondary: '#3d3446',
    tertiary: '#78688f',
    accent: '#ffb86c',
    background: '#0e0c10',
  },
  catppuccin: {
    text: '#cdd6f4',
    secondary: '#2f304b',
    tertiary: '#5c619b',
    accent: '#a6e3a1',
    background: '#11111b',
  },
  dracula: {
    text: '#F8F8F2',
    secondary: '#343746',
    tertiary: '#677090',
    accent: '#50fa7b',
    background: '#282a36',
  },
};

export type Theme = typeof THEME.default;
export type ThemeName = keyof typeof THEME;
