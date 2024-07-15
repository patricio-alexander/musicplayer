import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TracksScreen from '../screens/TracksScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Player from '../screens/PlayerScreen';
import {StackPlayLists, StackSettings} from './Stacks';
import {useThemeStore} from '../store/themeStore';
import {TabsParamList} from '../types/ScreenTypes';

const Tab = createBottomTabNavigator<TabsParamList>();
const BottomTabs = () => {
  const {theme} = useThemeStore();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondary,

        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          paddingBottom: 5,
          paddingTop: 3,
          height: 55,
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Tracks"
        component={TracksScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitle: 'Minimalist Player',
          title: 'Canciones',
          tabBarIcon: ({color}) => (
            <Icon name="library-music" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
          title: 'Reproductor',
          tabBarIcon: ({color}) => (
            <Icon name="play-circle" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="PlayList"
        component={StackPlayLists}
        options={{
          headerShown: false,
          title: 'Playlist',
          tabBarIcon: ({color}) => (
            <Icon name="queue-music" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={StackSettings}
        options={{
          title: 'Ajustes',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="settings" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
