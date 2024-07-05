import type {NativeStackScreenProps} from '@react-navigation/native-stack';

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

export type PlayListScreenProps = NativeStackScreenProps<
  StackParamList,
  'PlayLists'
>;
export type FavoriteScreenProps = NativeStackScreenProps<
  StackParamList,
  'Favorites'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  StackParamList,
  'Settings'
>;

export type CustomPlayListProps = NativeStackScreenProps<
  StackParamList,
  'CustomPlayList'
>;

export type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Permission'
>;

export type TabsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Tabs'
>;
