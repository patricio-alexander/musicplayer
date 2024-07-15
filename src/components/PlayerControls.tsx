import {StyleSheet, View, ViewStyle} from 'react-native';
import IconButton from './IconButton';
import React from 'react';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import {useQueueStore} from '../store/queueStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {playTrack} from '../helpers/musicHelpers';
import {randomTrackInCustomPlayList} from '../helpers/musicHelpers';
import {useThemeStore} from '../store/themeStore';
import {ToastAndroid} from 'react-native';
import {randomIdTrack} from '../helpers/musicHelpers';

type Props = {
  style?: ViewStyle;
};

const PlayerControls: React.FC<Props> = ({style}) => {
  const {
    isFavorite,
    playListId,
    playLists,
    markFavorite,
    tracks,
    isRandom,
    setIsRandom,
    track,
    removeFavorites,
  } = useQueueStore();
  const {playing} = useIsPlaying();
  const {theme} = useThemeStore();

  // 1 cuando el reproduccion aleatoria esta activada y 0 cuando no
  const randomTracks = async () => {
    if (isRandom) {
      setIsRandom(false);
      await AsyncStorage.removeItem('randomtracks');
      ToastAndroid.show('Modo aleatorio desactivado', ToastAndroid.LONG);
      return;
    }
    setIsRandom(true);
    ToastAndroid.show('Modo aleatorio activado', ToastAndroid.LONG);

    await AsyncStorage.setItem('randomtracks', '1');
  };

  const skipPrevious = async () => {
    const playList = playLists[Number(playListId)];

    if (isRandom) {
      if (playListId) {
        randomTrackInCustomPlayList({playList});
        return;
      }

      const id = randomIdTrack({max: tracks.length});
      playTrack({id});
      return;
    }

    if (playListId) {
      // Set provious track in the custom playlist

      const currentIndex = playList.tracks.findIndex(e => e.url === track?.url);

      const previousTrackInPlayList =
        currentIndex > 0 && currentIndex < playList.tracks.length
          ? playList.tracks.find((_, i) => i === currentIndex - 1)
          : playList.tracks[playList.tracks.length - 1];

      const nextIndexTrack = tracks.findIndex(
        track => track.url === previousTrackInPlayList?.url,
      );

      TrackPlayer.skip(nextIndexTrack);

      return;
    }

    TrackPlayer.skipToPrevious();
  };

  const skipNext = async () => {
    const playList = playLists[Number(playListId)];

    if (isRandom) {
      if (playListId) {
        randomTrackInCustomPlayList({playList});
        return;
      }
      const id = randomIdTrack({max: tracks.length});
      playTrack({id});
      return;
    }

    if (playListId) {
      // Set next track in the custom playlist
      const currentIndex = playLists[Number(playListId)].tracks.findIndex(
        e => e.url === track?.url,
      );
      const nextTrackInPlayList =
        currentIndex !== -1 && currentIndex < playList.tracks.length - 1
          ? playLists[Number(playListId)].tracks.find(
              (_, i) => i === currentIndex + 1,
            )
          : null;

      if (nextTrackInPlayList) {
        const indexNextTrack = tracks.findIndex(
          track => track.url === nextTrackInPlayList?.url,
        );
        TrackPlayer.skip(indexNextTrack);
      }

      return;
    }
    TrackPlayer.skipToNext();
  };

  return (
    <View style={[styles.container, style]}>
      <IconButton
        name={isFavorite ? 'star' : 'star-outline'}
        size={25}
        color={isFavorite ? theme.tertiary : theme.primary}
        onPress={() => {
          if (!isFavorite) {
            markFavorite(track);
            return;
          }
          removeFavorites(track.url);
        }}
      />
      <IconButton name="skip-previous" size={45} onPress={skipPrevious} />
      <IconButton
        name={playing ? 'play' : 'pause'}
        size={playing ? 60 : 60}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      />
      <IconButton name="skip-next" size={45} onPress={skipNext} />
      <IconButton
        name={isRandom ? 'shuffle' : 'shuffle-disabled'}
        size={25}
        color={isRandom ? theme.tertiary : theme.primary}
        onPress={randomTracks}
      />
    </View>
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
