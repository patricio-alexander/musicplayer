export type Track = {
  id: number;
  title: string;
  url: string;
};

export type PlayList = {
  name: string;
  tracks: Array<Track>;
};
