export const THEME = {
  default: {
    text: '#f4f5fc',
    secondary: '#2f3954',
    background: '#1d202f',
    accent: '#8ebbff',
  },
  orange: {
    text: '#e5e5e5',
    secondary: '#7b7b7b',
    accent: '#ffb86c',
    background: '#0e0c10',
  },
  catppuccin: {
    text: '#cdd6f4',
    secondary: '#7f849c',
    accent: '#a6e3a1',
    background: '#11111b',
  },
  dracula: {
    text: '#F8F8F2',
    secondary: '#6272A4',
    accent: '#50FA7B',
    background: '#282A36',
  },
};

export type Theme = typeof THEME.default;
export type ThemeName = keyof typeof THEME;
