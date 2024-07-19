import TrackPlayer, {Track} from 'react-native-track-player';
import {getQueue} from 'react-native-track-player/lib/src/trackPlayer';
import {useQueueStore} from '../store/queueStore';

export const playTrack = ({id}: {id: number}) => {
  TrackPlayer.skip(id);
  TrackPlayer.play();
};

const randomIdTrack = ({max}: {max: number}) => Math.floor(Math.random() * max);

export const skipNext = async () => {
  const {
    favorites,
    playListId,
    playLists,
    tracks,
    isRandom,
    playingFavorites,
    track,
  } = useQueueStore.getState();
  const playList = playLists[Number(playListId)];

  if (isRandom) {
    if (playListId) {
      return randomTrackInPlayList({playList: playList.tracks});
    }

    if (playingFavorites) {
      return randomTrackInPlayList({playList: favorites});
    }

    const id = randomIdTrack({max: tracks.length});
    return playTrack({id});
  }

  if (playListId) {
    const currentIndex = playList.tracks.findIndex(e => e.url === track?.url);
    let nextTrackIndex = currentIndex + 1;

    if (nextTrackIndex > playList.tracks.length - 1) {
      nextTrackIndex = 0;
    }

    const nextTrackInPlayList = playList.tracks[nextTrackIndex].url;

    const indexNextTrack = tracks.findIndex(
      track => track.url === nextTrackInPlayList,
    );
    return TrackPlayer.skip(indexNextTrack);
  }

  if (playingFavorites) {
    const currentFavoriteTrackIndex = favorites.findIndex(
      favorite => favorite.url === track.url,
    );

    let nextFavoriteIndex = currentFavoriteTrackIndex + 1;

    if (nextFavoriteIndex > favorites.length - 1) {
      nextFavoriteIndex = 0;
    }

    const nextFavoriteUrl = favorites[nextFavoriteIndex]?.url;

    const initialIndex = tracks.findIndex(
      track => track.url === nextFavoriteUrl,
    );
    return TrackPlayer.skip(initialIndex);
  }

  TrackPlayer.skipToNext();
};

export const skipPrevious = async () => {
  const {
    favorites,
    playListId,
    playLists,
    tracks,
    isRandom,
    playingFavorites,
    track,
  } = useQueueStore.getState();
  const playList = playLists[Number(playListId)];

  if (isRandom) {
    if (playListId) {
      return randomTrackInPlayList({playList: playList.tracks});
    }

    if (playingFavorites) {
      return randomTrackInPlayList({playList: favorites});
    }

    const id = randomIdTrack({max: tracks.length});
    return playTrack({id});
  }

  if (playListId) {
    const currentIndex = playList.tracks.findIndex(e => e.url === track?.url);
    let previousIndexTrack = currentIndex - 1;

    if (previousIndexTrack < 0) {
      previousIndexTrack = playList.tracks.length - 1;
    }

    const previousTrackInPlayList = playList.tracks[previousIndexTrack];
    const prevIndexTrack = tracks.findIndex(
      track => track.url === previousTrackInPlayList?.url,
    );

    return TrackPlayer.skip(prevIndexTrack);
  }

  if (playingFavorites) {
    const currentFavoriteTrackIndex = favorites.findIndex(
      favorite => favorite.url === track.url,
    );

    let previousFavoriteIndex = currentFavoriteTrackIndex - 1;
    if (previousFavoriteIndex < 0) {
      previousFavoriteIndex = favorites.length - 1;
    }

    const previousFavorite = favorites[previousFavoriteIndex];

    const prevFavoriteIndexTrack = tracks.findIndex(
      track => track.url === previousFavorite?.url,
    );
    return TrackPlayer.skip(prevFavoriteIndexTrack);
  }

  TrackPlayer.skipToPrevious();
};

export const randomTrackInPlayList = async ({
  playList,
}: {
  playList: Track[];
}) => {
  const queue = await getQueue();
  const randomIndex = randomIdTrack({
    max: playList.length,
  });
  const urlTrack = playList.find((_, i) => i === randomIndex)?.url;
  const indexTrack = queue.findIndex(t => t.url === urlTrack);

  playTrack({id: indexTrack});
};
