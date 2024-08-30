import { create } from "zustand";

interface UserDetailsStore {
  userDetails: UserDetails;
  updateUserDetails: (userDetails: UserDetails) => void;
}

interface UserDetails {
  username: string;
  id: number;
}

const useUserStore = create<UserDetailsStore>((set) => ({
  userDetails: {
    username: "",
    id: 0,
  },
  updateUserDetails: (userDetails) => set(() => ({ userDetails: userDetails })),
}));

export { useUserStore };
