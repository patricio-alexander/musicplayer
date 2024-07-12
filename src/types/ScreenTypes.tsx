import {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Splash: undefined;
  Permission: undefined;
  Tabs: undefined;
};

export type StackParamList = {
  PlayLists: undefined;
  Favorites: undefined;
  Settings: undefined;
  Themes: undefined;
  CustomPlayList: {playListId: number};
};

export type TabsParamList = {
  Tracks: undefined;
  Player: undefined;
  PlayList: undefined;
  Setting: undefined;
};

export type PlayerListTabProps = BottomTabScreenProps<TabsParamList, 'Player'>;

export type PlayListScreenProps = StackScreenProps<StackParamList, 'PlayLists'>;
export type FavoriteScreenProps = StackScreenProps<StackParamList, 'Favorites'>;
export type SettingsScreenProps = StackScreenProps<StackParamList, 'Settings'>;

export type CustomPlayListProps = StackScreenProps<
  StackParamList,
  'CustomPlayList'
>;

export type WelcomeScreenProps = StackScreenProps<
  RootStackParamList,
  'Permission'
>;

export type TabsScreenProps = StackScreenProps<RootStackParamList, 'Tabs'>;
