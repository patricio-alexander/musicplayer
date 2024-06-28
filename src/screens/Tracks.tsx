import {StyleSheet, View, PermissionsAndroid, FlatList} from 'react-native';
import {COLORS} from '../constants/Colors';
import PlayListItem from '../components/PlayListItem';
import {playTrack} from '../../PlaybackService';
import {useQueueStore} from '../store/queueStore';
import {TextInput} from 'react-native';
import {useState} from 'react';
import Input from '../components/Input';

export default function Tracks() {
  const tracks = useQueueStore(state => state.tracks);
  const [search, setSearch] = useState('');
  const filterTrack = tracks.filter(track =>
    track.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={style.container}>
      <Input
        placeholder="Buscar canción"
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={filterTrack}
        contentContainerStyle={style.list}
        renderItem={({item, index}) => (
          <PlayListItem
            track={item}
            index={index}
            onPress={async () => {
              playTrack({id: item.id});
            }}
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  list: {
    paddingBottom: 100,
    paddingTop: 10,
  },
  container: {
    backgroundColor: COLORS.dark[950],
    height: '100%',
  },

  text: {
    color: COLORS.dark[100],
  },
});
