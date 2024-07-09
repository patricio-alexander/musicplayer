import {StyleSheet, TouchableOpacity} from 'react-native';
import {ReactNode} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useThemeStore} from '../store/themeStore';
type Props = {
  children: ReactNode;
  icon?: string;
  onPress?: () => void;
};

const ListItem: React.FC<Props> = ({children, onPress, icon}) => {
  const {theme} = useThemeStore();
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}>
      {icon && (
        <Icon
          name={icon}
          size={24}
          style={{marginRight: 3}}
          color={theme.primary}
        />
      )}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 3,
    padding: 5,
    alignItems: 'center',
  },
});

export default ListItem;
