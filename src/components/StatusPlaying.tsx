import {StyleSheet} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import {useThemeStore} from '../store/themeStore';
import {View, Text} from 'react-native';

const StatusPlaying: React.FC = () => {
  const {playingFavorites, playListId, playLists} = useQueueStore();
  const currentPlayListPlaying = () => {
    if (playingFavorites) {
      return {title: 'Favoritos'};
    }

    if (!playListId) {
      return {title: 'Canciones del dispositivo'};
    } else {
      return {
        title: playLists[Number(playListId)].name,
      };
    }
  };

  const {title} = currentPlayListPlaying();
  const {theme} = useThemeStore();
  return (
    <View style={{alignItems: 'center', flexDirection: 'row', gap: 5}}>
      <Text style={[styles.namePlayList, {color: theme.accent}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  namePlayList: {
    fontSize: 17,
    fontFamily: 'NunitoSans_400Regular',
  },
});

export default StatusPlaying;
