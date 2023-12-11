<script>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';

export default {
    components: {
        Sidebar,
        Header,
    },
    data() {
        return {
            miniSidebarActive: false,
            loading: false,
        }
    },
    created() {
        this.$router.beforeEach((to, from, next) => {
            this.loading = true;
            next();
        });

        this.$router.afterEach(() => {
            this.loading = false;
        });
    },
    methods: {
        checkUser() {
            const User = localStorage.getItem('user')

            if (!User) {
                this.$router.push({ name: 'Login' });
            }

        },
    },
}
</script>


<template>
    <div v-if="loading" class="loader">
        <img src="../assets/img/loader2.gif">
    </div>

    <main class="main-layout">
        <Sidebar />
        <section class="main-content">
            <Header />
            <section class="main-content-body">
                <div class="content-section">
                    <slot></slot>
                </div>
            </section>
        </section>
    </main>
</template>

<style scoped>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(14px);
    position: fixed;
    inset: 0;
    z-index: 999;
}
</style>
