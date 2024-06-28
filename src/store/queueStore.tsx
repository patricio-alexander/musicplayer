import {create} from 'zustand';

import {PlayList, Track} from '../types/SongTypes';

type QueueStore = {
  activeQueueId: number | null;
  songTitle: string;
  tracks: Array<Track>;
  favorites: Array<number>;
  isFavorite: boolean;
  isRandom: boolean;
  playLists: Array<PlayList>;
  playListId: string;
  setPlayListId: (id: string) => void;
  setPlayLists: (tracks: Array<PlayList>) => void;
  setIsFavorite: (favorite: boolean) => void;
  setActiveQueueId: (id: number) => void;
  setSongTitle: (title: string) => void;
  setTracks: (newTracks: Array<Track>) => void;
  addFavorites: (newFavoites: number) => void;
  removeFavorites: (removeFavorite: number) => void;
  setFavorites: (favorites: Array<number>) => void;
  setIsRandom: (random: boolean) => void;
};

export const useQueueStore = create<QueueStore>()(set => ({
  activeQueueId: null,
  songTitle: '',
  tracks: [],
  favorites: [],
  isFavorite: false,
  isRandom: false,
  playLists: [],
  playListId: '',
  setPlayListId: id => set({playListId: id}),
  setPlayLists: listTracks => set({playLists: listTracks}),
  setIsFavorite: favorite => set({isFavorite: favorite}),
  setActiveQueueId: id => set({activeQueueId: id}),
  setSongTitle: title => set({songTitle: title}),
  setTracks: newTracks => set({tracks: newTracks}),
  addFavorites: favorite =>
    set(state => ({
      favorites: [...state.favorites, favorite],
    })),
  removeFavorites: removeFavorite =>
    set(state => ({
      favorites: state.favorites.filter(
        favorite => favorite !== removeFavorite,
      ),
    })),
  setFavorites: storageFavorite => set({favorites: storageFavorite}),
  setIsRandom: random => set({isRandom: random}),
}));
