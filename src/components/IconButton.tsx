import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {THEME} from '../constants/Colors';
import {useThemeStore} from '../store/themeStore';

type Props = {
  name: string;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
};

const IconButton: React.FC<Props> = ({
  name,
  color,
  size = 24,
  onPress,
  style,
}) => {
  const {theme} = useThemeStore();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.conntainer,
        {borderRadius: size * 2, width: size * 2, height: size * 2},
        style,
      ]}>
      <Icon name={name} color={color ?? theme.primary} size={size} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conntainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;
