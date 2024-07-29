import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import {useAccess} from '../store/accessStore';
import {useQueueStore} from '../store/queueStore';
import {tracksFromDevice} from '../helpers/tracksFromDevice';
import TrackPlayer from 'react-native-track-player';
import {initizalizedPlayer} from '../../PlaybackService';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Track} from 'react-native-track-player';
import {ActivityIndicator} from 'react-native';
import {useState} from 'react';
import {useThemeStore} from '../store/themeStore';
import Title from '../components/Title';

const WelcomeScreen = () => {
  const setAccess = useAccess(state => state.setAccess);
  const {theme} = useThemeStore();
  const setTracks = useQueueStore(state => state.setTracks);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const requestAudioMusicPermissions = async () => {
    try {
      let granted;

      if (Number(Platform.Version) >= 33) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        );
      } else if (Number(Platform.Version) >= 30) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      } else {
        granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        const isGranted =
          typeof granted === 'string'
            ? granted === PermissionsAndroid.RESULTS.GRANTED
            : granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
                PermissionsAndroid.RESULTS.GRANTED;

        if (!isGranted) {
          Alert.alert(
            'Permiso denegado',
            'No se pudo obtener permiso para acceder a los archivos de audio.',
          );
          return;
        }
      }
      setLoading(true);
      const init = await initizalizedPlayer();
      if (init) {
        let offset = 0;
        let allTracks: Track[] = [];
        while (true) {
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
    } catch (error) {
      console.error(error);
      Alert.alert('Opps...', `Al parecer ocurrio un error ${error}`, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{paddingTop: insets.top}}>
      <Title style={{marginTop: 30, marginHorizontal: 20}}>
        ¡Es un placer tenerte por aquí! 🎉
      </Title>
      <Text style={[styles.text, {color: theme.text}]}>
        Bienvenido a Minimalist Player, es un reproductor de música sin conexión
        para reproducir archivos de audio almacenados de su dispositivo.
      </Text>

      <Button
        title="PERMISOS DE MÚSICA Y AUDIO"
        onPress={requestAudioMusicPermissions}
        disabled={loading}
      />

      {loading && (
        <ActivityIndicator
          color={theme.accent}
          style={{marginTop: 20}}
          size="large"
        />
      )}
    </Container>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    margin: 20,
    fontFamily: 'NunitoSans_400Regular',
  },
});
