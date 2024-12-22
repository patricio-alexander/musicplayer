import {StyleSheet, View, Image, StatusBar, Animated} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import ProgressBar from '../components/ProgressBar';
import PlayerControls from '../components/PlayerControls';
import Title from '../components/Title';
import LinearGradient from 'react-native-linear-gradient';
import {usePlayerBackgrounGradient} from '../hooks/usePlayerBackgroundGradient';
import {useIsFocused} from '@react-navigation/native';
import {useThemeStore} from '../store/themeStore';
import React, {useEffect, useRef, useState} from 'react';
import StatusPlaying from '../components/StatusPlaying';

const PlayerScreen = () => {
  const {track} = useQueueStore();
  const [focus, setFocus] = useState(false);
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
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isFocused && typeof track.artwork === 'string') {
      fadeAnim.setValue(0);
      setFocus(true);
      fadeIn();

      return;
    }

    fadeAnim.setValue(1);
    setFocus(false);
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
            gradient && focus
              ? [gradient?.dominant, gradient?.average]
              : [theme.background, theme.background]
          }
          start={{x: 0, y: 0}}
          end={{x: 1.5, y: 1.5}}
        />
      </Animated.View>
      <View style={style.wrapperImage}>
        <View style={{alignItems: 'center', marginBottom: 20, marginTop: 20}}>
          <Title>Reproduciendo</Title>
          <StatusPlaying />
        </View>

        <Image
          source={{uri: img}}
          style={{
            width: '100%',
            height: '50%',
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
  wrapperImage: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 30,
  },

  gradient: {
    position: 'absolute',
  },

  title: {
    textAlign: 'center',
    width: '100%',
    marginTop: 30,
  },
});

export default PlayerScreen;
