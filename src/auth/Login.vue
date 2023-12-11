<script  >
import { Field, Form, ErrorMessage } from "vee-validate";
import axios from 'axios';

import OverLaye from '../subcomponents/common/OverLaye.vue';
// import ErrorMessage from '../subcomponents/ErrorMessage.vue';

import { useAuthStore } from "../stores";


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: {
        OverLaye,
        Field,
        Form,
        ErrorMessage,
        useAuthStore,
    },
    data() {
        return {
            typePassword: true,
            email: "",
            password: "",
            overlay: false,
            fromSubmited: false,
        }
    },
    created() {
        this.checkUser()
    },
    methods: {
        async onSubmit(values) {
            const authStore = useAuthStore();
            const { email, password } = values;
            await authStore.login(email, password);
        },
        checkUser() {
            const User = localStorage.getItem('userToken')

            if (User) {
                this.$router.push({ name: 'home' });
            }

        },


        getInputError(fieldName) {
            return {
                'input_error': !fieldName && this.fromSubmited,
            };
        },

        // async login() {

        //     this.fromSubmited = true


        //     const requiredFields = [
        //         { field: this.email, name: 'email' },
        //         { field: this.password, name: 'password' },
        //     ];

        //     for (const { field, name } of requiredFields) {
        //         if (!field) {
        //             return;
        //         }
        //     }

        //     var login_data = new FormData();
        //     login_data.append("user_email", this.email);
        //     login_data.append("user_password", this.password);

        //     try {

        //         this.overlay = true

        //         const loginUser = await axios.post(`${baseUrl}/admin/sign-in`, login_data);



        //         if (loginUser.data.success === 1) {

        //             localStorage.setItem('userToken', JSON.stringify(loginUser.data.session_token))

        //             this.$router.push({ name: 'home' });

        //             this.overlay = false

        //         }

        //         else {

        //             this.overlay = false

        //             location.reload();

        //         }


        //     } catch (error) {
        //         console.log(error);
        //     }

        // },

        // async login(values) {
        //     const authStore = useAuthStore();
        //     const { email, password } = values;
        //     await authStore.login(email, password);
        // },

    },
}

</script>

<template>
    <div class="auth-page">


        <div class="auth-container">

            <div class="space-y-4px auth-title">

                <h1 class="color-Grey_90 text-2xl_semibold">Sign In</h1>
                <h6 class="color-Grey_50 text-base_regular">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quis commodi, beatae dolorem
                    repellat reiciendis accusantium ut.</h6>

            </div>



            <div class="auth-from-section">
                <Form @submit="onSubmit" class="from space-y-24px">


                    <div class="input-group">
                        <label for="">Email</label>
                        <Field name="email" :rules="validateEmail" class="input-1" type="email"
                            placeholder="Enter Email id" />
                        <ErrorMessage name="email" class="text-red-600 block mt-2" />
                        <!-- <input type="email" class="input-1" :class="getInputError(email)" v-model="email">
                                <ErrorMessage msg="Email Is reqired" v-if="!email && fromSubmited" /> -->

                    </div>


                    <div class="input-group">

                        <label for="">Password</label>
                        <div class="search-wrraper w-100 border-Grey_20" :class="getInputError(password)">
                            <!-- <input class="w-100" :type="typePassword ? 'password' : 'text'" v-model="password"> -->
                            <Field name="password" class="w-100" :type="typePassword ? 'password' : 'text'"
                                placeholder="Password" />
                            <div class="icon togglePassword">
                                <span v-if="typePassword" @click="typePassword = false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path
                                            d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span v-if="!typePassword" @click="typePassword = true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                            stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <ErrorMessage name="password" class="text-red-600 block mt-2" />
                        <!-- <ErrorMessage msg="Password Is reqired" v-if="!email && fromSubmited" /> -->

                    </div>

                    <div class="space-y-8px">

                        <button type="submit" class="btn-regular btn-w-full">Log In</button>

                        <div class="text-right">
                            <p class="color-Grey_50 text-base_regular">I have <a href="#" class="color_violet">forget
                                    password !</a>
                            </p>
                        </div>

                    </div>

                </form>

            </div>


        </div>


    </div>

    <OverLaye v-if="overlay" />
</template>