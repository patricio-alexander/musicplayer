import {PermissionsAndroid} from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import {useAccess} from '../store/accessStore';
import {useQueueStore} from '../store/queueStore';
import {tracksFromDevice} from '../helpers/tracksFromDevice';
import TrackPlayer from 'react-native-track-player';
import {initizalizedPlayer} from '../../PlaybackService';

const WelcomeScreen = () => {
  const setAccess = useAccess(state => state.setAccess);
  const setTracks = useQueueStore(state => state.setTracks);

  const requestAudioMusicPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const init = await initizalizedPlayer();
        if (init) {
          const tracks = await tracksFromDevice({offset: 0});
          setTracks(tracks);
          await TrackPlayer.add(tracks);

          setAccess(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Button
        title="PERMISOS DE MÚSICA Y AUDIO"
        onPress={requestAudioMusicPermissions}
      />
    </Container>
  );
};

export default WelcomeScreen;
