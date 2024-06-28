
import RNFS from 'react-native-fs';


export const uriToPath = (uri: string): string => {
  let path = '';
  if (uri.startsWith('content://')) {
    const splitUri = uri.split('%3A');
    if (splitUri.length > 1) {
      path = `${RNFS.ExternalStorageDirectoryPath}/${decodeURIComponent(
        splitUri[1],
      )}`;
    }
  }
  return path;
};
