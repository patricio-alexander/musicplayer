import {StyleSheet, View, Image, StatusBar, Animated} from 'react-native';
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
  const track = useQueueStore(state => state.track);
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
    fadeAnim.setValue(0.4);
    if (isFocused && typeof track.artwork === 'string') {
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
              ? [gradient?.average, gradient?.dominant]
              : [theme.background, theme.background]
          }
        />
      </Animated.View>
      <View style={style.wrapperImage}>
        <Image
          source={{uri: img}}
          style={{
            width: '100%',
            height: '60%',
            resizeMode: 'cover',
            shadowColor: '#000',
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

  title: {
    textAlign: 'center',
    fontWeight: '700',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 30,
  },
});

export default PlayerScreen;
