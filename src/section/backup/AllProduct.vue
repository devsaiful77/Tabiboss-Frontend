<template lang="html">
    <section
        class="products-section py-30"
        v-if="all_products.latest.length > 0"
    >
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title v2">
                        <div class="wrap">
                            <h2 class="title">All Product</h2>
                            <h4 class="subtitle">Customer Favorite</h4>
                        </div>
                        <div class="tabs-wrapper">
                            <div class="tabs-filter">
                                <ul
                                    class="nav nav-tabs"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li class="nav-item" role="presentation">
                                        <button
                                            class="nav-link"
                                            :class="{
                                                active: activeTab === 'all',
                                            }"
                                            id="all-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#all-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="all-tab-pane"
                                            @click="activeTab = 'all'"
                                        >
                                            All
                                        </button>
                                    </li>

                                    <li class="nav-item" role="presentation">
                                        <button
                                            class="nav-link"
                                            :class="{
                                                active: activeTab === 'latest',
                                            }"
                                            id="latest-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#latest-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="latest-tab-pane"
                                            @click="activeTab = 'latest'"
                                        >
                                            Latest Product
                                        </button>
                                    </li>

                                    <li class="nav-item" role="presentation">
                                        <button
                                            class="nav-link"
                                            :class="{
                                                active:
                                                    activeTab ===
                                                    'best_selling',
                                            }"
                                            id="best-selling-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#best-selling-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="best-selling-tab-pane"
                                            @click="activeTab = 'best_selling'"
                                        >
                                            Best Selling
                                        </button>
                                    </li>

                                    <li class="nav-item" role="presentation">
                                        <button
                                            class="nav-link"
                                            :class="{
                                                active:
                                                    activeTab === 'today_deals',
                                            }"
                                            id="today-deals-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#today-deals-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="today-deals-tab-pane"
                                            @click="activeTab = 'today_deals'"
                                        >
                                            Today Deals
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product content -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="tab-content" id="myTabContent">
                        <!-- All Products -->
                        <div
                            class="tab-pane fade"
                            :class="{ 'show active': activeTab === 'all' }"
                            id="all-tab-pane"
                            role="tabpanel"
                            aria-labelledby="all-tab"
                            tabindex="0"
                        >
                            <div class="products-wrapper">
                                <div class="grid-5">
                                    <template
                                        v-for="item in allProduct"
                                        :key="item.id"
                                    >
                                        <ProductItem
                                            :product="item"
                                            :number="12"
                                            :grid_class="'grid-6'"
                                        />
                                    </template>
                                </div>
                                <div class="all-btn mt-30 text-center">
                                    <router-link
                                        class="btn btn-primary"
                                        to="/products"
                                    >
                                        {{ lang.more_products }}
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <!-- Latest Products -->
                        <div
                            class="tab-pane fade"
                            :class="{ 'show active': activeTab === 'latest' }"
                            id="latest-tab-pane"
                            role="tabpanel"
                            aria-labelledby="latest-tab"
                            tabindex="0"
                        >
                            <div class="products-wrapper">
                                <div class="grid-5">
                                    <template
                                        v-for="item in latestProducts"
                                        :key="item.id"
                                    >
                                        <ProductItem
                                            :product="item"
                                            :number="12"
                                            :grid_class="'grid-6'"
                                        />
                                    </template>
                                </div>
                                <div class="all-btn mt-30 text-center">
                                    <a :href="getUrl('product')" @click.prevent="routerNavigator('all.products')"
                                        class="btn btn-primary"
                                    >
                                        {{ lang.more_products }}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Best Selling -->
                        <div
                            class="tab-pane fade"
                            :class="{
                                'show active': activeTab === 'best_selling',
                            }"
                            id="best-selling-tab-pane"
                            role="tabpanel"
                            aria-labelledby="best-selling-tab"
                            tabindex="0"
                        >
                            <div class="products-wrapper">
                                <div class="grid-5">
                                    <template
                                        v-for="item in bestSellingProducts"
                                        :key="item.id"
                                    >
                                        <ProductItem
                                            :product="item"
                                            :number="12"
                                            :grid_class="'grid-6'"
                                        />
                                    </template>
                                </div>
                                <div class="all-btn mt-30 text-center">
                                    <a :href="getUrl('best-selling/products')" @click.prevent="navigator"
                                        class="btn btn-primary"
                                    >
                                        {{ lang.more_products }}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Today Deals -->
                        <div
                            class="tab-pane fade"
                            :class="{
                                'show active': activeTab === 'today_deals',
                            }"
                            id="today-deals-tab-pane"
                            role="tabpanel"
                            aria-labelledby="today-deals-tab"
                            tabindex="0"
                        >
                            <div class="products-wrapper">
                                <div class="grid-5">
                                    <template
                                        v-for="(item,index) in todayDealsProducts"
                                        :key="index"
                                    >
                                        <ProductItem
                                            :product="item"
                                            :number="12"
                                            :grid_class="'grid-6'"
                                        />
                                    </template>
                                </div>
                                <div class="all-btn mt-30 text-center">
                                    <a :href="getUrl('product')" @click.prevent="routerNavigator('all.products')"
                                        class="btn btn-primary"
                                    >
                                        {{ lang.more_products }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="products-section py-30" v-else-if="show_shimmer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title v2">
                        <div class="wrap">
                            <Shimmer :height="50" />
                        </div>
                        <div class="tabs-wrapper">
                            <div class="tabs-filter">
                                <Shimmer :height="50" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product content -->
            <div class="row">
                <div class="col-lg-12 mb-5">
                    <Shimmer :height="50" />
                </div>

                <div class="grid-5">
                    <a href="javascript:void(0)" v-for="(product, index) in 15">
                        <shimmer :height="364"></shimmer>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import ProductItem from "@/components/Product/Item.vue";
export default {
    components: { Shimmer, ProductItem },
    props: {
        all_products: {
            type: Object,
            default: () => ({
                latest: [],
                best_selling: [],
                today_deals: [],
            }),
        },
    },
    data() {
        return {
            activeTab: "all",
            show_shimmer: true,
        };
    },

    computed: {
        latestProducts() {
            return this.all_products.latest || [];
        },
        bestSellingProducts() {
            return this.all_products.best_selling || [];
        },
        todayDealsProducts() {
            return this.all_products.today_deals || [];
        },


        allProduct() {
            const latest = Array.isArray(this.all_products.latest)
                ? this.all_products.latest
                : [];

            const bestSelling = Array.isArray(this.all_products.best_selling)
                ? this.all_products.best_selling
                : [];

            const todayDeals = Array.isArray(this.all_products.today_deals)
                ? this.all_products.today_deals
                : [];

            const combined = [...latest, ...bestSelling, ...todayDeals];

            const unique = combined.filter(
                (item, index, self) => index === self.findIndex(p => p.id === item.id)
            );

            return unique.slice(0, 20);
        }


    },

    watch: {
        homeResponse() {
            this.checkHomeComponent("all_products");
        },
    },

    methods: {
        checkHomeComponent(component_name) {
            let component = this.homeResponse.find(
                (data) => data == component_name
            );

            if (component) {
                return (this.show_shimmer = false);
            }
        },
    },

    mounted() {
        this.checkHomeComponent("all_products");
    },
};
</script>
