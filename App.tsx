import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useRoute,
} from '@react-navigation/native';
import BottomTabs from './src/routes/BottomTabs';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from './src/constants/Colors';
import {useQueueStore} from './src/store/queueStore';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getActiveTrack} from 'react-native-track-player/lib/src/trackPlayer';
import {Track} from './src/types/SongTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';
import {RootStackParamList, WelcomeScreenProps} from './src/types/ScreenTypes';
import PermissionScreen from './src/screens/PermissionScreen';
import SplashScreen from './src/screens/SplashScreen';
import {initizalizedPlayer} from './PlaybackService';
import {useAccess} from './src/store/accessStore';
import {tracksFromDevice} from './src/helpers/tracksFromDevice';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isPlayerInitialized, setIsPlayerInitialized] =
    useState<boolean>(false);
  const setActiveSongId = useQueueStore(state => state.setActiveQueueId);

  const setTracks = useQueueStore(state => state.setTracks);
  const setFavorites = useQueueStore(state => state.setFavorites);
  const favorites = useQueueStore(state => state.favorites);
  const setIsFavorite = useQueueStore(state => state.setIsFavorite);
  const setIsRandom = useQueueStore(state => state.setIsRandom);
  const setPlayLists = useQueueStore(state => state.setPlayLists);
  const setTrack = useQueueStore(state => state.setTrack);
  const access = useAccess(state => state.access);
  const setAccess = useAccess(state => state.setAccess);
  const [isLoading, setIsLoading] = useState(true);

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

  const checkIsFavorite = async () => {
    const activeTrack = await getActiveTrack();
    setIsFavorite(favorites.includes(activeTrack?.id));
  };

  const addSongsInTrackPlayer = async (songs: Array<Track>) => {
    const lastSongId = await AsyncStorage.getItem('lastSongId');
    await TrackPlayer.skip(Number(lastSongId));

    const lastTrack = await TrackPlayer.getActiveTrack();
    setTrack({
      id: lastTrack?.id,
      title: lastTrack?.title ?? '',
      url: lastTrack?.url ?? '',
      artwork: lastTrack?.artwork ?? require('./src/assets/player.png'),
    });

    await TrackPlayer.add(songs);
  };

  const initizalizedTracks = async () => {
    if (!isPlayerInitialized) {
      const initizalized = await initizalizedPlayer();
      setIsPlayerInitialized(initizalized);
    }
    const tracks = await tracksFromDevice();
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
        id: event?.track?.id,
        artwork: event?.track?.artwork,
        title: event?.track?.title ?? '',
        url: event.track?.url ?? '',
      });

      setActiveSongId(event?.track?.id);
      await AsyncStorage.setItem('lastSongId', event?.track?.id?.toString());
      checkIsFavorite();
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
        backgroundColor={COLORS.dark[950]}
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
