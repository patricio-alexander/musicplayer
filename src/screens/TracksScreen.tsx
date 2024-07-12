import {StyleSheet, VirtualizedList} from 'react-native';
import PlayListItem from '../components/PlayListItem';
import {playTrack} from '../../PlaybackService';
import {useQueueStore} from '../store/queueStore';
import Container from '../components/Container';
import {useState} from 'react';
import TrackOptionsModal from '../components/TrackOptionsModal';
import {Track} from 'react-native-track-player';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TracksScreen = () => {
  const {tracks, setPlayListId} = useQueueStore();
  const [trackSelected, setTrackSelected] = useState<Track | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const renderItem = ({item}: {item: Track}) => {
    return (
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
        }}
      />
    );
  };

  return (
    <Container style={{paddingTop: insets.top}}>
      <TrackOptionsModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        track={trackSelected}
      />
      <VirtualizedList
        data={tracks}
        getItemCount={data => data.length}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={[styles.list]}
        // onEndReached={loadData}
        getItem={(data, i) => data[i]}
        renderItem={renderItem}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 100,
  },
  text: {
    fontWeight: '500',
    fontSize: 17,
  },
});

export default TracksScreen;
