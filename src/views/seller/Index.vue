<template lang="html">
    <div>
        <!-- Breadcrumb Section Start -->
        <section class="breadcrumb-section bg-color py-10">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="breadcrumb-area">
                            <ul class="list">
                                <li @click="navigate('/')" class="linked">
                                    {{ lang.home }}
                                </li>
                                <li>{{ lang.all_seller }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Breadcrumb Section End -->
        <!-- Store Section Start -->
        <section class="store-section pt-40 pb-100" v-if="lengthCounter(sellers) > 0">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Section Title Start -->
                        <div class="section-title">
                            <div class="wrap">
                                <h2 class="title">
                                    {{ lang.all_seller }}
                                </h2>
                            </div>
                            <!-- Custom Dropdown -->
                            <div class="filterRight">
                                <span>{{ lang.sort_by }}</span>
                                <div class="filterOption">
                                    <VueSelect
                                        v-model="filter.sort"
                                        :options="SortByOptions"
                                        :reduce="(option) => option.value"
                                        label="label"
                                        @update:modelValue="filterData"
                                    />
                                </div>
                                <div class="filterOption">
                                    <VueSelect
                                        v-model="filter.paginate"
                                        :options="SortFilter"
                                        :reduce="(option) => option.value"
                                        label="label"
                                        @update:modelValue="filterData"
                                    />
                                </div>
                            </div>
                            <!-- Custom Dropdown -->
                        </div>
                        <!-- Section Title End -->
                    </div>
                </div>
                <div class="row">
                    <div
                        class="col-xl-3 col-lg-4 col-md-4 col-sm-6"
                        v-for="(shop, index) in sellers"
                        :key="index"
                    >
                        <VendorItem :shop="shop" />
                    </div>

                    <div class="col-md-12 text-center">
                        <div class="show-more">
                            <a
                                href="javascript:void(0)"
                                v-if="paginate && !loading"
                                @click="loadSellers()"
                                class="btn btn-primary"
                                >{{ lang.show_more }}</a
                            >
                            <loading_button
                                v-if="loading"
                                :class_name="'btn btn-primary'"
                            ></loading_button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="store-section pt-40 pb-100" v-else>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Section Title Start -->
                        <div class="section-title">
                            <Shimmer :height="50" />
                        </div>
                        <!-- Section Title End -->
                    </div>
                </div>
                <div class="row">
                    <div
                        class="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-4"
                        v-for="(product, index) in 12" :key="index"
                    >
                        <Shimmer :height="300" />
                    </div>

                </div>
            </div>
        </section>
        <!-- Store Section End -->
    </div>
</template>

<script>
import VendorItem from "@/components/Store.vue";
import VueSelect from "vue3-select-component";
import Shimmer from "@/components/Shimmer.vue";

export default {
    data() {
        return {
            loading: false,
            is_shimmer: false,
            rating: 5,
            activeClass: "",
            filter: {
                sort: "newest",
                paginate: 12,
                page: this.$store.state.module.seller_paginate_page,
            },
        };
    },
    mounted() {
        if (this.lengthCounter(this.sellers) == 0) {
            this.loadSellers();
        }
        if (this.lengthCounter(this.sellers) > 0) {
            this.is_shimmer = true;
        }
    },
    computed: {
        baseUrl() {
            return this.$store.getters.getBaseUrl;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },
        sellers() {
            return this.$store.getters.getAllSellers;
        },
        userShop() {
            return this.$store.getters.getShopFollwer;
        },
        paginate() {
            return this.$store.state.module.seller_paginate_url;
        },
    },
    components: {
        VueSelect,
        VendorItem,
        Shimmer,
    },

    methods: {
        loadSellers() {
            let url = this.baseUrl + "/home/sellers";
            this.$progress.start();
            this.loading = true;
            axios
                .get(url, { params: this.filter })
                .then((response) => {
                    this.is_shimmer = true;
                    this.loading = false;
                    if (response.data.error) {
                        
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        this.$store.commit(
                            "getAllSellers",
                            response.data.sellers
                        );
                        // this.next_page_url = response.data.sellers.next_page_url;
                        this.filter.page++;
                        this.$progress.finish();
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    this.is_shimmer = true;
                    

                    this.$toast.error(
                        error.response.statusText,
                        this.lang.Error + " !!"
                    );
                });
        },

        filterData() {
            this.$store.commit("setEmptySeller", []);
            this.filter.page = 1;
            this.loadSellers();
        },
    },
};
</script>
<style lang=""></style>
