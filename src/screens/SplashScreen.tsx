import Container from '../components/Container';
import Logo from '../assets/music-player-audio-svgrepo-com.svg';
import {StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <Container style={styles.container}>
      <Logo width={200} height={100} />
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
