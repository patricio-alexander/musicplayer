import {useQueueStore} from '../store/queueStore';
import {Track} from 'react-native-track-player';

export const useCheckIsFavorite = () => {
  const {favorites, setIsFavorite} = useQueueStore();

  const checkIsFavorite = async (track: Track | undefined) => {
    const exist = favorites.some(favorite => favorite?.url === track?.url);

    setIsFavorite(exist);
  };

  return {checkIsFavorite};
};
