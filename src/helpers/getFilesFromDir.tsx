import RNFS from 'react-native-fs';

export const getFilesFromDirectory = async ({path}: {path: string}) => {
  const files = await RNFS.readDir(path);

  const audioFiles = files.filter(
    file =>
      (file.isFile() && file.name.endsWith('.mp3')) ||
      file.name.endsWith('.m4a'),
  );

  const songs = audioFiles.map((file, index) => {
    const nameSplit = file.name?.split('.').pop() ?? '';

    const songName = file.name.slice(0, -nameSplit?.length - 1);
    return {
      id: index,
      url: `file://${file?.path}`,
      title: songName,
    };
  });
  return songs;
};
