import {StyleSheet, View, FlatList, StatusBar} from 'react-native';
import {COLORS} from '../constants/Colors';
import PlayListItem from '../components/PlayListItem';
import {playTrack} from '../../PlaybackService';
import {useQueueStore} from '../store/queueStore';

const TracksScreen = () => {
  const tracks = useQueueStore(state => state.tracks);
  const setPlayListId = useQueueStore(state => state.setPlayListId);

  return (
    <View style={style.container}>
      <FlatList
        data={tracks}
        contentContainerStyle={style.list}
        renderItem={({item, index}) => (
          <PlayListItem
            track={item}
            index={index}
            onPress={async () => {
              playTrack({id: item.id});
              setPlayListId('');
            }}
          />
        )}
      />
    </View>
  );
};

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

export default TracksScreen;
