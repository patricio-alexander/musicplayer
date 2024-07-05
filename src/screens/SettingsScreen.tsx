import {StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/Colors';
import SettingItem from '../components/SettingItem';
import {useQueueStore} from '../store/queueStore';

export default function Settings() {
  return (
    <View style={style.container}>
      <SettingItem iconName="folder" title={'hola'} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.dark[950],
    padding: 10,
  },
});
