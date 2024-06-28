import RNFS from "react-native-fs"

export const getFilesFromDirectory = async ({ path }: { path: string }) => {
  const extensionsAudios = ["mp3", "m4a", 'wav']
  const files = await RNFS.readDir(path);
  const songs = files.map((file, index) => {
    const fileExtension = file?.name?.split(".").pop();
    const include = extensionsAudios.includes(fileExtension ?? "");
    const nameSplit = file.name?.split(".").pop() ?? "";

    const songName: string = include ? file.name.slice(0, - nameSplit?.length - 1) : "extension no disponible";
    return {
      id: index,
      url: `file://${file?.path}`,
      title: songName,
    }
  })
  return songs;
};
