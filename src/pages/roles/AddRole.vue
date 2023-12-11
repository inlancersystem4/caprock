<script>
import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection2.vue';
import Label from '../../subcomponents/common/Label.vue';
import Input from '../../subcomponents/common/Input.vue';
import ErrorMessage from '../../subcomponents/common/ErrorMessage.vue';
import MultiSelect from '../../subcomponents/common/MultiSelect.vue';

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, Label, Input, ErrorMessage, MultiSelect },
    computed: {
        btnDisabled() {
            return !this.roleName.trim() || !this.selectedModuleName
        },
        filteredPermissions() {
            return (moduleId) => {
                return this.permissionsList.filter(list => list.module === moduleId);
            };
        },
    },
    data() {
        return {
            formSubmitted: false,
            roleName: "",
            selectedModule: "",
            selectedModuleName: "",
            joinedPermissions: "",
            moduleList: [],
            permissionsList: [],
            checkedPermissions: [],
        }
    },
    created() {
        this.featchModuleList();
    },
    methods: {
        async featchModuleList() {
            var role_data = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/module-list`, role_data);
                this.moduleList = response.data;

            } catch (error) {
                console.log(error);
            }
        },
        async featchPermissionsList() {
            var role_data = new FormData();
            role_data.append("module_name", this.selectedModuleName)

            try {
                const response = await fetchWrapper.post(`${baseUrl}/permission-list`, role_data);
                this.permissionsList = response.data;

            } catch (error) {
                console.log(error);
            }
        },
        selectedMulti(data) {
            this.selectedModule = data.map(item => item.module_id).join(',');
            this.selectedModuleName = data.map(item => item.module_name).join(',');
            this.featchPermissionsList();
        },
        isChecked(permissionId) {
            return this.checkedPermissions.includes(permissionId)
        },
        updatePermission(permissionId, checked) {
            if (checked) {
                this.checkedPermissions.push(permissionId);
            } else {
                const index = this.checkedPermissions.indexOf(permissionId);
                if (index !== -1) {
                    this.checkedPermissions.splice(index, 1);
                }
            }
        },
        async addRole() {
            this.joinedPermissions = Object.values(this.checkedPermissions);

            var role_data = new FormData();
            role_data.append("role_id", "");
            role_data.append("role_name", this.roleName);
            role_data.append("role_module", this.selectedModule);
            role_data.append("role_permission", this.joinedPermissions.join(','));

            try {
                const data = await fetchWrapper.post(`${baseUrl}/role-add-or-edit`, role_data);

                if (data.success === 1) {
                    this.$router.push({ name: 'Roles' });
                }

            }
            catch (error) {
                console.log(error);
            }

        }
    },
};
</script>

<template>
    <Layout>

        <ContentSection title="Add Role">

            <div class="col-8">

                <div class="address-form">

                    <div class="space-y-8px">
                        <Label label="Role Name" />
                        <Input placeholder="Enter Role Name" id="Role Name" :value="roleName"
                            @input="event => roleName = event.target.value" />
                        <ErrorMessage msg="" v-if="!roleName && formSubmitted" />
                    </div>

                    <div></div>

                    <div class="space-y-8px">
                        <Label label="Select Module" />
                        <MultiSelect :options="moduleList" @option-selected="selectedMulti" />
                    </div>

                    <div></div>

                    <div class="space-y-8px col-span-2" v-if="selectedModuleName">
                        <Label label="Add Permissions" />

                        <div class="display-flex align-center gap-24px margin-top_12px" v-for="(item, index) in moduleList"
                            :key="index">

                            <ul class=" display-flex  align-center gap-24px">

                                <p class=" text-base_semibold text-capitalize w_160px"> {{ item.module_name }} Permissions:-
                                </p>

                                <div v-for="(list, Permissionsindex) in filteredPermissions(item.module_id)"
                                    :key="Permissionsindex">
                                    <div class="custom-toogle-btn display-flex align-center gap-8px">
                                        <input type="checkbox" class="form-toogle-btn"
                                            :id="'checkbox_' + item.module_id + '_' + list.permission_id"
                                            :checked="isChecked(list.permission_id)"
                                            @change="updatePermission(list.permission_id, $event.target.checked)">
                                        <label
                                            class="text-capitalize text-large_semibold color-Grey_90 cursor-pointer img-not-selected"
                                            :for="'checkbox_' + item.module_id + '_' + list.permission_id">
                                            {{ list.permission_name }}
                                        </label>
                                    </div>
                                </div>

                            </ul>

                        </div>

                    </div>

                </div>

                <button type="submit" class="btn-regular margin-top_24px" :disabled="btnDisabled" @click="addRole">Add
                    User</button>

            </div>

        </ContentSection>

    </Layout>
</template>

<style scoped>
.col-8 {
    width: 80%;
}

.w_160px {
    width: 160px;
}
</style>