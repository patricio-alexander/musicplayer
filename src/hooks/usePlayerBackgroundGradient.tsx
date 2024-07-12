import {useEffect, useState} from 'react';
import {AndroidImageColors} from 'react-native-image-colors/build/types';
import {getColors} from 'react-native-image-colors';

export const usePlayerBackgrounGradient = (imgUrl: string) => {
  const [gradient, setGradient] = useState<AndroidImageColors | null>(null);
  useEffect(() => {
    getColors(imgUrl, {
      fallback: '#228B22',
      cache: true,
      key: imgUrl,
    })
      .then(c => setGradient(c as AndroidImageColors))
      .catch(() => setGradient(null));
  }, [imgUrl]);

  return {gradient};
};
