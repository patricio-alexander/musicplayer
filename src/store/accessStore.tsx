import {create} from 'zustand';

type AccessStore = {
  access: boolean;
  setAccess: (access: boolean) => void;
};

export const useAccess = create<AccessStore>()(set => ({
  access: false,
  setAccess: access => set({access}),
}));
