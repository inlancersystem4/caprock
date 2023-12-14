<script>
export default {
    props: {
        list: Array
    }
}
</script>

<template>
    <div class="card" v-for="item in list" :key="item.card_color" :style="{ 'backgroundColor': item.card_color }">

        <div>
            <h4 class="text-large_semibold color-Grey_90">{{ item.card_no }}</h4>
            <p class="text-base_medium text-capitalize color-Grey_50">card number</p>
        </div>

        <div class="display-flex align-end justify-between w-100">

            <div>
                <h4 class="text-large_semibold color-Grey_90">₹{{ item.card_balnce }}</h4>
                <p class="text-base_medium text-capitalize color-Grey_50">card balance</p>
            </div>


            <div class="card_img">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/2048px-SBI-logo.svg.png"
                    class="object-contain w-100">
            </div>

        </div>

    </div>
</template>

<style scoped>
.card {
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid transparent;
    background-image: url("../../../assets/img/world_map.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    min-height: 230px;
    max-height: 230px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.card_img {
    width: auto;
    height: 42px;
    position: relative;
}

.card_img img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>