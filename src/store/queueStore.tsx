import {create} from 'zustand';

import {PlayList, Track} from '../types/SongTypes';

type QueueStore = {
  activeQueueId: number | null;
  tracks: Array<Track>;
  favorites: Array<number>;
  isFavorite: boolean;
  isRandom: boolean;
  playLists: Array<PlayList>;
  playListId: string;
  track: Track;
  setTrack: (track: Track) => void;
  setPlayListId: (id: string) => void;
  setPlayLists: (tracks: Array<PlayList>) => void;
  setIsFavorite: (favorite: boolean) => void;
  setActiveQueueId: (id: number) => void;
  setTracks: (newTracks: Array<Track>) => void;
  addFavorites: (newFavoites: number) => void;
  removeFavorites: (removeFavorite: number) => void;
  setFavorites: (favorites: Array<number>) => void;
  setIsRandom: (random: boolean) => void;
};

export const useQueueStore = create<QueueStore>()(set => ({
  activeQueueId: null,
  tracks: [],
  favorites: [],
  isFavorite: false,
  isRandom: false,
  playLists: [],
  playListId: '',
  track: {id: 0, title: '', artwork: '', url: ''},
  setTrack: track => set({track}),
  setPlayListId: id => set({playListId: id}),
  setPlayLists: listTracks => set({playLists: listTracks}),
  setIsFavorite: favorite => set({isFavorite: favorite}),
  setActiveQueueId: id => set({activeQueueId: id}),
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
