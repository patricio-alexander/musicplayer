import {StyleSheet, View, Image, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../constants/Colors';
import {useQueueStore} from '../store/queueStore';
import ProgressBar from '../components/ProgressBar';
import PlayerControls from '../components/PlayerControls';
import Title from '../components/Title';
import LinearGradient from 'react-native-linear-gradient';
import {usePlayerBackgrounGradient} from '../hooks/usePlayerBackgroundGradient';
import {useIsFocused} from '@react-navigation/native';
import Container from '../components/Container';

const PlayerScreen = () => {
  const track = useQueueStore(state => state.track);
  const img =
    typeof track.artwork === 'object'
      ? track.artwork.uri
      : Image.resolveAssetSource(track.artwork).uri;

  const {gradient} = usePlayerBackgrounGradient(img);
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused && (
        <StatusBar
          backgroundColor={gradient ? gradient?.average : COLORS.dark[900]}
        />
      )}
      <LinearGradient
        style={{flex: 1}}
        colors={
          gradient
            ? [gradient?.average, gradient?.dominant]
            : [COLORS.dark[900], COLORS.dark[950]]
        }>
        <View style={style.wrapperIcon}>
          <Image
            source={track?.artwork}
            style={{
              width: '100%',
              height: '50%',
              resizeMode: 'cover',
              shadowColor: '#000',
              borderRadius: 10,
            }}
          />
        </View>

        <Title style={style.title} numberOfLines={2} ellipsizeMode="tail">
          {track.title}
        </Title>
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

  wrapperIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: '60%',
    padding: 30,
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    width: '100%',
    color: COLORS.chardonnay[200],
  },
});

export default PlayerScreen;
