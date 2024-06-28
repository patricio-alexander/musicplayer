import {StyleSheet, View, ViewStyle} from 'react-native';
import IconButton from './IconButton';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants/Colors';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import {
  getActiveTrack,
  getActiveTrackIndex,
  skipToNext,
} from 'react-native-track-player/lib/src/trackPlayer';
import {useQueueStore} from '../store/queueStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {playTrack} from '../../PlaybackService';

type Props = {
  style?: ViewStyle;
};

const PlayerControls: React.FC<Props> = ({style}) => {
  const isFavorite = useQueueStore(state => state.isFavorite);
  const setIsFavorite = useQueueStore(state => state.setIsFavorite);
  const addFavorite = useQueueStore(state => state.addFavorites);
  const {playing} = useIsPlaying();
  const removeFavorite = useQueueStore(state => state.removeFavorites);
  const tracks = useQueueStore(state => state.tracks);
  const isRandom = useQueueStore(state => state.isRandom);
  const setIsRandom = useQueueStore(state => state.setIsRandom);
  const playListId = useQueueStore(state => state.playListId);
  const playLists = useQueueStore(state => state.playLists);

  const markFavorite = async (): Promise<void> => {
    try {
      const activeTrack = await getActiveTrack();
      setIsFavorite(!isFavorite);
      addFavorite(activeTrack?.id);
      const storageFavorites = await AsyncStorage.getItem('favorites');
      if (!storageFavorites) {
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify([activeTrack?.id]),
        );
      }
      const localFavorites = JSON.parse(storageFavorites ?? '');

      if (!localFavorites.includes(activeTrack?.id)) {
        localFavorites.push(activeTrack?.id);
        await AsyncStorage.setItem('favorites', JSON.stringify(localFavorites));
      }
    } catch (error) {
      console.log(error, 'no existe el favorites');
    }
  };

  const randomIdTrack = ({max}: {max: number}) =>
    Math.floor(Math.random() * max);

  // 1 cuando el reproduccion aleatoria esta activada y 0 cuando no
  const randomTracks = async () => {
    setIsRandom(!isRandom);
    await AsyncStorage.setItem('randomtracks', '1');
  };

  const removeIsFavorite = async () => {
    try {
      const activeTrack = await getActiveTrack();
      const storageFavorites = await AsyncStorage.getItem('favorites');
      const localFavorites = await JSON.parse(storageFavorites ?? '');
      if (!isFavorite && localFavorites.length) {
        removeFavorite(activeTrack?.id);
        const newFavorites = localFavorites.filter(
          (favorite: number) => favorite !== activeTrack?.id,
        );
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      }
    } catch (error) {
      console.log(error, 'no existe el storage favorites');
    }
  };

  const skipNext = async () => {
    const playList = playLists[Number(playListId)];

    if (isRandom) {
      if (playListId) {
        const randomIndex = randomIdTrack({
          max: playList.tracks.length,
        });
        const id = playList.tracks[randomIndex].id;
        playTrack({id});
        return;
      }
      const id = randomIdTrack({max: tracks.length});
      playTrack({id});
      return;
    }
    if (playListId) {
      const activeTrack = await getActiveTrack();
      const currentIndex = playLists[Number(playListId)].tracks.findIndex(
        e => e.id === activeTrack?.id,
      );
      const nexIndexTrack =
        currentIndex !== -1 && currentIndex < playList.tracks.length - 1
          ? currentIndex + 1
          : null;
      const idTrack = nexIndexTrack && playList.tracks[nexIndexTrack]?.id;
      if (idTrack) playTrack({id: idTrack});
    }
  };

  useEffect(() => {
    removeIsFavorite();
  }, [isFavorite]);

  return (
    <>
      <View style={[styles.container, style]}>
        <IconButton
          name={isFavorite ? 'favorite' : 'favorite-outline'}
          size={20}
          color={isFavorite ? COLORS.rising : COLORS.dark[100]}
          onPress={markFavorite}
        />
        <IconButton
          name="skip-previous"
          size={40}
          color={COLORS.dark[100]}
          onPress={() => {
            TrackPlayer.skipToPrevious();
          }}
        />
        <IconButton
          name={playing ? 'play-arrow' : 'pause'}
          size={playing ? 50 : 50}
          color={COLORS.dark[300]}
          onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
        />
        <IconButton
          name="skip-next"
          size={40}
          color={COLORS.dark[300]}
          onPress={skipNext}
        />
        <IconButton
          name={isRandom ? 'shuffle-on' : 'shuffle'}
          size={20}
          color={isRandom ? COLORS.rising : COLORS.dark[300]}
          onPress={randomTracks}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
});

export default PlayerControls;
