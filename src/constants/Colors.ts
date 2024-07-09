export const THEME = {
  default: {
    primary: '#e5e5e5',
    primaryContainer: '#e5e5e5',
    secondaryContainer: '#676767',
    secondary: '#7b7b7b',
    tertiary: '#ffb86c',
    background: '#0e0c10',
  },
  catppuccin: {
    primary: '#cdd6f4',
    primaryContainer: '#f5c2e7',
    secondaryContainer: '#6c7086',
    secondary: '#7f849c',
    tertiary: '#a6e3a1',
    background: '#11111b',
  },
  dracula: {
    primary: '#F8F8F2',
    primaryContainer: '#8BE9FD',
    secondaryContainer: '#6272A4',
    secondary: '#6272A4',
    tertiary: '#50FA7B',
    background: '#282A36',
  },
};

export type Theme = typeof THEME.default;
export type ThemeName = keyof typeof THEME;
