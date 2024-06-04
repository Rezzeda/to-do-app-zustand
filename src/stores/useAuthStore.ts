import { create } from 'zustand';

interface AuthStore {
    user: { email: string } | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

interface Users {
    [key: string]: string;
}

const users: Users = {
    "user@user.com": "12345",
    "admin@admin.com": "67890"
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    login: (email, password) => {
        if (users[email] === password) {
            set({ user: { email } });
            return true;
        }
        return false;
    },
    logout: () => {
        set({ user: null });
    }
}));
