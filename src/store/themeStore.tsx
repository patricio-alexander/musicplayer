import {create} from 'zustand';
import {THEME, Theme, ThemeName} from '../constants/Colors';

type ThemeStore = {
  theme: Theme;
  themeName: ThemeName;

  toggleTheme: (colorTheme: ThemeName) => void;
};

export const useThemeStore = create<ThemeStore>(set => ({
  theme: THEME.default,
  themeName: 'default',

  toggleTheme: colorTheme => {
    set({theme: THEME[colorTheme]});
    set({themeName: colorTheme});
  },
}));
