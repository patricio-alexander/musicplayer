import {FlatList} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import PlayListItem from '../components/PlayListItem';
import {playTrack} from '../../PlaybackService';
import Container from '../components/Container';
import {FavoriteScreenProps} from '../types/ScreenTypes';

const FavoriteScreen = () => {
  const tracks = useQueueStore(state => state.tracks);
  const favoriteSongs = useQueueStore(state => state.favorites);

  const songsFavorites = tracks.filter(track =>
    favoriteSongs.includes(track?.id),
  );

  return (
    <Container>
      <FlatList
        style={{marginTop: 10}}
        data={songsFavorites}
        renderItem={({item, index}) => (
          <PlayListItem
            track={item}
            index={index}
            onPress={() => playTrack({id: item.id})}
          />
        )}
      />
    </Container>
  );
};

export default FavoriteScreen;
