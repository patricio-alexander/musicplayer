import {FlatList, StyleSheet, Text} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import PlayListItem from '../components/PlayListItem';
import {playTrack} from '../helpers/musicHelpers';
import Container from '../components/Container';
import {useEffect, useState} from 'react';
import TrackOptionsModal from '../components/TrackOptionsModal';
import {Track} from 'react-native-track-player';
import {FavoriteScreenProps} from '../types/ScreenTypes';
import IconButton from '../components/IconButton';
import Modal from '../components/Modal';
import Title from '../components/Title';
import ListItem from '../components/ListItem';
import CheckBox from '@react-native-community/checkbox';
import {SelectedTrack} from './CustomPlayListScreen';
import Button from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteScreen = ({navigation}: FavoriteScreenProps) => {
  const {favorites, tracks, setFavorites, setPlayingFavorites, setPlayListId} =
    useQueueStore();
  const [trackSelected, setTrackSelected] = useState<Track | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const [checkedTracks, setCheckedTracks] = useState<Array<SelectedTrack>>([]);
  const [search, setSearch] = useState('');

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

  const loadTracksInModal = async () => {
    const localStorage = (await AsyncStorage.getItem('favorites')) ?? '';
    if (!localStorage) {
      const mappedNoSelectedTracks = tracks.map(track => {
        return {...track, checked: false};
      });

      setCheckedTracks(mappedNoSelectedTracks);
      return;
    }
    const storageFavorite = JSON.parse(localStorage).map(
      (track: Track) => track.url,
    );
    const selectedTracks = tracks.map(track => ({
      ...track,
      checked: storageFavorite.includes(track.url),
    }));

    setCheckedTracks(selectedTracks);
  };

  const addToFavorite = async () => {
    const saveLikeFavorites = checkedTracks.filter(track => track.checked);
    setFavorites(saveLikeFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(saveLikeFavorites));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          name="menu"
          onPress={() => {
            loadTracksInModal();
            setVisibleOptions(true);
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <Container>
      <Modal
        visible={visibleOptions}
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setVisibleOptions(false)}
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
            setVisibleOptions(false);
            addToFavorite();
          }}
        />
      </Modal>

      <TrackOptionsModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        track={trackSelected}
      />
      <FlatList
        contentContainerStyle={{paddingBottom: 100}}
        data={favorites}
        renderItem={({item}) => (
          <PlayListItem
            track={item}
            onPress={() => {
              setPlayingFavorites(true);
              setPlayListId('');
              const id = tracks.findIndex(track => track.url === item.url);
              playTrack({id});
            }}
            onPressIcon={() => {
              setTrackSelected(item);
              setVisible(true);
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

export default FavoriteScreen;
