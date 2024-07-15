import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TracksScreen from '../screens/TracksScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.text,
        headerTitleStyle: {
          fontFamily: 'NunitoSans_700Bold',
        },

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
          fontFamily: 'NunitoSans_700Bold',
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
            <Icon name="music-box-outline" size={25} color={color} />
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
            <Icon name="play-circle-outline" size={25} color={color} />
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
            <Icon name="playlist-music-outline" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={StackSettings}
        options={{
          title: 'Ajustes',
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="cog" size={25} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
