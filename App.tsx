import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import BottomTabs from './src/routes/BottomTabs';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from './src/constants/Colors';
import {useQueueStore} from './src/store/queueStore';
import {useDirectoryStore} from './src/store/directoryStore';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getActiveTrack} from 'react-native-track-player/lib/src/trackPlayer';
import {getFilesFromDirectory} from './src/helpers/getFilesFromDir';
import DocumentPicker from 'react-native-document-picker';
import {uriToPath} from './src/helpers/uriToPath';
import {Track} from './src/types/SongTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Container from './src/components/Container';
import Button from './src/components/Button';
import {
  getAll,
  getAlbums,
  searchSongs,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';

const requestAudioMusicPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    );
    return granted;
  } catch (error) {
    console.error(error);
  }
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isPlayerInitialized, setIsPlayerInitialized] =
    useState<boolean>(false);
  const setActiveSongId = useQueueStore(state => state.setActiveQueueId);
  const setSongTitle = useQueueStore(state => state.setSongTitle);

  const selectedDirectory = useDirectoryStore(state => state.selectedDirectory);
  const setSelectedDirectory = useDirectoryStore(
    state => state.setSelectedDirectory,
  );
  const setDirectories = useDirectoryStore(state => state.setDirectories);
  const setTracks = useQueueStore(state => state.setTracks);
  const setFavorites = useQueueStore(state => state.setFavorites);
  const favorites = useQueueStore(state => state.favorites);
  const setIsFavorite = useQueueStore(state => state.setIsFavorite);
  const setIsRandom = useQueueStore(state => state.setIsRandom);
  const setPlayLists = useQueueStore(state => state.setPlayLists);

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

  const directoryExist = async () => {
    const store = await AsyncStorage.getItem('playerdata');

    if (!store) return store;
    const data = JSON.parse(store ?? '');
    return data;
  };
  const initizalizedPlayer = async (): Promise<void> => {
    try {
      await TrackPlayer.getActiveTrackIndex();
    } catch (error) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      setIsPlayerInitialized(true);
    }
  };

  const checkIsFavorite = async () => {
    const activeTrack = await getActiveTrack();
    setIsFavorite(favorites.includes(activeTrack?.id));
  };

  const selectMusicDirectory = async (): Promise<void> => {
    try {
      const granted = await requestAudioMusicPermissions();
      const directory = await directoryExist();
      if (granted === PermissionsAndroid.RESULTS.GRANTED && !directory) {
        const directory = await DocumentPicker.pickDirectory();

        const playerData = {
          dirs: [uriToPath(directory?.uri ?? '') ?? ''],
          pathSelectedDir: uriToPath(directory?.uri ?? ''),
        };
        await AsyncStorage.setItem('playerdata', JSON.stringify(playerData));
        setSelectedDirectory(uriToPath(directory?.uri ?? ''));
        if (!isPlayerInitialized) await initizalizedPlayer();
        const tracks = await getFilesFromDirectory({
          path: uriToPath(directory?.uri ?? ''),
        });
        setTracks(tracks);
        addSongsInTrackPlayer(tracks);
        setDirectories(playerData?.dirs);

        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addSongsInTrackPlayer = async (songs: Array<Track>) => {
    const lastSongId = await AsyncStorage.getItem('lastSongId');
    await TrackPlayer.skip(Number(lastSongId));
    await TrackPlayer.add(songs);
  };

  const initizalizedSongs = async (dir: string) => {
    if (!isPlayerInitialized) await initizalizedPlayer();
    //const tracks = await getFilesFromDirectory({path: dir});
    //setTracks(tracks);
    //addSongsInTrackPlayer(tracks);
    const songsOrError = await getAll({
      limit: 100,
      offset: 0,
      coverQuality: 50,
      minSongDuration: 1000,
      sortBy: SortSongFields.TITLE,
      sortOrder: SortSongOrder.DESC,
    });

    const arraysong = [...songsOrError];
    const tracks = arraysong.map((file: any, i) => ({
      id: i,
      title: file?.title,
      url: `file://${file?.url}`,
      artwork: file?.cover ? file?.cover : null,
    }));
    setTracks(tracks);
    addSongsInTrackPlayer(tracks);
  };

  const main = async (): Promise<void> => {
    const permission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    );

    if (permission) {
      try {
        const directory = await directoryExist();
        const StorageFavorites = await AsyncStorage.getItem('favorites');

        if (StorageFavorites) {
          const ListFavorite = JSON.parse(StorageFavorites ?? '');
          setFavorites(ListFavorite);
        }

        //console.log(ListFavorite)
        setSelectedDirectory(directory.pathSelectedDir ?? '');
        setDirectories(directory.dirs);
        initizalizedSongs(directory.pathSelectedDir ?? '');
      } catch (error) {
        console.log(error);
      }
    }
  };

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    try {
      setActiveSongId(event?.track?.id);
      setSongTitle(event?.track?.title ?? '');
      await AsyncStorage.setItem('lastSongId', event?.track?.id?.toString());
      checkIsFavorite();
    } catch (error) {
      console.log(error);
    }
  });

  const checkPlayLists = async () => {
    try {
      const localStorage = (await AsyncStorage.getItem('playLists')) ?? '';
      setPlayLists(JSON.parse(localStorage));
      //console.log(localStorage);
    } catch (error) {
      console.log(
        'Es posible que no exista ninguna playlist agregada por el usuario',
      );
    }
  };

  useEffect((): void => {
    main();
    checkRandomTrack();
    checkPlayLists();
  }, []);

  const Stack = createNativeStackNavigator();

  function Welcome() {
    return (
      <Container>
        <Button
          title="PERMISOS DE MÚSICA Y AUDIO"
          onPress={selectMusicDirectory}
        />
      </Container>
    );
  }

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
        {!selectedDirectory ? (
          <Stack.Screen name="Welcome" component={Welcome} />
        ) : (
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
