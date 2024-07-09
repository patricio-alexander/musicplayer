type Artwork = {
  uri: string;
};

export type Track = {
  title: string;
  url: string;
  artwork: Artwork | number;
};

export type PlayList = {
  name: string;
  tracks: Array<Track>;
};
