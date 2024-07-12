import {Track} from 'react-native-track-player';

type Artwork = {
  uri: string;
};

export type PlayList = {
  name: string;
  tracks: Array<Track>;
};
