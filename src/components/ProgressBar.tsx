import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {formatSecondToMinute} from '../helpers/formatSecondToMinute';
import {View, Text} from 'react-native';
import React from 'react';
import {useThemeStore} from '../store/themeStore';

const ProgressBar: React.FC = () => {
  const {position, duration} = useProgress();
  const currentTimeSong = formatSecondToMinute(position);
  const durationTimeSong = formatSecondToMinute(duration);
  const {theme} = useThemeStore();

  return (
    <View style={{width: '100%'}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'baseline',
          marginHorizontal: 15,
        }}>
        <Text style={{color: theme.primary}}>{currentTimeSong}</Text>
        <Text style={{color: theme.primary}}>{durationTimeSong}</Text>
      </View>
      <Slider
        value={position / duration}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={theme.tertiary}
        maximumTrackTintColor={theme.secondary}
        thumbTintColor={theme.tertiary}
        onValueChange={value => TrackPlayer.seekTo(value * duration)}
      />
    </View>
  );
};

export default ProgressBar;
