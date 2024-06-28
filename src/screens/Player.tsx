import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/Colors';
import {useQueueStore} from '../store/queueStore';
import ProgressBar from '../components/ProgressBar';
import PlayerControls from '../components/PlayerControls';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Container from '../components/Container';

export default function Player() {
  const songTitle = useQueueStore(state => state.songTitle);
  return (
    <Container style={style.wrapper}>
      <View style={style.container}>
        <View style={style.wrapperIcon}>
          <Icon name="music-note" size={90} />
        </View>

        <View style={{height: '40%'}}>
          <View style={style.songBox}>
            <Text style={style.title}>{songTitle}</Text>
          </View>
          <ProgressBar />
          <PlayerControls style={{marginTop: 40}} />
        </View>
      </View>
    </Container>
  );
}

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
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'right',
    fontWeight: '700',
    width: '100%',
    color: COLORS.dark[300],
  },
  songBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
