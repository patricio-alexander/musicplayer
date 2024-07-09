import {ReactNode} from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';
import {useThemeStore} from '../store/themeStore';

type Props = {
  children: ReactNode;
  size?: number;
  style?: ViewStyle;
  [key: string]: any;
};
const Title: React.FC<Props> = ({children, size, style, ...textProps}) => {
  const {theme} = useThemeStore();
  const textStyle = [
    styles.title,
    {
      color: theme.primary,
    },
    {fontSize: size ? size : 20},
    style,
  ];

  return (
    <Text style={textStyle} {...textProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    padding: 2,
  },
});

export default Title;
