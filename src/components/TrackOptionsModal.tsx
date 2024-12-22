import Modal from './Modal';
import Title from './Title';
import ListItem from './ListItem';
import {View, ToastAndroid, Text, StyleSheet, FlatList} from 'react-native';
import IconButton from './IconButton';
import {Track} from 'react-native-track-player';
import {useThemeStore} from '../store/themeStore';
import {useQueueStore} from '../store/queueStore';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  visible: boolean;
  track: Track | null;
  onRequestClose: () => void;
};

type SelectedPlayList = {
  name: string;
  checked: boolean;
};

const TrackOptionsModal: React.FC<Props> = ({
  visible,
  track,
  onRequestClose,
}) => {
  const {theme} = useThemeStore();
  const {isFavorite, setPlayLists, markFavorite, removeFavorites, playLists} =
    useQueueStore();
  const [visibleModalPlayLists, setVisibleMdalPlayLists] = useState(false);
  const [selectedPlayLists, setSelectedPlayLists] = useState<
    Array<SelectedPlayList>
  >([]);

  const loadPlayLists = () => {
    const mapped = playLists.map(playList => ({
      name: playList.name,
      checked: false,
    }));

    setSelectedPlayLists(mapped);
  };

  const addTrackInPlayList = async ({playListName}: {playListName: string}) => {
    if (!track) return;
    const index = playLists.findIndex(
      playlist => playlist.name === playListName,
    );

    const exist = playLists[index].tracks.some(tr => tr.url === track.url);
    if (exist) {
      ToastAndroid.show(
        'Ya se encuentra en la lista de reproducción.',
        ToastAndroid.LONG,
      );

      // aqui un alert
      return;
    }

    const lists = [...playLists];
    lists[index].tracks.push(track);
    setPlayLists(lists);

    ToastAndroid.show(`Se añadido a "${playListName}"`, ToastAndroid.LONG);
    await AsyncStorage.setItem('playLists', JSON.stringify(lists));
  };

  return (
    <>
      <Modal
        visible={visibleModalPlayLists}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setVisibleMdalPlayLists(false)}>
        <Title>{track?.title}</Title>
        {selectedPlayLists.length ? (
          <FlatList
            data={selectedPlayLists}
            renderItem={({item}) => (
              <ListItem
                icon="queue-music"
                onPress={() => addTrackInPlayList({playListName: item.name})}>
                <Text style={[styles.text, {color: theme.text}]}>
                  {item.name}
                </Text>
              </ListItem>
            )}
          />
        ) : (
          <ListItem icon="add">
            <Text style={[styles.text, {color: theme.text}]}>
              Nueva playlist
            </Text>
          </ListItem>
        )}
      </Modal>

      <Modal
        visible={visible}
        animationType="fade"
        onRequestClose={onRequestClose}
        transparent={true}
        statusBarTranslucent={true}>
        <Title numberOfLines={1} ellipsizeMode="tail">
          {track?.title}
        </Title>
        <ListItem
          icon="playlist-add"
          onPress={() => {
            setVisibleMdalPlayLists(true);
            onRequestClose();
            loadPlayLists();
          }}>
          <Text style={[styles.text, {color: theme.text}]}>Agregar a</Text>
        </ListItem>
        <View style={{position: 'absolute', bottom: 0, right: 0}}>
          <IconButton
            name={isFavorite ? 'star' : 'star-outline'}
            color={isFavorite ? theme.accent : theme.text}
            onPress={() => {
              if (!isFavorite) {
                markFavorite(track);
                return;
              }
              removeFavorites(track?.url);
            }}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 17,
  },
});

export default TrackOptionsModal;
