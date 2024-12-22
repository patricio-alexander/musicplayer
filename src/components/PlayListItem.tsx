import {TouchableOpacity, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {useQueueStore} from '../store/queueStore';
import {Track} from 'react-native-track-player';
import React from 'react';
import {Image} from 'react-native';
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
        onPress={onPress}
        onLongPress={() => {
          checkIsFavorite(track);
          onPressIcon?.();
        }}>
        <Image
          source={{uri: img}}
          style={[
            {
              width: '20%',
              resizeMode: 'cover',
              height: '100%',
              borderRadius: 10,
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
    gap: 10,
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
