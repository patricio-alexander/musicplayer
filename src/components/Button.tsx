import { Text, Pressable, Animated, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../constants/Colors';
import React, { useRef } from 'react';
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
  const scaleValue = useRef(new Animated.Value(1)).current;

  const variants = {
    contained: {
      backgroundColor: COLORS.chardonnay[300],
    },
    outlined: {
      borderWidth: 1,
      borderColor: COLORS.chardonnay[300],
    },
    text: {
      backgroundColor: 'transparent',
    },
  };

  const variantText = {
    contained: {
      color: COLORS.chardonnay[950],
    },

    outlined: {
      color: COLORS.chardonnay[300],
    },
    text: {
      color: COLORS.chardonnay[300],
    },
  };

  const animatedOnPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const animatedOnPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={animatedOnPressIn}
        onPressOut={animatedOnPressOut}
        disabled={disabled}
        style={() => [
          {
            paddingHorizontal: 5,
            paddingVertical: 10,
            borderRadius: 5,
            margin: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
          disabled
            ? variant !== 'text'
              ? { backgroundColor: COLORS.dark[800] }
              : { backgroundColor: 'transparent' }
            : variants[variant ?? 'contained'],
        ]}>
        <Text
          style={[
            styles.text,
            disabled
              ? { color: COLORS.dark[400] }
              : variantText[variant ?? 'contained'],
          ]}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default Button;
