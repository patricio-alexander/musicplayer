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
import {getActiveTrack} from 'react-native-track-player/lib/src/trackPlayer';
import {Track} from './src/types/SongTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from './src/types/ScreenTypes';
import PermissionScreen from './src/screens/PermissionScreen';
import SplashScreen from './src/screens/SplashScreen';
import {initizalizedPlayer} from './PlaybackService';
import {useAccess} from './src/store/accessStore';
import {tracksFromDevice} from './src/helpers/tracksFromDevice';
import {useThemeStore} from './src/store/themeStore';
import {ThemeName} from './src/constants/Colors';
import {useCheckIsFavorite} from './src/hooks/useCheckIsFavorite';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [isPlayerInitialized, setIsPlayerInitialized] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);

  const {access, setAccess} = useAccess();
  const {theme} = useThemeStore();

  const {setTrack, setPlayLists, setIsRandom, setFavorites, setTracks} =
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

  const addSongsInTrackPlayer = async (songs: Array<Track>) => {
    const lastSong = await AsyncStorage.getItem('lastSong');
    const index = songs.findIndex((track: Track) => track.url === lastSong);

    const lastTrack = await TrackPlayer.getActiveTrack();
    //await TrackPlayer.skip(index);
    setTrack({
      title: lastTrack?.title ?? '',
      url: lastTrack?.url ?? '',
      artwork: lastTrack?.artwork ?? require('./src/assets/player.png'),
    });

    await TrackPlayer.add(songs as any);
  };

  const initizalizedTracks = async () => {
    if (!isPlayerInitialized) {
      const initizalized = await initizalizedPlayer();
      setIsPlayerInitialized(initizalized);
    }
    const tracks = await tracksFromDevice({offset: 0});
    setTracks(tracks);
    addSongsInTrackPlayer(tracks);
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
      await initizalizedTracks();
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
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : access ? (
          <Stack.Screen name="Tabs" component={BottomTabs} />
        ) : (
          <Stack.Screen name="Permission" component={PermissionScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
