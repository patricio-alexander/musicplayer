import {create} from 'zustand';
import {COLORS} from '../constants/Colors';

type Theme = {
  dominantColor: string;
  setDominantColor: (color: string) => void;
};

export const useThemeStore = create<Theme>(set => ({
  dominantColor: COLORS.dark[950],
  setDominantColor: color => set({dominantColor: color}),
}));
