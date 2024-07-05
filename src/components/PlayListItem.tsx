import {TouchableOpacity, Text, View, ImageSourcePropType} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useQueueStore} from '../store/queueStore';
import {Track} from '../types/SongTypes';
import React from 'react';
import {Image} from 'react-native';

type Props = {
  track: Track;
  index: number;
  onPress?: () => void;
};
const PlayListItem: React.FC<Props> = ({track, index, onPress}) => {
  const activeSongId = useQueueStore(state => state.activeQueueId);
  const img =
    typeof track.artwork === 'object'
      ? track.artwork.uri
      : Image.resolveAssetSource(track.artwork).uri;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[stylePlayListItem.container]}
      onPress={onPress}
      key={index}>
      <Image
        source={{uri: img}}
        style={{
          width: 50,
          resizeMode: 'cover',
          height: '100%',
          marginRight: 6,
          borderRadius: 5,
        }}
      />

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          stylePlayListItem.text,
          track?.id === activeSongId && {
            color: COLORS.rising,
          },
        ]}>
        {track?.title}
      </Text>
      <Icon name="more-vert" size={30} color={COLORS.chardonnay[50]} />
    </TouchableOpacity>
  );
};

const stylePlayListItem = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  text: {
    color: COLORS.chardonnay[50],
    fontSize: 16,
    width: '60%',
  },
});

export default PlayListItem;
