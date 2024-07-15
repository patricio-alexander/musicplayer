import {CustomPlayListProps} from '../types/ScreenTypes';
import Container from '../components/Container';
import Button from '../components/Button';
import Modal from '../components/Modal';
import {useEffect, useState} from 'react';
import Title from '../components/Title';
import {useQueueStore} from '../store/queueStore';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PlayListItem from '../components/PlayListItem';
import Input from '../components/Input';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PlayList} from '../types/SongTypes';
import {playTrack} from '../helpers/musicHelpers';
import ListItem from '../components/ListItem';
import IconButton from '../components/IconButton';
import TrackOptionsModal from '../components/TrackOptionsModal';
import {Track} from 'react-native-track-player';

type SelectedTrack = Track & {
  checked: boolean;
};

const CustomPlayListScreen = ({navigation, route}: CustomPlayListProps) => {
  const {playListId} = route.params;
  const [visible, setVisible] = useState(false);
  const tracks = useQueueStore(state => state.tracks);
  const [search, setSearch] = useState('');
  const [checkedTracks, setCheckedTracks] = useState<Array<SelectedTrack>>([]);
  const playLists = useQueueStore(state => state.playLists);
  const [visibleModalEdit, setVisibleModalEdit] = useState<boolean>(false);
  const [valueEditPlayList, setValueEditPlayList] = useState<string>('');
  const [visibleOptions, setVisibleOptions] = useState<boolean>(false);
  const [visibleTracksOptions, setVisibleTracksOptions] =
    useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const {setPlayLists, setPlayListId} = useQueueStore();

  const onChangeCheckBox = ({url}: {url: string}) => {
    const newSelectedTracks = checkedTracks.map(track => {
      if (track.url === url) {
        return {...track, checked: !track.checked};
      }
      return track;
    });

    setCheckedTracks(newSelectedTracks);
  };

  const filter = checkedTracks.filter(track =>
    track.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const addTracksSelected = async () => {
    const tracksChecked = checkedTracks.filter(track => track.checked);

    const localStorage = (await AsyncStorage.getItem('playLists')) ?? '';
    const arrayPlayLists = JSON.parse(localStorage);
    arrayPlayLists[playListId].tracks = tracksChecked;
    await AsyncStorage.setItem('playLists', JSON.stringify(arrayPlayLists));
    const updatePlayLists = playLists.map((playlist: PlayList, i: number) =>
      i === playListId ? {...playlist, tracks: tracksChecked} : playlist,
    );
    setPlayLists(updatePlayLists);
  };

  const deletePlayList = async () => {
    const localStorage = (await AsyncStorage.getItem('playLists')) ?? '';
    const storagePlayLists = JSON.parse(localStorage);
    storagePlayLists.splice(playListId, 1);
    await AsyncStorage.setItem('playLists', JSON.stringify(storagePlayLists));
    setPlayLists(storagePlayLists);
    setPlayListId('');
    navigation.goBack();
  };

  const saveNewNamePlayList = async () => {
    const updatePlayLists = playLists.map((playList: PlayList, i: number) =>
      i === playListId ? {...playList, name: valueEditPlayList} : playList,
    );
    const localStorage = (await AsyncStorage.getItem('playLists')) ?? '';
    const storagePlayLists = JSON.parse(localStorage);
    storagePlayLists[playListId].name = valueEditPlayList;
    await AsyncStorage.setItem('playLists', JSON.stringify(storagePlayLists));
    setPlayLists(updatePlayLists);
  };

  const loadTracksInModal = async () => {
    try {
      const localStorage = (await AsyncStorage.getItem('playLists')) ?? '';

      if (!localStorage) {
        const selectedTracks = tracks.map(value => ({
          title: value.title,
          url: value.url,
          checked: false,
          artwork: value.artwork,
        }));

        setCheckedTracks(selectedTracks);
        return;
      }

      const currentPlayListTracks = JSON.parse(localStorage)[playListId].tracks;
      const selecteds = currentPlayListTracks.map((track: Track) => track.url);

      const selectedTracks = tracks.map((track: Track) => {
        return {
          ...track,
          checked: selecteds.includes(track.url),
        };
      });

      setCheckedTracks(selectedTracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: playLists[playListId]?.name,
      headerRight: () => (
        <IconButton name="menu" onPress={() => setVisibleOptions(true)} />
      ),
    });
  }, [navigation, playLists]);

  return (
    <Container>
      <Modal
        visible={visible}
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setVisible(false)}
        animationType="slide">
        <Title>Canciones</Title>
        <Input
          placeholder="Buscar"
          value={search}
          onChangeText={setSearch}
          styles={styles.input}
        />
        <FlatList
          style={styles.flatList}
          data={filter}
          renderItem={({item}) => (
            <ListItem onPress={() => onChangeCheckBox({url: item.url})}>
              <CheckBox
                style={styles.checkBox}
                value={item.checked}
                onValueChange={() => onChangeCheckBox({url: item.url})}
              />
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                {item.title}
              </Text>
            </ListItem>
          )}
        />
        <Button
          title="Agregar"
          onPress={() => {
            addTracksSelected();
            setVisible(false);
          }}
        />
      </Modal>

      <Modal
        visible={visibleModalEdit}
        onRequestClose={() => setVisibleModalEdit(false)}
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}>
        <Title>Editar</Title>

        <Input
          onChangeText={setValueEditPlayList}
          value={valueEditPlayList}
          placeholder="Nuevo nombre de la playlist"
        />
        <View style={{flexDirection: 'row-reverse'}}>
          <Button
            variant="text"
            title="Guardar"
            disabled={!valueEditPlayList.length}
            onPress={() => {
              saveNewNamePlayList();
              setValueEditPlayList('');
              setVisibleModalEdit(false);
            }}
          />
          <Button
            title="Cancelar"
            onPress={() => {
              setVisibleModalEdit(false);
            }}
          />
        </View>
      </Modal>

      <Modal
        visible={visibleOptions}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setVisibleOptions(false)}>
        <ListItem
          onPress={() => {
            setVisible(true);
            loadTracksInModal();
          }}
          icon="add">
          <Text style={styles.text}>Agregar canciones</Text>
        </ListItem>
        <ListItem
          onPress={() => {
            setVisibleModalEdit(true);
          }}
          icon="edit-note">
          <Text style={styles.text}>Editar nombre de playlist</Text>
        </ListItem>
        <ListItem onPress={deletePlayList} icon="delete">
          <Text style={styles.text}>Eliminar playlist</Text>
        </ListItem>
      </Modal>

      <TrackOptionsModal
        visible={visibleTracksOptions}
        track={selectedTrack}
        onRequestClose={() => setVisibleTracksOptions(false)}
      />

      <FlatList
        data={playLists[playListId]?.tracks}
        contentContainerStyle={{paddingBottom: 100}}
        renderItem={({item}) => (
          <PlayListItem
            track={item}
            onPress={async () => {
              const id = tracks.findIndex(track => track.url === item.url);
              playTrack({id});
              setPlayListId(playListId.toString());
            }}
            onPressIcon={() => {
              setSelectedTrack(item);
              setVisibleTracksOptions(true);
            }}
          />
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NunitoSans_600SemiBold',
    fontSize: 17,
  },
  checkBox: {
    marginHorizontal: 5,
  },
  input: {
    marginBottom: 10,
  },

  flatList: {height: '70%', paddingVertical: 3},
});

export default CustomPlayListScreen;
