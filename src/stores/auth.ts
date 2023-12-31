import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import router from '@/router';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            var form_data = new FormData();
            form_data.append('user_email', email);
            form_data.append('user_password', password);
            try {
                const user = await fetchWrapper.post(`${baseUrl}/sign-in`, form_data);
                console.log(user);
                var new_user = {
                    token: user.session_token
                }
                // update pinia state
                this.user = new_user;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(new_user));

                const alertStore = useAlertStore();
                alertStore.success('Login successfully !!');


                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('home');
        },
        async mailcheck(email) {
            var form_data = new FormData();
            form_data.append('email', email);
            try {
                const e_data = await fetchWrapper.post(`${baseUrl}/checkuser`, form_data);
                // update pinia state
                this.email = e_data;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('email', JSON.stringify(this.email));

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/account/password');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
    }
});
