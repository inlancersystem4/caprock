<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

import axios from 'axios';

import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection2.vue';
import Label from '../../subcomponents/common/Label.vue';
import Input from '../../subcomponents/common/Input.vue';
import ErrorMessage from '../../subcomponents/common/ErrorMessage.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, Label, Input, ErrorMessage },
    data() {
        return {
            accountId: "",
            formSubmitted: false,
            accountName: "",
            accountBal: "",
            accountColor: "",
            accountColorName: "",
        }
    },
    created() {
        this.accountId = this.$route.params.id;
        this.AccountData();
    },
    computed: {
        btnDisabled() {
            return !this.accountName.trim() || !this.accountBal.toString().trim() || !this.accountColor.trim();
        }
    },
    methods: {
        async editAccount() {
            var account_data = new FormData();
            account_data.append("a_id", this.accountId);
            account_data.append("a_name", this.accountName);
            account_data.append("a_balance", this.accountBal);
            account_data.append("a_color", this.accountColor);
            account_data.append("a_color_name", this.accountColorName);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/account-add-or-edit`, account_data);

                if (data.success === 1) {
                    this.$router.push({ name: 'AccountList' });
                }

            } catch (error) {
                console.log(error);
            }
        },
        async AccountData() {
            var account_data = new FormData();
            account_data.append("a_id", this.accountId);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/account-list`, account_data);

                this.accountName = response.data.a_name
                this.accountBal = response.data.a_balance
                this.accountColor = response.data.a_color
                this.accountColorName = response.data.a_color_name

            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>



<template>
    <Layout>


        <ContentSection title="Edit Account">

            <div class="row">

                <div class="col-8">

                    <div class="address-form">

                        <div class="space-y-8px">
                            <Label label="Account Name" />
                            <Input placeholder="Enter Account Name" id="Account Name" :value="accountName"
                                @input="event => accountName = event.target.value" />
                            <ErrorMessage msg="" v-if="!accountName && formSubmitted" />
                        </div>

                        <div class=""></div>

                        <div class="space-y-8px">
                            <Label label="Account balance" />
                            <Input placeholder="Enter Account balance" id="Account balance" :value="accountBal"
                                @input="event => accountBal = event.target.value" type="number" />
                            <ErrorMessage msg="" v-if="!accountBal && formSubmitted" />
                        </div>

                        <div class=""></div>

                        <div class="space-y-8px">
                            <Label label="Account color" />
                            <Input placeholder="Enter Account color" id="Account color" :value="accountColor"
                                @input="event => accountColor = event.target.value" type="color" />
                            <ErrorMessage msg="" v-if="!accountColor && formSubmitted" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="Account Color Name (optional)" />
                            <Input placeholder="Enter Account Color Name" id="Account Color Name (optional)"
                                :value="accountColorName" @input="event => accountColorName = event.target.value" />
                        </div>

                    </div>

                    <button type="submit" class="btn-regular margin-top_24px" :disabled="btnDisabled"
                        @click="editAccount()">Edit
                        Account</button>

                </div>

            </div>

        </ContentSection>


    </Layout>
</template>


<style scoped>
.row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
}

.col-8 {
    width: 75%;
}

.col-2 {
    width: 25%;
}



.search-wrraper input {
    font-size: 14px;
    line-height: 24px;
    color: var(--Grey-90);
    font-family: 'Quicksand', sans-serif;
}

.search-wrraper span {
    height: 100%;
    min-width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.search-wrraper span svg {
    width: 20px;
    height: 20px;
}


.user_pic {
    width: 160px;
    height: 160px;
    border: 1px dashed var(--Grey-50);
    border-radius: 999px;
    margin-left: auto;
    margin-right: 22px;
    position: relative;
}

.pic {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 999px;
    object-fit: cover;
}

.user_pic .add_pic {
    position: absolute;
    bottom: 0;
    right: 8px;
    width: 42px;
    height: 42px;
    background-color: var(--Grey);
    border: 1px dashed var(--Grey-50);
    z-index: 12;
    border-radius: 999px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
}

.user_pic .add_pic input[type=file] {
    opacity: 0;
    width: 100%;
    height: 100%;
    display: none;
}
</style>