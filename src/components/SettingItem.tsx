import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDirectoryStore} from '../store/directoryStore';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';

type Props = {
  title: string;
  onPress?: () => void;
  iconName: string;
};

const SettingItem: React.FC<Props> = ({title, onPress, iconName}) => {
  return (
    <TouchableOpacity
      style={[style.boxDirectory]}
      activeOpacity={0.75}
      onPress={onPress}>
      <Icon name={iconName} size={25} color={COLORS.dark[300]} />
      <Text style={[style.text]}>{title}</Text>
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
    fontSize: 20,
    marginLeft: 5,
    color: COLORS.dark[300],
  },
});

export default SettingItem;
