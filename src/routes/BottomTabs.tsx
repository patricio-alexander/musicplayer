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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderColor: theme.accent,
          paddingBottom: 5,
          paddingTop: 3,
          height: 55,
        },
      }}>
      <Tab.Screen
        name="Tracks"
        component={TracksScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitle: 'Minimalist Player',
          tabBarIcon: ({color}) => (
            <Icon name="music-box-outline" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="play-circle-outline" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="PlayList"
        component={StackPlayLists}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="playlist-music-outline" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={StackSettings}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="cog" size={28} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
