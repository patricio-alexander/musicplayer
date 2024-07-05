import {COLORS} from '../constants/Colors';
import SettingsScreen from '../screens/SettingsScreen';
import PlayListsScreen from '../screens/PlayListsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';
import {StackParamList} from '../types/ScreenTypes';
import ThemesScreen from '../screens/ThemesScreen';
import CustomPlayListScreen from '../screens/CustomPlayListScreen';

const Stack = createNativeStackNavigator<StackParamList>();

const StackPlayLists = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.dark[950],
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
            backgroundColor: COLORS.dark[950],
          },
        }}
      />
      <Stack.Screen name="CustomPlayList" component={CustomPlayListScreen} />
    </Stack.Navigator>
  );
};

const StackSettings = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.dark[950],
        },
      }}>
      <Stack.Screen
        name="Settings"
        options={{headerTitle: 'Ajustes'}}
        component={SettingsScreen}
      />

      <Stack.Screen name="Themes" component={ThemesScreen} />
    </Stack.Navigator>
  );
};

export {StackSettings, StackPlayLists};
