import {
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import React, {useRef} from 'react';
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
  const scaleValue = useRef(new Animated.Value(1)).current;

  const variants = (pressed: boolean, variant: Variant) => {
    const v = {
      contained: {
        backgroundColor: !pressed ? theme.primaryContainer : theme.secondary,
      },
      outlined: {
        borderWidth: 1,
        borderColor: !pressed ? theme.primaryContainer : theme.secondary,
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
        color: theme.background,
      },

      outlined: {
        color: !pressed ? theme.primary : theme.secondary,
      },
      text: {
        color: theme.primary,
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
            ? {backgroundColor: theme.secondaryContainer}
            : {backgroundColor: 'transparent'}
          : variants(pressed, variant ?? 'contained'),
      ]}>
      {({pressed}) => (
        <Text
          style={[
            styles.text,
            disabled
              ? {color: theme.secondaryContainer}
              : variantText(pressed, variant ?? 'contained'),
          ]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '500',
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
