import {StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/Colors';
import {useDirectoryStore} from '../store/directoryStore';
import DocumentPicker from 'react-native-document-picker';
import {uriToPath} from '../helpers/uriToPath';
import SettingItem from '../components/SettingItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFilesFromDirectory} from '../helpers/getFilesFromDir';
import {useQueueStore} from '../store/queueStore';
import TrackPlayer from 'react-native-track-player';
import Title from '../components/Title';

export default function Settings() {
  const selectedDirectory = useDirectoryStore(state => state.selectedDirectory);
  const setSelectedDirectory = useDirectoryStore(
    state => state.setSelectedDirectory,
  );
  const setTracks = useQueueStore(state => state.setTracks);

  const changeFolder = async () => {
    const localStorage = await AsyncStorage.getItem('playerdata');
    const playerData = JSON.parse(localStorage ?? '');
    const directory = await DocumentPicker.pickDirectory();
    const selected = uriToPath(directory?.uri ?? '');
    if (selected === selectedDirectory) return;
    playerData.pathSelectedDir = uriToPath(directory?.uri ?? '');
    setSelectedDirectory(uriToPath(directory?.uri ?? ''));
    await AsyncStorage.setItem('playerdata', JSON.stringify(playerData));
    const tracks = await getFilesFromDirectory({
      path: uriToPath(directory?.uri ?? ''),
    });
    setTracks(tracks);
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
  };

  return (
    <View style={style.container}>
      <Title size={25}>Ajustes</Title>
      <SettingItem
        iconName="folder"
        title={selectedDirectory ?? ''}
        onPress={changeFolder}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.dark[950],
    padding: 10,
  },
});
