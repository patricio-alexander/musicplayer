import SettingsScreen from '../screens/SettingsScreen';
import PlayListsScreen from '../screens/PlayListsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';
import {StackParamList} from '../types/ScreenTypes';
import ThemesScreen from '../screens/ThemesScreen';
import CustomPlayListScreen from '../screens/CustomPlayListScreen';
import {useThemeStore} from '../store/themeStore';
import {Header, createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<StackParamList>();

const StackPlayLists = () => {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="PlayLists"
          options={{
            headerShown: false,
          }}
          component={PlayListsScreen}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: true,
          headerTintColor: theme.primary,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}>
        <Stack.Screen name="Favorites" component={FavoriteScreen} />
        <Stack.Screen name="CustomPlayList" component={CustomPlayListScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const StackSettings = () => {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.primary,
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
