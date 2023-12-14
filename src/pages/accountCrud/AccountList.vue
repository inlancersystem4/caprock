<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import axios from 'axios';


import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection.vue';
import SearchBox from '../../subcomponents/common/SearchBox.vue';
import Pagination from '../../subcomponents/common/Pagination.vue';
import AccountRow from './component/AccountRow.vue';
import DeleteModel from '../../subcomponents/common/DeleteModel.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, SearchBox, Pagination, AccountRow, DeleteModel },
    data() {
        return {
            list: [],
            searchText: "",
            currentPage: 1,
            totalPages: 1,
            sort: "asc",
            deleteItemModal: false,
            itemId: "",
        }
    },
    created() {
        this.accountData();
    },
    methods: {

        addUserFun() {
            this.$router.push({ name: 'AddAccount' })
        },

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.accountData();
        },

        updatePage(Number) {
            this.currentPage = Number;
            this.accountData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.accountData();
        },

        async accountData() {
            var account_data = new FormData();
            account_data.append("a_id", "");
            account_data.append("sort", this.sort);
            account_data.append("search", this.searchText);
            account_data.append("page", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/account-list`, account_data);
                this.list = response.data;
                this.totalPages = response.total_pages;

            } catch (error) {
                console.log(error);
            }

        },

        async statusUpdate(id) {
            var status_up = new FormData();

            status_up.append("a_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/account-status`, status_up);

                if (data.success === 1) {
                    this.accountData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        getItemId(id) {
            this.deleteItemModal = true
            this.itemId = id
        },

        editItem(id) {
            this.$router.push({ name: 'EditAccount', params: { id: id } })
        },

        async deleteItem() {
            var delete_data = new FormData();

            delete_data.append("a_id", this.itemId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/remove-account`, delete_data);

                if (data.success === 1) {
                    this.accountData();
                    this.deleteItemModal = false
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
    },
}
</script>



<template>
    <Layout>


        <ContentSection>

            <template v-slot:table-header>

                <div class="w-100 margin-bottom_12px">
                    <h2 class="title">Account List</h2>
                </div>


                <div class="table-options">

                    <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                        <img src="../../assets/img/icons/adjustments.svg">
                        <span v-if="sort === 'asc'">Newest</span>
                        <span v-if="sort === 'desc'">Oddest</span>
                    </button>

                </div>

                <div class="table-options">

                    <SearchBox placeholder="Search Account" :value="searchText" @input="searchTextFun" />

                    <button class="btn-regular display-flex align-center  gap-8px text-no-wrap" @click="addUserFun()">
                        <img src="../../assets/img/icons/plus-3.svg">
                        Add New Account</button>

                </div>


            </template>

            <template v-slot:main-table>

                <div v-if="!list" class="data-not-found border-b border-Grey_20 border-solid">
                    <img src="../../assets/img/no-data.png">
                </div>

                <table class="w-100 user-table" v-if="list">
                    <tbody>

                        <tr>
                            <td class="count">
                                <p class="text-sm_regular color-Grey_50">No.</p>
                            </td>
                            <td class="account_name">
                                <p class="text-sm_regular color-Grey_50">Account No.</p>
                            </td>
                            <td class="account_balance">
                                <p class="text-sm_regular color-Grey_50">Account Balance</p>
                            </td>
                            <td class="account_color">
                                <p class="text-sm_regular color-Grey_50">Account Color</p>
                            </td>
                            <td class="blank"></td>
                            <td class="user-status">
                                <p class="text-sm_regular color-Grey_50">Account staus</p>
                            </td>
                            <td class="dropdown">

                            </td>
                        </tr>
                        <AccountRow :list="list" @delete_item="getItemId" @edit_item="editItem"
                            @edit_status="statusUpdate" />

                    </tbody>
                </table>

            </template>

            <template v-slot:table-footer>


                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />


            </template>

        </ContentSection>


    </Layout>


    <DeleteModel model_title="Delete Account" model_subtitle="Are you sure you want to delete this Account?"
        v-if="deleteItemModal" @close_model="deleteItemModal = false" @delete_item="deleteItem()" />
</template>

<style scoped>
tr {
    display: flex;
    gap: 24px;
    align-items: center;
}

.count {
    min-width: 5%;
    max-width: 5%;
    display: block;
}

.account_name {
    min-width: 20%;
    max-width: 20%;
    display: block;
}

.account_balance {
    min-width: 20%;
    max-width: 20%;
    display: block;
}

.account_color {
    min-width: 15%;
    max-width: 15%;
    display: block;
}

.blank {
    min-width: 10%;
    max-width: 10%;
    display: block;
}

.user-status {
    min-width: 12%;
    max-width: 12%;
    display: flex;
    justify-content: end;
}

.dropdown {
    min-width: 5%;
    max-width: 5%;
    display: flex;
    justify-content: end;
}


@media (max-width:999px) {

    .count {
        min-width: 50px;
        max-width: 50px;
    }

    .account_name {
        min-width: 150px;
        max-width: 150px;
    }

    .account_balance {
        min-width: 150px;
        max-width: 150px;
    }

    .account_color {
        min-width: 150px;
        max-width: 150px;
    }

    .blank {
        min-width: 50px;
        max-width: 50px;
    }

    .user-status {
        min-width: 100px;
        max-width: 100px;
    }

    .dropdown {
        min-width: 50px;
        max-width: 50px;
    }
}
</style>