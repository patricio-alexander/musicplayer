import {StyleSheet, View, Text, Image, StatusBar, Animated} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import ProgressBar from '../components/ProgressBar';
import PlayerControls from '../components/PlayerControls';
import Title from '../components/Title';
import LinearGradient from 'react-native-linear-gradient';
import {usePlayerBackgrounGradient} from '../hooks/usePlayerBackgroundGradient';
import {useIsFocused} from '@react-navigation/native';
import {useThemeStore} from '../store/themeStore';
import {useEffect, useRef} from 'react';

const PlayerScreen = () => {
  const {track, playListId, playLists} = useQueueStore();
  const img =
    typeof track.artwork === 'string'
      ? track.artwork
      : Image.resolveAssetSource(
          track?.artwork ?? require('../assets/player.png'),
        ).uri;

  const imgToGradient = typeof track.artwork === 'string' ? track.artwork : '';

  const {gradient} = usePlayerBackgrounGradient(imgToGradient);
  const isFocused = useIsFocused();
  const {theme} = useThemeStore();

  const fadeAnim = useRef(new Animated.Value(0.4)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeAnim.setValue(1);
    if (isFocused && typeof track.artwork === 'string') {
      fadeAnim.setValue(0);

      fadeIn();
      return;
    }
  }, [isFocused, track]);

  return (
    <>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: theme.background,
            opacity: fadeAnim,
          },
        ]}>
        {isFocused && <StatusBar backgroundColor="transparent" translucent />}
        <LinearGradient
          style={[StyleSheet.absoluteFillObject]}
          colors={
            gradient
              ? [gradient?.dominant, gradient?.average]
              : [theme.background, theme.background]
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
      </Animated.View>
      <View style={style.wrapperImage}>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Title>Reproduciendo</Title>
          <Text style={[style.namePlayList, {color: theme.accent}]}>
            {!playListId
              ? 'Canciones del dispositivo'
              : playLists[Number(playListId)].name}
          </Text>
        </View>

        <Image
          source={{uri: img}}
          style={{
            width: '90%',
            height: '65%',
            resizeMode: 'cover',

            borderRadius: 10,
          }}
        />

        <Title style={style.title} numberOfLines={1} ellipsizeMode="tail">
          {track.title}
        </Title>
      </View>
      <ProgressBar />
      <PlayerControls style={{marginTop: 40}} />
    </>
  );
};

const style = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 13,
    justifyContent: 'center',
  },

  wrapperImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: '60%',
    padding: 30,
  },

  gradient: {
    position: 'absolute',
  },

  namePlayList: {
    fontSize: 16,
    fontFamily: 'NunitoSans_400Regular',
  },

  title: {
    textAlign: 'center',
    width: '100%',
    marginTop: 30,
  },
});

export default PlayerScreen;
