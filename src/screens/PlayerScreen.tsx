import {StyleSheet, View, Image, StatusBar} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import ProgressBar from '../components/ProgressBar';
import PlayerControls from '../components/PlayerControls';
import Title from '../components/Title';
import LinearGradient from 'react-native-linear-gradient';
import {usePlayerBackgrounGradient} from '../hooks/usePlayerBackgroundGradient';
import {useIsFocused} from '@react-navigation/native';
import Container from '../components/Container';
import {useThemeStore} from '../store/themeStore';

const PlayerScreen = () => {
  const track = useQueueStore(state => state.track);
  const img =
    typeof track.artwork === 'string'
      ? track.artwork
      : Image.resolveAssetSource(track.artwork).uri;

  const imgToGradient = typeof track.artwork === 'string' ? track.artwork : '';

  const {gradient} = usePlayerBackgrounGradient(imgToGradient);
  const isFocused = useIsFocused();
  const {theme} = useThemeStore();

  return (
    <Container>
      {isFocused && (
        <StatusBar
          backgroundColor={gradient ? gradient?.average : theme.background}
        />
      )}
      <LinearGradient
        style={{flex: 1}}
        colors={
          gradient
            ? [gradient?.average, gradient?.dominant]
            : [theme.background, theme.background]
        }>
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

          <Title style={style.title} numberOfLines={2} ellipsizeMode="tail">
            {track.title}
          </Title>
        </View>

        <ProgressBar />
        <PlayerControls style={{marginTop: 40}} />
      </LinearGradient>
    </Container>
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

  title: {
    textAlign: 'center',
    fontWeight: '700',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 30,
  },
});

export default PlayerScreen;
