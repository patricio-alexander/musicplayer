import { create } from "zustand";


type DirectoryStore = {
  selectedDirectory: string | null,
  directories: string[]
  setSelectedDirectory: (directory: string) => void
  setDirectories: (directories: string[]) => void
}


export const useDirectoryStore = create<DirectoryStore>()((set) => ({
  selectedDirectory: "",
  directories: [],
  setSelectedDirectory: (directory) => set({ selectedDirectory: directory }),
  setDirectories: (directories) => set({ directories })
}))
