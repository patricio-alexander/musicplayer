import {COLORS} from '../constants/Colors';
import Settings from '../screens/Settings';
import PlayLists from '../screens/PlayLists';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favorite from '../screens/Favorite';
import {RootStackParamList} from '../types/ScreenTypes';
import Themes from '../screens/Themes';
import CustomPlayList from '../screens/CustomPlayList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackPlayLists = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="PlayLists">
      <Stack.Screen name="PlayLists" component={PlayLists} />
      <Stack.Screen
        name="Favorites"
        component={Favorite}
        options={{
          headerShown: true,
          headerTitle: 'Canciones favoritas',
          headerStyle: {
            backgroundColor: COLORS.dark[900],
          },
        }}
      />
      <Stack.Screen name="CustomPlayList" component={CustomPlayList} />
    </Stack.Navigator>
  );
};

const StackSettings = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Themes" component={Themes} />
    </Stack.Navigator>
  );
};

export {StackSettings, StackPlayLists};
