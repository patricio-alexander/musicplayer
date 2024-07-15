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
      color: theme.text,
    },
    {fontSize: size ? size : 22},
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
    padding: 2,
    fontFamily: 'NunitoSans_700Bold',
  },
});

export default Title;
