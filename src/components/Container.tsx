import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';

type Props = {
  style?: ViewStyle;
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.dark[950],
  },
});

export default Container;
