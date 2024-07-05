import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/Colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type Props = {
  onPress?: () => void;
  children: React.ReactNode;
  icon?: string;
};

const BoxPlayList: React.FC<Props> = ({onPress, icon, children}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={style.playListContainer}
      onPress={onPress}>
      {icon && (
        <Icon
          name={icon}
          style={{marginLeft: 10}}
          size={20}
          color={COLORS.chardonnay[300]}
        />
      )}

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
