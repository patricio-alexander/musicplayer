import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import BottomTabs from './src/routes/BottomTabs';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, StatusBar, useColorScheme} from 'react-native';
import {useQueueStore} from './src/store/queueStore';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Track} from 'react-native-track-player';

import {RootStackParamList} from './src/types/ScreenTypes';
import PermissionScreen from './src/screens/PermissionScreen';
import SplashScreen from './src/screens/SplashScreen';
import {initizalizedPlayer} from './PlaybackService';
import {useAccess} from './src/store/accessStore';
import {tracksFromDevice} from './src/helpers/tracksFromDevice';
import {useThemeStore} from './src/store/themeStore';
import {ThemeName} from './src/constants/Colors';
import {useCheckIsFavorite} from './src/hooks/useCheckIsFavorite';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_700Bold,
  NunitoSans_600SemiBold,
} from '@expo-google-fonts/nunito-sans';

function App() {
  let [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
    NunitoSans_600SemiBold,
  });

  const isDarkMode = useColorScheme() === 'dark';

  const [isPlayerInitialized, setIsPlayerInitialized] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);

  const {access, setAccess} = useAccess();

  const {setTrack, tracks, setPlayLists, setIsRandom, setFavorites, setTracks} =
    useQueueStore();

  const {checkIsFavorite} = useCheckIsFavorite();

  const {toggleTheme} = useThemeStore();

  const checkRandomTrack = async () => {
    try {
      const random = await AsyncStorage.getItem('randomtracks');
      if (random) {
        setIsRandom(true);
      }
    } catch (error) {
      setIsRandom(false);
    }
  };

  const initializedPlayer = async () => {
    if (!isPlayerInitialized) {
      const initizalized = await initizalizedPlayer();
      setIsPlayerInitialized(initizalized);
    }
    let offset = 0;
    let allTracks: Track[] = [];
    while (true) {
      console.log(offset);
      const newTracks = await tracksFromDevice({offset: offset});
      if (newTracks.length) {
        console.log(tracks);
        allTracks = [...allTracks, ...newTracks];
        offset += 20;
      } else {
        break;
      }
    }
    const mapped = allTracks.map((track, i) => ({...track, id: i}));

    await TrackPlayer.add(mapped);
    setTracks(mapped);
  };

  const checkPlayLists = async () => {
    try {
      const localStorage = (await AsyncStorage.getItem('playLists')) ?? '';
      setPlayLists(JSON.parse(localStorage));
    } catch (error) {
      console.log(
        'Es posible que no exista ninguna playlist agregada por el usuario',
      );
    }
  };

  const loadTheme = async () => {
    const theme = (await AsyncStorage.getItem('theme')) ?? 'default';
    toggleTheme(theme as ThemeName);
  };

  const main = async (): Promise<void> => {
    const permission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    );

    if (!permission) {
      setIsLoading(false);
      setAccess(false);
      return;
    }

    try {
      const StorageFavorites = await AsyncStorage.getItem('favorites');

      if (StorageFavorites) {
        const ListFavorite = JSON.parse(StorageFavorites ?? '');
        setFavorites(ListFavorite);
      }

      await loadTheme();

      setAccess(true);
      await initializedPlayer();
      await checkPlayLists();
      await checkRandomTrack();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    try {
      setTrack({
        artwork: event?.track?.artwork ?? require('./src/assets/player.png'),
        title: event?.track?.title ?? '',
        url: event.track?.url ?? '',
      });

      await AsyncStorage.setItem('lastSong', event?.track?.url ?? '');
      checkIsFavorite(event?.track);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect((): void => {
    main();
  }, []);

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent />
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {isLoading || !fontsLoaded ? (
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : access ? (
              <Stack.Screen name="Tabs" component={BottomTabs} />
            ) : (
              <Stack.Screen name="Permission" component={PermissionScreen} />
            )}
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
}

export default App;
