import {TouchableOpacity, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useQueueStore} from '../store/queueStore';
import {Track} from '../types/SongTypes';
import React from 'react';

type Props = {
  track: Track;
  index: number;
  onPress?: () => void;
};
const PlayListItem: React.FC<Props> = ({track, index, onPress}) => {
  const activeSongId = useQueueStore(state => state.activeQueueId);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        stylePlayListItem.container,
        track?.id === activeSongId && {
          borderLeftColor: COLORS.rising,
          borderLeftWidth: 2,
        },
      ]}
      onPress={onPress}
      key={index}>
      <Text
        style={[
          stylePlayListItem.text,
          track?.id === activeSongId && {
            color: COLORS.rising,
            fontWeight: '500',
          },
        ]}>
        {track?.title}
      </Text>
      <Icon name="more-vert" size={30} color={COLORS.dark[300]} />
    </TouchableOpacity>
  );
};

const stylePlayListItem = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: COLORS.dark[300],
    fontSize: 17,
    width: 300,
  },
});

export default PlayListItem;
