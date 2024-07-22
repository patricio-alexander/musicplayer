import {Text, Pressable, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {useThemeStore} from '../store/themeStore';
type Variant = 'contained' | 'outlined' | 'text';

type Props = {
  title: string;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  style,
  variant,
  disabled,
}) => {
  const {theme} = useThemeStore();

  const variants = (pressed: boolean, variant: Variant) => {
    const v = {
      contained: {
        backgroundColor: !pressed ? theme.accent : theme.secondary,
      },
      outlined: {
        borderWidth: 1,
        borderColor: !pressed ? theme.accent : theme.secondary,
      },
      text: {
        backgroundColor: 'transparent',
      },
    };
    return v[variant];
  };

  const variantText = (pressed: boolean, variant: Variant) => {
    const v = {
      contained: {
        color: !pressed ? theme.secondary : theme.accent,
      },

      outlined: {
        color: !pressed ? theme.text : theme.secondary,
      },
      text: {
        color: theme.accent,
      },
    };

    return v[variant];
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        style,

        disabled
          ? variant !== 'text'
            ? {backgroundColor: theme.secondary}
            : {backgroundColor: 'transparent'}
          : variants(pressed, variant ?? 'contained'),
      ]}>
      {({pressed}) => (
        <Text
          style={[
            styles.text,
            disabled
              ? {color: theme.tertiary}
              : variantText(pressed, variant ?? 'contained'),
          ]}>
          {title.toUpperCase()}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NunitoSans_700Bold',
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
