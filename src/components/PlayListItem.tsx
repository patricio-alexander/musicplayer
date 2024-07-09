import {TouchableOpacity, Text, View, ImageSourcePropType} from 'react-native';
import {StyleSheet} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import {Track} from '../types/SongTypes';
import React from 'react';
import {Image} from 'react-native';
import IconButton from './IconButton';
import {useThemeStore} from '../store/themeStore';

type Props = {
  track: Track;
  onPress?: () => void;
  onPressIcon?: () => void;
};
const PlayListItem: React.FC<Props> = ({track, onPress, onPressIcon}) => {
  const t = useQueueStore(state => state.track);
  const {theme} = useThemeStore();
  const img =
    typeof track.artwork === 'string'
      ? track.artwork
      : Image.resolveAssetSource(track.artwork).uri;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[stylePlayListItem.container]}
      onPress={onPress}>
      <Image
        source={{uri: img}}
        style={[
          {
            width: 50,
            resizeMode: 'cover',
            height: '100%',
            marginRight: 6,
            borderRadius: 100,
          },
          track?.title === t.title && {
            borderWidth: 1,
            borderColor: theme.tertiary,
          },
        ]}
      />

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          stylePlayListItem.text,

          {
            color: theme.primary,
          },
          track?.title === t.title && {
            color: theme.tertiary,
          },
        ]}>
        {track?.title}
      </Text>
      <IconButton name="dots-horizontal" onPress={onPressIcon} />
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
    fontSize: 16,
    width: '60%',
  },
});

export default PlayListItem;
