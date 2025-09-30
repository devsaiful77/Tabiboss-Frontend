<template>
    <!-- Deals Section Start -->
    <section
        class="deals-section pt-60 pb-30"
        v-if="lengthCounter(products) > 0"
    >
        <div class="container">
            <!-- Section Title Start -->
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <div class="wrap">
                            <h2 class="title">
                                {{ lang.new_arrival }}
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
                    <div class="product-wrapper position-relative">
                        <swiper
                            :modules="modules"
                            :space-between="24"
                            :slides-per-view="'auto'"
                            :autoplay="{
                                delay: 3000,
                                disableOnInteraction: false,
                            }"
                            :effect="''"
                            :pagination="{
                                el: '.sale-pagination',
                                clickable: true,
                            }"
                            :navigation="{
                                nextEl: '.product-button-next',
                                prevEl: '.product-button-prev',
                            }"
                            :scrollbar="false"
                            :breakpoints="{
                                479: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetween: 20,
                                },
                                767: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 4,
                                    spaceBetween: 20,
                                },
                                1200: {
                                    slidesPerView: 5,
                                    slidesPerGroup: 5,
                                    spaceBetween: 20,
                                },
                            }"
                        >
                            <!-- Loop through the products and render the ProductItem component -->
                            <swiper-slide
                                v-for="item in products"
                                :key="item.id"
                            >
                                <ProductItem
                                    :product="item"
                                    :number="12"
                                    :grid_class="'grid-6'"
                                />
                                <!-- <SlideProductItem :item="item" :number="12" :grid_class="'grid-6'" /> -->
                            </swiper-slide>
                        </swiper>
                        <!-- Custom Navigation Start -->
                        <div class="custom-navigation">
                            <div class="product-button-prev swiper-button-prev">
                                <i class="ri-arrow-left-s-line"></i>
                            </div>
                            <div class="product-button-next swiper-button-next">
                                <i class="ri-arrow-right-s-line"></i>
                            </div>
                        </div>
                        <!-- Custom Navigation End -->

                        <!-- Custom Pagination Outside -->
                        <div class="sale-pagination"></div>
                        <!-- Custom Pagination Outside End -->
                    </div>
                </div>
            </div>
        </div>
    </section>

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
                <div class="col-lg-12">
                    <div class="deals-wrapper">
                        <template v-for="(product, index) in 5" :key="index">
                            <Shimmer :height="364" />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Deals Section End -->
</template>

<script>
import ProductItem from "@/components/Product/Item.vue";
import Shimmer from "@/components/Shimmer.vue";
// import Product

// Import Swiper core and required modules
import {
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
    EffectFade,
    A11y,
} from "swiper/modules";

export default {
    components: { ProductItem, Shimmer },
    props: ["new_arrival"],

    data() {
        return {
            show_shimmer: true,
            modules: [
                Autoplay,
                Navigation,
                Pagination,
                Scrollbar,
                EffectFade,
                A11y,
            ],
        };
    },

    mounted() {
        this.checkShopComponent("new_arrival");
    },
    watch: {
        shopResponse() {
            this.checkShopComponent("new_arrival");
        },
    },
    computed: {
        products() {
            if (this.new_arrival && this.new_arrival.length == 0) {
                return ["id"];
            } else if (this.new_arrival && this.new_arrival.length > 0) {
                return this.new_arrival;
            } else {
                return [];
            }
        },
    },
    methods: {
        navigator() {
            window.scroll(0, 500);
            this.$store.commit("setActiveTab", "product");

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
