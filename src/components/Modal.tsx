import React, {ReactNode} from 'react';
import {Modal as ModalNative, StyleSheet, View} from 'react-native';
import {useThemeStore} from '../store/themeStore';

type Props = {
  animationType?: 'fade' | 'slide' | 'none';
  transparent?: boolean;
  visible: boolean;
  statusBarTranslucent?: boolean;
  onRequestClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<Props> = ({
  animationType,
  visible,
  transparent,
  statusBarTranslucent,
  onRequestClose,
  children,
}) => {
  const {theme} = useThemeStore();

  return (
    <ModalNative
      animationType={animationType}
      visible={visible}
      transparent={transparent}
      statusBarTranslucent={statusBarTranslucent}
      onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <View
          style={[
            styles.modalBody,
            {
              backgroundColor: theme.background,
              borderColor: theme.primary,
            },
          ]}>
          {children}
        </View>
      </View>
    </ModalNative>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(0, 0, 0, 0.4)`,
  },
  modalBody: {
    width: '85%',
    height: 'auto',
    borderWidth: 1,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Modal;
