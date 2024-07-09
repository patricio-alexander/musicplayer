import {useQueueStore} from '../store/queueStore';
import {Track} from '../types/SongTypes';

export const useCheckIsFavorite = () => {
  const {favorites, setIsFavorite} = useQueueStore();

  const checkIsFavorite = async (track: Track) => {
    const exist = favorites.some(
      (favorite: Track) => favorite?.url === track?.url,
    );

    setIsFavorite(exist);
  };

  return {checkIsFavorite};
};
