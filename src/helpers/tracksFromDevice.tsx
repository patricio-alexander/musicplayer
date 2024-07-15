import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';
import {Track} from 'react-native-track-player';

type TracksDevice = {
  offset?: number;
};

export const tracksFromDevice = async ({
  offset,
}: TracksDevice): Promise<Array<Track>> => {
  const songsOrError = await getAll({
    limit: 20,
    offset: offset,
    coverQuality: 50,
    minSongDuration: 1000,
    sortBy: SortSongFields.TITLE,
    sortOrder: SortSongOrder.DESC,
  });

  const arraysong = [...songsOrError];
  const tracks = arraysong.map((file: any, i) => ({
    title: file?.title,
    url: `file://${file?.url}`,
    artwork: file?.cover ? file.cover : require('../assets/player.png'),
  }));

  return tracks;
};
