import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  PlayLists: undefined;
  Favorites: undefined;
  Settings: undefined;
  Themes: undefined;
  CustomPlayList: {playListId: number};
};

export type PlayListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PlayLists'
>;
export type FavoriteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Favorites'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

export type CustomPlayListProps = NativeStackScreenProps<
  RootStackParamList,
  'CustomPlayList'
>;
