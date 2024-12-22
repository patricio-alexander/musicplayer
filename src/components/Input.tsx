import React from 'react';
import {StyleSheet, TextInput, ViewStyle} from 'react-native';
import {THEME} from '../constants/Colors';
import {useThemeStore} from '../store/themeStore';

type Props = {
  placeholder?: string;
  onChangeText: (value: string) => void;
  value?: string;
  styles?: ViewStyle;
};

const Input: React.FC<Props> = ({placeholder, onChangeText, value, styles}) => {
  const {theme} = useThemeStore();
  return (
    <TextInput
      style={[
        style.input,
        styles,
        {
          borderColor: theme.text,
          color: theme.text,
          fontFamily: 'NunitoSans_400Regular',
        },
      ]}
      placeholder={placeholder}
      onChangeText={valueText => onChangeText(valueText)}
      value={value}
      placeholderTextColor={theme.text}
    />
  );
};

const style = StyleSheet.create({
  input: {
    height: 50,
    padding: 10,
    fontSize: 17,
    borderBottomWidth: 1,
  },
});

export default Input;
