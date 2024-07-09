import SettingsScreen from '../screens/SettingsScreen';
import PlayListsScreen from '../screens/PlayListsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';
import {StackParamList} from '../types/ScreenTypes';
import ThemesScreen from '../screens/ThemesScreen';
import CustomPlayListScreen from '../screens/CustomPlayListScreen';
import {useThemeStore} from '../store/themeStore';

const Stack = createNativeStackNavigator<StackParamList>();

const StackPlayLists = () => {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background,
        },
      }}
      initialRouteName="PlayLists">
      <Stack.Screen name="PlayLists" component={PlayListsScreen} />
      <Stack.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          headerShown: true,
          headerTitle: 'Canciones favoritas',
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
      <Stack.Screen name="CustomPlayList" component={CustomPlayListScreen} />
    </Stack.Navigator>
  );
};

const StackSettings = () => {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
      }}>
      <Stack.Screen
        name="Settings"
        options={{headerTitle: 'Ajustes'}}
        component={SettingsScreen}
      />

      <Stack.Screen
        options={{headerTitle: 'Temas'}}
        name="Themes"
        component={ThemesScreen}
      />
    </Stack.Navigator>
  );
};

export {StackSettings, StackPlayLists};
