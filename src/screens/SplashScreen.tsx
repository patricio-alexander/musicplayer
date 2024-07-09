import Container from '../components/Container';
import Logo from '../assets/music-player-audio-svgrepo-com.svg';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {useThemeStore} from '../store/themeStore';

const SplashScreen = () => {
  const {theme} = useThemeStore();
  return (
    <Container style={styles.container}>
      <Logo width={200} height={100} />
      <ActivityIndicator color={theme.tertiary} style={{marginTop: 10}} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
