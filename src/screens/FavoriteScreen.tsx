import {FlatList} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import PlayListItem from '../components/PlayListItem';
import {playTrack} from '../../PlaybackService';
import Container from '../components/Container';
import {useState} from 'react';
import TrackOptionsModal from '../components/TrackOptionsModal';
import {Track} from 'react-native-track-player';

const FavoriteScreen = () => {
  const {favorites, tracks} = useQueueStore();
  const [trackSelected, setTrackSelected] = useState<Track | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Container>
      <TrackOptionsModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        track={trackSelected}
      />
      <FlatList
        style={{marginTop: 10}}
        data={favorites}
        renderItem={({item}) => (
          <PlayListItem
            track={item}
            onPress={() => {
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

export default FavoriteScreen;
