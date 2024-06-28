import { ReactNode } from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS } from '../constants/Colors';

type Props = {
  children: ReactNode;
  size?: number;
  style?: ViewStyle;
};
const Title: React.FC<Props> = ({ children, size, style }) => {
  return (
    <Text style={[styles.title, { fontSize: size ? size : 20 }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    color: COLORS.dark[300],
    padding: 2,
  },
});

export default Title;
