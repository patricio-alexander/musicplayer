import {StyleSheet, View, Image} from 'react-native';
import {COLORS} from '../constants/Colors';
import {useQueueStore} from '../store/queueStore';
import ProgressBar from '../components/ProgressBar';
import PlayerControls from '../components/PlayerControls';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Container from '../components/Container';
import Title from '../components/Title';
import {useEffect, useState} from 'react';
import {useTrackPlayerEvents, Event} from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';
import ImageColors from 'react-native-image-colors';

const PlayerScreen = () => {
  const songTitle = useQueueStore(state => state.songTitle);
  const [artwork, setArtWork] = useState<string>();
  const [colors, setColors] = useState({});

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    setArtWork(event?.track?.artwork ?? '');
  });

  return (
    <Container style={style.wrapper}>
      <View style={style.container}>
        <View style={style.wrapperIcon}>
          {artwork ? (
            <Image
              source={{uri: artwork}}
              style={{
                width: '100%',
                height: '50%',
                resizeMode: 'cover',
                borderRadius: 6,
                borderWidth: 1,
                borderColor: COLORS.dark[200],
              }}
            />
          ) : (
            <Icon name="music-note" size={90} />
          )}
        </View>

        <View style={{height: '40%'}}>
          <View style={style.songBox}>
            <Title style={style.title} numberOfLines={2} ellipsizeMode="tail">
              {songTitle}
            </Title>
          </View>
          <ProgressBar />
          <PlayerControls style={{marginTop: 40}} />
        </View>
      </View>
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
  },

  container: {
    justifyContent: 'space-between',
    height: '80%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    width: '100%',
    color: COLORS.dark[300],
  },
  songBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '20%',
  },
});

export default PlayerScreen;
