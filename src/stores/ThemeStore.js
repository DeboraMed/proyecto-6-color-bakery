import { defineStore } from 'pinia';

export const useThemeStore = defineStore({
    id: 'theme',
    state: () => ({
        theme: 'light', // valor por defecto
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', this.theme);
        },
    },
});