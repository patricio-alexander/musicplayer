import {TouchableOpacity, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import {Track} from 'react-native-track-player';
import React from 'react';
import {Image} from 'react-native';
import IconButton from './IconButton';
import {useThemeStore} from '../store/themeStore';
import {useCheckIsFavorite} from '../hooks/useCheckIsFavorite';

type Props = {
  track: Track;
  onPress?: () => void;
  onPressIcon?: () => void;
};
const PlayListItem: React.FC<Props> = React.memo(
  ({track, onPress, onPressIcon}) => {
    const {checkIsFavorite} = useCheckIsFavorite();
    const t = useQueueStore(state => state.track);
    const {theme} = useThemeStore();

    const img =
      typeof track.artwork === 'string'
        ? track.artwork
        : Image.resolveAssetSource(
            track?.artwork ?? require('../assets/player.png'),
          ).uri;

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
              borderColor: theme.accent,
            },
          ]}
        />

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            stylePlayListItem.text,

            {
              color: theme.text,
            },
            track?.title === t.title && {
              color: theme.accent,
            },
          ]}>
          {track?.title}
        </Text>
        <IconButton
          name="dots-horizontal"
          onPress={() => {
            checkIsFavorite(track);
            onPressIcon?.();
          }}
        />
      </TouchableOpacity>
    );
  },
);

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
    fontSize: 18,
    fontFamily: 'NunitoSans_600SemiBold',
    width: '60%',
  },
});

export default PlayListItem;
