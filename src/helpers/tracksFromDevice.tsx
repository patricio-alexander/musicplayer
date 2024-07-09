import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';

type TracksDevice = {
  offset?: number;
};

export const tracksFromDevice = async ({offset}: TracksDevice) => {
  const songsOrError = await getAll({
    limit: 20,
    offset: offset,
    coverQuality: 100,
    minSongDuration: 1000,
    sortBy: SortSongFields.TITLE,
    sortOrder: SortSongOrder.ASC,
  });

  const arraysong = [...songsOrError];
  const tracks = arraysong.map((file: any, i) => ({
    title: file?.title,
    url: `file://${file?.url}`,
    artwork: file?.cover ? file.cover : require('../assets/player.png'),
  }));

  return tracks;
};
