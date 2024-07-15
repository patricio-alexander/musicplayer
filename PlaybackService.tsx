import {
  playTrack,
  randomTrackInCustomPlayList,
} from './src/helpers/musicHelpers';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import {Event} from 'react-native-track-player';
import {getQueue} from 'react-native-track-player/lib/src/trackPlayer';
import {randomIdTrack} from './src/helpers/musicHelpers';
import {useQueueStore} from './src/store/queueStore';

export const initizalizedPlayer = async (): Promise<boolean> => {
  try {
    await TrackPlayer.getActiveTrackIndex();
    return true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });

    return true;
  }
};

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    const {isRandom, playListId, playLists} = useQueueStore.getState();
    if (!isRandom || !playListId) {
      return TrackPlayer.skipToNext();
    }
    if (playListId) {
      const currenPlayList = playLists[Number(playListId)];
      randomTrackInCustomPlayList({playList: currenPlayList});

      return;
    }
    const tracks = await getQueue();
    const id = randomIdTrack({max: tracks.length});
    playTrack({id});
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious(),
  );

  TrackPlayer.addEventListener(Event.RemoteSeek, ({position}) =>
    TrackPlayer.seekTo(position),
  );
};
