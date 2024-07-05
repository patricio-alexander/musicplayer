import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';

export const tracksFromDevice = async () => {
  const songsOrError = await getAll({
    limit: 100,
    offset: 0,
    coverQuality: 50,
    minSongDuration: 1000,
    sortBy: SortSongFields.TITLE,
    sortOrder: SortSongOrder.DESC,
  });

  const arraysong = [...songsOrError];
  const tracks = arraysong.map((file: any, i) => ({
    id: i,
    title: file?.title,
    url: `file://${file?.url}`,
    artwork: file?.cover ? {uri: file.cover} : require('../assets/player.png'),
  }));

  return tracks;
};
