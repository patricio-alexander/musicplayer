import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useThemeStore} from '../store/themeStore';
type Props = {
  onPress?: () => void;
  children: React.ReactNode;
  icon?: string;
};

const BoxPlayList: React.FC<Props> = ({onPress, icon, children}) => {
  const {theme} = useThemeStore();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        style.playListContainer,
        {
          borderColor: theme.primary,
        },
      ]}
      onPress={onPress}>
      {icon && (
        <Icon
          name={icon}
          style={{marginLeft: 10}}
          size={20}
          color={theme.primary}
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
    position: 'relative',
  },
});
export default BoxPlayList;
