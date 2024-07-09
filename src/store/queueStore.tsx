import {create} from 'zustand';

import {PlayList, Track} from '../types/SongTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type QueueStore = {
  tracks: Track[];
  favorites: Track[];
  isFavorite: boolean;
  isRandom: boolean;
  playLists: PlayList[];
  playListId: string;
  track: Track;
  markFavorite: (track: Track | null) => Promise<void>;
  setTrack: (track: Track) => void;
  setPlayListId: (id: string) => void;
  setPlayLists: (tracks: Array<PlayList>) => void;
  setIsFavorite: (favorite: boolean) => void;
  setTracks: (newTracks: Track[]) => void;
  removeFavorites: (removeFavorite: string | undefined) => void;
  setFavorites: (favorites: Track[]) => void;
  setIsRandom: (random: boolean) => void;
};

export const useQueueStore = create<QueueStore>()((set, get) => ({
  tracks: [],
  favorites: [],
  isFavorite: false,
  isRandom: false,
  playLists: [],
  playListId: '',
  track: {id: 0, title: '', artwork: require('../assets/player.png'), url: ''},
  setTrack: track => set({track}),
  setPlayListId: id => set({playListId: id}),
  setPlayLists: listTracks => set({playLists: listTracks}),
  setIsFavorite: favorite => set({isFavorite: favorite}),
  setTracks: newTracks => set({tracks: newTracks}),

  removeFavorites: async removeFavorite => {
    const {setIsFavorite, isFavorite} = get();

    try {
      setIsFavorite(!isFavorite);
      const storageFavorites = await AsyncStorage.getItem('favorites');
      const localFavorites = JSON.parse(storageFavorites ?? '');
      if (localFavorites.length) {
        const newFavorites = localFavorites.filter(
          (favorite: Track) => favorite.url !== removeFavorite,
        );
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        set({favorites: newFavorites});
      }
    } catch (error) {
      console.log(error, 'no existe el storage favorites');
    }
  },
  markFavorite: async track => {
    if (!track) return;
    const {isFavorite, setIsFavorite} = get();
    setIsFavorite(!isFavorite);

    try {
      const storageFavorites = await AsyncStorage.getItem('favorites');
      if (!storageFavorites) {
        await AsyncStorage.setItem('favorites', JSON.stringify([track]));
      }
      const localFavorites = JSON.parse(storageFavorites ?? '');
      const exist = localFavorites.find(
        (favorite: Track) => favorite?.url === track?.url,
      );
      //
      if (!exist) {
        localFavorites.push(track);
        await AsyncStorage.setItem('favorites', JSON.stringify(localFavorites));
        set(state => ({
          favorites: [...state.favorites, track],
        }));
      }
    } catch (error) {
      console.log(error, 'favorites');
    }
  },

  setFavorites: storageFavorite => set({favorites: storageFavorite}),
  setIsRandom: random => set({isRandom: random}),
}));
