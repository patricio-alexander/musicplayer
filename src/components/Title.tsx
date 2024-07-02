import {ReactNode} from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';
import {COLORS} from '../constants/Colors';

type Props = {
  children: ReactNode;
  size?: number;
  style?: ViewStyle;
  [key: string]: any;
};
const Title: React.FC<Props> = ({children, size, style, ...textProps}) => {
  const textStyle = [styles.title, {fontSize: size ? size : 20}, style];

  return (
    <Text style={textStyle} {...textProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    color: COLORS.dark[200],
    padding: 2,
  },
});

export default Title;
