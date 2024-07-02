import {FlatList, StyleSheet} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import PlayListItem from '../components/PlayListItem';
import {playTrack} from '../../PlaybackService';
import Container from '../components/Container';
import Title from '../components/Title';
import IconButton from '../components/IconButton';
import {FavoriteScreenProps} from '../types/ScreenTypes';
import {useEffect} from 'react';

const FavoriteScreen = ({navigation}: FavoriteScreenProps) => {
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
