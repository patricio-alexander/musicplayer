import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {useThemeStore} from '../store/themeStore';

type Props = {
  title: string;
  onPress?: () => void;
  iconName: string;
};

const SettingItem: React.FC<Props> = ({title, onPress, iconName}) => {
  const {theme} = useThemeStore();
  return (
    <TouchableOpacity
      style={[style.boxDirectory]}
      activeOpacity={0.75}
      onPress={onPress}>
      <Icon name={iconName} size={25} color={theme.text} />
      <Text
        style={[
          style.text,
          {
            color: theme.text,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  boxDirectory: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'NunitoSans_600SemiBold',
    marginLeft: 5,
  },
});

export default SettingItem;
