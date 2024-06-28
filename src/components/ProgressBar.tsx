import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {formatSecondToMinute} from '../helpers/formatSecondToMinute';
import {COLORS} from '../constants/Colors';
import {View, Text} from 'react-native';
import React from 'react';

const ProgressBar: React.FC = () => {
  const {position, duration, buffered} = useProgress();
  const currentTimeSong = formatSecondToMinute(position);
  const durationTimeSong = formatSecondToMinute(duration);

  return (
    <View style={{width: '100%'}}>
      <Slider
        value={position / duration}
        style={{marginTop: 30}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={COLORS.rising}
        maximumTrackTintColor={COLORS.dark[500]}
        thumbTintColor={COLORS.rising}
        onValueChange={value => TrackPlayer.seekTo(value * duration)}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}>
        <Text style={{color: COLORS.dark[200]}}>{currentTimeSong}</Text>
        <Text style={{color: COLORS.dark[200]}}>{durationTimeSong}</Text>
      </View>
    </View>
  );
};

export default ProgressBar;
