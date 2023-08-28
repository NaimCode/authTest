import { persist } from 'zustand/middleware';
import { TLogin, TRegister } from "../hooks/useAuth"
import { create } from "zustand"
import api from '../utils/api';
type User = {
    id: string,
    email: string,
    name: string
    password: string
}
type AuthStore = {
    token: string | null,
    user: User | null,
    login: (values: TLogin) => Promise<void>,
    register: (values: TRegister) => Promise<void>,
    logout: () => Promise<void>,

}

const useAuthStore = create<AuthStore>()(persist((set, get) => ({
    token: null,
    user: null,
    login: async (values: TLogin) => { },
    register: async (values: TRegister) => {
        return api.post('/auth/register', values).then((res) => {
            set({ token: res.data.token, user: res.data.user })
            return
        }
        )
    },
    logout: async () => { }
}), {
    name: 'auth-storage',
    getStorage: () => sessionStorage
}))

export default useAuthStore

