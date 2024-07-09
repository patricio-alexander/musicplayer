import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {useThemeStore} from '../store/themeStore';

type Props = {
  style?: ViewStyle;
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({children, style}) => {
  const theme = useThemeStore();
  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: theme.theme.background,
        },
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default Container;
