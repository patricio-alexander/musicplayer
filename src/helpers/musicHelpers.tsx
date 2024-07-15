import TrackPlayer from 'react-native-track-player';
import {PlayList} from '../types/SongTypes';
import {getQueue} from 'react-native-track-player/lib/src/trackPlayer';
export const playTrack = ({id}: {id: number}) => {
  TrackPlayer.skip(id);
  TrackPlayer.play();
};

export const randomTrackInCustomPlayList = async ({
  playList,
}: {
  playList: PlayList;
}) => {
  const queue = await getQueue();
  const randomIndex = randomIdTrack({
    max: playList.tracks.length,
  });
  const urlTrack = playList.tracks.find((_, i) => i === randomIndex)?.url;
  const indexTrack = queue.findIndex(t => t.url === urlTrack);

  playTrack({id: indexTrack});
};

export const randomIdTrack = ({max}: {max: number}) =>
  Math.floor(Math.random() * max);
