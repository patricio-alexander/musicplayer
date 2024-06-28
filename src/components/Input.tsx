import React from 'react';
import {StyleSheet, TextInput, ViewStyle} from 'react-native';
import {COLORS} from '../constants/Colors';

type Props = {
  placeholder?: string;
  onChangeText: (value: string) => void;
  value?: string;
  styles?: ViewStyle;
};

const Input: React.FC<Props> = ({placeholder, onChangeText, value, styles}) => {
  return (
    <TextInput
      style={[style.input, styles]}
      placeholder={placeholder}
      onChangeText={valueText => onChangeText(valueText)}
      value={value}
    />
  );
};

const style = StyleSheet.create({
  input: {
    height: 50,
    padding: 10,
    fontSize: 17,
    borderColor: COLORS.chardonnay[300],
    borderBottomWidth: 1,
  },
});

export default Input;
