import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TracksScreen from '../screens/TracksScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Player from '../screens/PlayerScreen';
import {StackPlayLists, StackSettings} from './Stacks';
import {useThemeStore} from '../store/themeStore';
type TabBarIcon = {
  color: string;
  focused: boolean;
};

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  const {theme} = useThemeStore();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondary,
        headerShown: false,

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
        name="Songs"
        component={TracksScreen}
        options={{
          title: 'Canciones',
          tabBarIcon: ({color}: TabBarIcon) => (
            <Icon name="library-music" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          title: 'Reproductor',
          tabBarIcon: ({color}: TabBarIcon) => (
            <Icon name="play-circle" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="PlayList"
        component={StackPlayLists}
        options={{
          title: 'Playlist',
          tabBarIcon: ({color}: TabBarIcon) => (
            <Icon name="queue-music" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={StackSettings}
        options={{
          title: 'Ajustes',
          tabBarIcon: ({color}: TabBarIcon) => (
            <Icon name="settings" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
