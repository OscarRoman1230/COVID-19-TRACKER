import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<string | null>(localStorage.getItem('user'));

    const login = (username: string) => {
        user.value = username;
        localStorage.setItem('user', username);
    };

    const logout = () => {
        user.value = null;
        localStorage.removeItem('user');
    };

    return { user, login, logout };
});
