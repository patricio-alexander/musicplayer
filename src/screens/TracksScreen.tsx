import {StyleSheet, FlatList, Text, View} from 'react-native';
import PlayListItem from '../components/PlayListItem';
import {playTrack} from '../../PlaybackService';
import {useQueueStore} from '../store/queueStore';
import Container from '../components/Container';
import {tracksFromDevice} from '../helpers/tracksFromDevice';
import {useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {useCheckIsFavorite} from '../hooks/useCheckIsFavorite';
import TrackOptionsModal from '../components/TrackOptionsModal';
import {Track} from '../types/SongTypes';

const TracksScreen = () => {
  const {tracks, setTracks, setPlayListId} = useQueueStore();
  const {checkIsFavorite} = useCheckIsFavorite();
  const [offset, setOffset] = useState(20);
  const [trackSelected, setTrackSelected] = useState<Track | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const loadData = async () => {
    const newTracks = await tracksFromDevice({offset});
    setOffset(offset + 20);
    setTracks([...tracks, ...newTracks]);

    TrackPlayer.add(newTracks);
  };
  return (
    <Container>
      <TrackOptionsModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        track={trackSelected}
      />
      <FlatList
        data={tracks}
        contentContainerStyle={styles.list}
        onEndReached={loadData}
        renderItem={({item}) => (
          <PlayListItem
            track={item}
            onPress={async () => {
              const id = tracks.findIndex(track => track.url === item.url);

              playTrack({id});
              setPlayListId('');
            }}
            onPressIcon={() => {
              setVisible(true);
              setTrackSelected(item);
              checkIsFavorite(item);
            }}
          />
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 100,
    paddingTop: 10,
  },
  text: {
    fontWeight: '500',
    fontSize: 17,
  },
});

export default TracksScreen;
