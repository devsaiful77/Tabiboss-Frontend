<template lang="html">
    <section
        class="deals-section pt-60 pb-30"
        v-if="lengthCounter(products) > 0"
    >
        <div class="container">
            <!-- Section Title Start -->
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <div
                            class="wrap"
                            v-if="
                                offer_ending_products &&
                                offer_ending_products.length > 0
                            "
                        >
                            <h2 class="title">
                                {{ lang.today_special_deals }}
                            </h2>
                        </div>
                        <div class="section-btn">
                            <a
                                href="javascript:void(0)"
                                @click="navigator"
                                class="solid-btn"
                                >{{ lang.more_products }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Section Title End -->

            <div class="row">
                <div class="col-lg-12">
                    <div class="deals-wrapper" v-if="is_shop">
                        <template
                            v-for="item in products"
                            :key="item.id"
                        >
                            <ProductItem
                                :product="item"
                                :number="12"
                                :grid_class="'grid-6'"
                            />
                        </template>
                    </div>

                    <div class="deals-wrapper" v-else>
                        <div class="promo-banner">
                            <a
                                v-if="urlCheck(offer_ending_banner_url)"
                                :href="offer_ending_banner_url"
                                class="banner-thumb"
                            >
                                <img
                                    :src="offer_ending_banner"
                                    :alt="offer_ending_banner"
                                />
                            </a>

                            <a
                                v-else
                                class="banner-thumb"
                                href="javascript:void(0)"
                            >
                                <img
                                    :src="offer_ending_banner"
                                    :alt="offer_ending_banner"
                                />
                            </a>
                        </div>

                        <template
                            v-for="item in products.slice(0, 6)"
                            :key="item.id"
                        >
                            <ProductItem
                                :product="item"
                                :number="12"
                                :grid_class="'grid-6'"
                            />
                        </template>

                        <div class="promo-banner">
                            <a
                                v-if="urlCheck(offer_ending_banner_url_2)"
                                :href="offer_ending_banner_url_2"
                                class="banner-thumb"
                            >
                                <img
                                    :src="offer_ending_banner_2"
                                    :alt="offer_ending_banner_2"
                                />
                            </a>

                            <a
                                v-else
                                class="banner-thumb"
                                href="javascript:void(0)"
                            >
                                <img
                                    :src="offer_ending_banner_2"
                                    :alt="offer_ending_banner_2"
                                />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <!-- <section v-else-if="lengthCounter(products) == 0"></section> -->

    <section class="deals-section pt-60 pb-30" v-else-if="show_shimmer">
        <div class="container">
            <!-- Section Title Start -->
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <Shimmer :height="50" />
                    </div>
                </div>
            </div>
            <!-- Section Title End -->


            <div class="row">
                <div class="col-md-12">
                    <div class="deals-wrapper">
                        <div class="promo-banner">
                            <a
                                class="banner-thumb"
                                href="javascript:void(0)"
                            >
                                <Shimmer :height="300"/>
                            </a>
                        </div>

                        <template
                            v-for="item in 6"
                            :key="item"
                        >
                            <Shimmer :height="300" />
                        </template>

                        <div class="promo-banner">
                            <a
                                class="banner-thumb"
                                href="javascript:void(0)"
                            >
                                <Shimmer :height="300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import ProductItem from "@/components/Product/Item.vue";
export default {
    components: {
        Shimmer,
        ProductItem,
    },

    data() {
        return {
            window: {
                width: 0,
                height: 0,
            },
            show_shimmer: true,
            is_shop: false,
        };
    },

    mounted() {
        this.checkHomeComponent("offer_ending_soon");
        this.checkShopComponent("offer_ending_soon");
        if (this.$route.name == "shop") {
            this.is_shop = true;
        }
    },
    watch: {
        homeResponse() {
            this.checkHomeComponent("offer_ending_soon");
        },
        shopResponse() {
            this.checkShopComponent("offer_ending_soon");
        },
    },

    props: [
        "offer_ending_products",
        "offer_ending_banner",
        "offer_ending_banner_url",
        "offer_ending_banner_2",
        "offer_ending_banner_url_2",
    ],

    computed: {
        products() {
            if (
                this.offer_ending_products &&
                this.offer_ending_products.length > 0
            ) {
                return this.offer_ending_products;
            } else {
                return [];
            }
        },
    },

    created() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },

    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },

    methods: {
        navigator() {
            if (this.$route.name == "shop") {
                window.scroll(0, 500);
                this.$store.commit("setActiveTab", "product");
            } else {
                this.$router.push({ name: "product.by.offer" });
            }
        },

        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },

        checkHomeComponent(component_name) {

            // console.log(component_name);
            let component = this.homeResponse.find(
                (data) => data == component_name
            );

            if (component) {
                return (this.show_shimmer = false);
            }
        },

        checkShopComponent(component_name) {
            let component = this.shopResponse
                ? this.shopResponse.find((data) => data == component_name)
                : "";

            if (component) {
                return (this.show_shimmer = false);
            }
        },
    },
};
</script>
