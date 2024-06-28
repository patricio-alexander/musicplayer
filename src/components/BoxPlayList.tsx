import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/Colors';

type Props = {
  onPress?: () => void;
  children: React.ReactNode;
};

const BoxPlayList: React.FC<Props> = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={style.playListContainer}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  playListContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.chardonnay[300],
    position: 'relative',
  },
});
export default BoxPlayList;
