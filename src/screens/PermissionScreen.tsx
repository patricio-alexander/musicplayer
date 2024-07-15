import {PermissionsAndroid} from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import {useAccess} from '../store/accessStore';
import {useQueueStore} from '../store/queueStore';
import {tracksFromDevice} from '../helpers/tracksFromDevice';
import TrackPlayer from 'react-native-track-player';
import {initizalizedPlayer} from '../../PlaybackService';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Track} from 'react-native-track-player';

const WelcomeScreen = () => {
  const setAccess = useAccess(state => state.setAccess);
  const setTracks = useQueueStore(state => state.setTracks);
  const insets = useSafeAreaInsets();

  const requestAudioMusicPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const init = await initizalizedPlayer();
        if (init) {
          let offset = 0;
          let allTracks: Track[] = [];
          while (true) {
            console.log(offset);
            const newTracks = await tracksFromDevice({offset: offset});
            if (newTracks.length) {
              allTracks = [...allTracks, ...newTracks];
              offset += 20;
            } else {
              break;
            }
          }
          const mapped = allTracks.map((track, i) => ({...track, id: i}));

          await TrackPlayer.add(mapped);
          setTracks(mapped);

          setAccess(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={{paddingTop: insets.top}}>
      <Button
        title="PERMISOS DE MÚSICA Y AUDIO"
        onPress={requestAudioMusicPermissions}
      />
    </Container>
  );
};

export default WelcomeScreen;
