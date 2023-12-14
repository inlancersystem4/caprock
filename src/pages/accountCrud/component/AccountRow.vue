<script>
export default {
    props: {
        list: Array,
    },
    methods: {
        deleteItem(id) {
            this.$emit('delete_item', id)
        },
        editItem(id) {
            this.$emit('edit_item', id)
        },
        editStatus(id) {
            this.$emit('edit_status', id)
        }
    },
}
</script>

<template>
    <tr v-for="(items, index) in list" :key="index">
        <td class="count">
            <p class="gap-8px text-base_semibold color-Grey_90">{{ index + 1 }}</p>
        </td>
        <td class="account_name">
            <div class="display-flex align-center gap-14px">
                <p class="text-base_semibold color-Grey_90">{{ items.a_name }}</p>
            </div>
        </td>
        <td class="account_balance">
            <p class="text-base_semibold color-Grey_90">₹{{ items.a_balance }}</p>
        </td>
        <td class="account_color">
            <p class="text-base_semibold color-Grey_90">{{ items.a_color }}</p>
        </td>
        <td class="blank"></td>
        <td class="user-status">
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.a_status === true">
                <div class="ellipse-dot bg-emerald"></div>
                <p class="text-sm_medium color-Grey_60">Enable</p>
            </button>
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.a_status === false">
                <div class="ellipse-dot bg-rose"></div>
                <p class="text-sm_medium color-Grey_60">Disable</p>
            </button>
        </td>
        <td class="dropdown">
            <div class="icon-btn icon-btn_32px  custom-dropdown">
                <img src="../../../assets/img/icons/dots-icon.svg">
                <ul class="custom-dropdown-list leftside icon-dropdown">
                    <li class="dropdown-item" @click="editItem(items.a_id)">
                        <div class="dropdown-link">
                            <img src="../../../assets/img/icons/edit.svg">
                            <p class="dropdown-link-title"> Edit Account </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="deleteItem(items.a_id)">
                        <div class="dropdown-link">
                            <img src="../../../assets/img/icons/trash.svg">
                            <p class="dropdown-link-title required"> Delete Account </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.a_id)" v-if="items.a_status === false">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Enable </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.a_id)" v-if="items.a_status === true">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Disable </p>
                        </div>
                    </li>
                </ul>
            </div>
        </td>
    </tr>
</template>

<style scoped>
tr {
    display: flex;
    gap: 24px;
    align-items: center;
}

tr:nth-last-child(1) .custom-dropdown-list,
tr:nth-last-child(2) .custom-dropdown-list,
tr:nth-last-child(3) .custom-dropdown-list {
    top: auto;
    bottom: 90%;
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

.custom-dropdown:hover .custom-dropdown-list {
    display: block;
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