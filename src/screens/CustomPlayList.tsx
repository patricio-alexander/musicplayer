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
import {PlayList, Track} from '../types/SongTypes';
import {playTrack} from '../../PlaybackService';
import FlatListElement from '../components/FlatListElement';
import IconButton from '../components/IconButton';
import {COLORS} from '../constants/Colors';

type SelectedTrack = Track & {
  checked: boolean;
};
export default function CustomPlayList({
  navigation,
  route,
}: CustomPlayListProps) {
  const {playListId} = route.params;
  const [visible, setVisible] = useState(false);
  const tracks = useQueueStore(state => state.tracks);
  const [search, setSearch] = useState('');
  const [checkedTracks, setCheckedTracks] = useState<Array<SelectedTrack>>([]);
  const playLists = useQueueStore(state => state.playLists);
  const setPlayListId = useQueueStore(state => state.setPlayListId);
  const [visibleModalEdit, setVisibleModalEdit] = useState<boolean>(false);
  const [valueEditPlayList, setValueEditPlayList] = useState<string>('');

  const setPlayLists = useQueueStore(state => state.setPlayLists);

  const onChangeCheckBox = ({id}: {id: number}) => {
    const newSelectedTracks = checkedTracks.map(track => {
      if (track.id === id) {
        return {...track, checked: !track.checked};
      }
      return track;
    });
    setCheckedTracks(newSelectedTracks);
  };

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

  const saveNewNamePlayList = async () => {
    const updatePlayLists = playLists.map((playList: PlayList, i: number) =>
      i === playListId ? {...playList, name: valueEditPlayList} : playList,
    );
    const localStorage = (await AsyncStorage.getItem('playLists')) ?? '';
    const arrayPlayLists = JSON.parse(localStorage);
    arrayPlayLists[playListId].name = valueEditPlayList;
    await AsyncStorage.setItem('playLists', JSON.stringify(arrayPlayLists));
    setPlayLists(updatePlayLists);
  };

  const loadTracksInModal = async () => {
    try {
      const localStorage = (await AsyncStorage.getItem('playLists')) ?? '';

      if (!localStorage) {
        const selectedTracks = tracks.map(value => ({
          title: value.title,
          id: value.id,
          url: value.url,
          checked: false,
        }));

        setCheckedTracks(selectedTracks);
        return;
      }

      const currentPlayListTracks = JSON.parse(localStorage)[playListId].tracks;
      const selectedTracks = tracks.map((track: Track, index: number) => ({
        ...track,
        checked: currentPlayListTracks[index]?.checked ?? false,
      }));
      setCheckedTracks(selectedTracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPlayListId(playListId.toString());
  }, []);

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
          data={checkedTracks}
          renderItem={({item, index}) => (
            <FlatListElement onPress={() => onChangeCheckBox({id: index})}>
              <CheckBox
                style={styles.checkBox}
                value={item.checked}
                onValueChange={() => onChangeCheckBox({id: index})}
              />
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                {item.title}
              </Text>
            </FlatListElement>
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

      <View style={styles.box}>
        <IconButton
          name="arrow-back"
          size={22}
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        />
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <IconButton name="edit" onPress={() => setVisibleModalEdit(true)} />
          <Title style={{marginRight: 10}}>
            {playLists?.[playListId]?.name}
          </Title>
        </View>
      </View>
      <Button
        title="Agregar canciones"
        variant="text"
        onPress={() => {
          setVisible(true);
          loadTracksInModal();
        }}
      />
      <View style={{height: '90%'}}>
        <FlatList
          data={playLists[playListId].tracks}
          renderItem={({item, index}) => (
            <PlayListItem
              track={item}
              index={index}
              onPress={() => playTrack({id: item.id})}
            />
          )}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 17,
    overflow: 'hidden',
  },
  checkBox: {
    marginHorizontal: 5,
  },
  input: {
    marginBottom: 10,
  },
  iconButton: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: COLORS.dark[900],
    padding: 5,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatList: {height: '70%', paddingVertical: 3},
});
