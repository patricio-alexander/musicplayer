import {StyleSheet, View, ViewStyle} from 'react-native';
import IconButton from './IconButton';
import React from 'react';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import {useQueueStore} from '../store/queueStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useThemeStore} from '../store/themeStore';
import {ToastAndroid} from 'react-native';
import {skipPrevious, skipNext} from '../helpers/musicHelpers';

type Props = {
  style?: ViewStyle;
};

const PlayerControls: React.FC<Props> = ({style}) => {
  const {
    isFavorite,

    markFavorite,
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
      return ToastAndroid.show('Modo aleatorio desactivado', ToastAndroid.LONG);
    }
    setIsRandom(true);
    ToastAndroid.show('Modo aleatorio activado', ToastAndroid.LONG);

    await AsyncStorage.setItem('randomtracks', '1');
  };

  return (
    <View style={[styles.container, style]}>
      <IconButton
        name={isFavorite ? 'star' : 'star-outline'}
        size={25}
        color={isFavorite ? theme.accent : theme.text}
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
        size={playing ? 35 : 35}
        style={{backgroundColor: theme.accent}}
        color={theme.secondary}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      />
      <IconButton name="skip-next" size={45} onPress={skipNext} />
      <IconButton
        name={isRandom ? 'shuffle' : 'shuffle-disabled'}
        size={25}
        color={isRandom ? theme.accent : theme.text}
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
