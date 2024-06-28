import {StyleSheet, TouchableOpacity} from 'react-native';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  onPress?: () => void;
};

const FlatListElement: React.FC<Props> = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 3,
    paddingVertical: 5,
    alignItems: 'center',
  },
});

export default FlatListElement;
