import { persist } from "zustand/middleware";
import { TLogin, TRegister } from "../hooks/useAuth";
import { create } from "zustand";
import api from "../utils/api";
export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
};
type AuthStore = {
    token: string | null;
    login: (values: TLogin) => Promise<void>;
    register: (values: TRegister) => Promise<void>;
    logout: () => Promise<void>;
    me: () => Promise<User | undefined>
};

const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            token: null,
            login: async (values: TLogin) =>
                api.post("/auth/login", values).then((res) => {
                    set({ token: res.data.token });
                }),
            register: async (values: TRegister) =>
                api.post("/auth/register", values).then((res) => {
                    set({ token: res.data.token });
                }),
            logout: async () =>
                api.post("/auth/logout").then(() => {
                    set({ token: null });
                }),
            me: () => {
                const token = get().token
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                return api.get("/auth/me", { headers }).then((res) => {
                    const user = res.data
                    if (!user) {
                        set({ token: null })
                        return
                    }
                    return res.data.user
                }).catch((err) => {
                    switch (err.response.status) {
                        case 401:
                        case 403:
                            set({ token: null })
                            break;

                        default:
                            break;
                    }
                })
            }

        }),
        {
            name: "auth-storage",
            getStorage: () => sessionStorage,
        }
    )
);

export default useAuthStore;
