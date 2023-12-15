<script>
import Layout from '../../components/Layout.vue';
import Card from './subcomponents/Card.vue';
import Chart1 from './chart/Chart1.vue';

export default {
    components: { Layout, Card, Chart1 },
    data() {
        return {
            atm: [
                {
                    card_no: "4242 4242 4242 4242",
                    card_color: "#e9e7e5",
                    card_balnce: "32000",
                    bank: "sbi"
                }
            ],
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Today',
                        backgroundColor: '#f87',
                        data: [40, 39, 10, 40, 39, 800, 40]
                    },
                    {
                        label: 'This Week',
                        backgroundColor: '#f82',
                        data: [400, 12, 90, 120, 60, 80, 40]
                    },
                    {
                        label: 'This Month',
                        backgroundColor: '#f29',
                        data: [20, 120, 160, 180, 90, 20, 220]
                    }
                ],
            },
        }
    },
}
</script>


<template>
    <Layout>


        <div class="space-y-8px">

            <div class="display-grid grid-cols-3 gap-12px">

                <div class="bg-white rounded-regualr border border-solid border-Grey_20 padding-y_24px padding-x_32px">

                    <div class="space-y-16px">

                        <h4 class="text-large_semibold color-Grey_90">My Card</h4>

                        <Card :list="atm" />

                    </div>

                </div>

                <div
                    class="col-span-2 bg-white rounded-regualr border border-solid border-Grey_20 padding-y_24px padding-x_32px">

                    <div class="space-y-16px display-flex align-end justify-end flex-column">

                        <div class="display-flex align-center justify-between w-100 gap-12px">

                            <h4 class="text-large_semibold color-Grey_90">My Funds</h4>

                            <ul class="tab-list mb-0">
                                <li class="tab-items">
                                    <button class="tab-button active-tab-button" data-tab="inventory_list">Today</button>
                                </li>
                                <li class="tab-items">
                                    <button class="tab-button " data-tab="locations">This Week</button>
                                </li>
                                <li class="tab-items">
                                    <button class="tab-button" data-tab="Transfers">This Month</button>
                                </li>
                            </ul>

                        </div>

                        <Chart1 :chartData="chartData" />

                    </div>

                </div>

            </div>


            <div class="bg-white rounded-regualr border border-solid border-Grey_20 padding-y_24px padding-x_32px">



            </div>

        </div>

    </Layout>
</template>

<style scoped>
.tab-button.active-tab-button {
    background-color: var(--Grey-5) !important;
    border-color: var(--Grey-20) !important;
}
</style>