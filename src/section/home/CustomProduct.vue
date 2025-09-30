<template lang="html">
    <!-- Deals Section Start -->
    <section class="deals-section pt-60 pb-30" v-if="lengthCounter(custom_products) > 0">
        <div class="container">
            <!-- Section Title Start -->
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <div class="wrap">
                            <h2 class="title">
                               {{ lang.weekly_best_products }}
                            </h2>
                        </div>
                        <div class="section-btn">
                            <a
                                href="javascript:void(0)" @click.prevent="routerNavigator('all.products')"
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
                            :autoplay="{ delay: 3000, disableOnInteraction: false }"
                            :effect="''"
                            :pagination="{ el: '.sale-pagination', clickable: true }"
                            :navigation="{ nextEl: '.product-button-next', prevEl: '.product-button-prev' }"
                            :scrollbar="false"

                            :breakpoints="{
                                479: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
                                767: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 },
                                1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
                                1200: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 }
                            }"
                        >
                            <!-- Loop through the products and render the ProductItem component -->
                            <swiper-slide v-for="item in custom_products" :key="item.id">
                                <ProductItem :product="item" :number="12" :grid_class="'grid-6'" />
                                <!-- <SlideProductItem :item="item" :number="12" :grid_class="'grid-6'" /> -->
                            </swiper-slide>
                        </swiper>
                        <!-- Custom Navigation Start -->
                        <div class="custom-navigation">
                            <div class="product-button-prev swiper-button-prev"><i class="ri-arrow-left-s-line"></i></div>
                            <div class="product-button-next swiper-button-next"><i class="ri-arrow-right-s-line"></i></div>
                        </div>
                        <!-- Custom Navigation End -->

                        <!-- Custom Pagination Outside -->
                        <div class="sale-pagination "></div>
                        <!-- Custom Pagination Outside End -->
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section class="deals-section pt-60 pb-30" v-else-if="show_shimmer">
        <div class="container">
            <!-- Section Title Start -->
            <div class="row mb-3">
                <div class="col-12">
                    <Shimmer :height="50" />
                </div>
            </div>
            <!-- Section Title End -->

            <div class="row">
                <div class="col-lg-3" v-for="(product, index) in 4" :key="index">
                    <Shimmer :height="364" />
                </div>
            </div>
        </div>
    </section>

    <!-- v-else-if="show_shimmer" -->
    <!-- Deals Section End -->
</template>
<script>


import Shimmer from '@/components/Shimmer.vue';
import ProductItem from "@/components/Product/Item.vue";
import { Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y } from 'swiper/modules';

export default {
    props: ["custom_products"],
    components: {
        Shimmer,ProductItem
    },

    data() {
        return {
            show_shimmer: true,
            modules: [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y],
        };
    },
    mounted() {
        this.checkHomeComponent("custom_products");
    },
    watch: {
        homeResponse() {
            this.checkHomeComponent("custom_products");
        },
    },
    computed: {
        products() {
            if (this.best_selling_product && this.best_selling_product.length > 0) {
                return this.best_selling_product;
            } else {
                return [];
            }
        },
    },
    methods: {
        checkHomeComponent(component_name) {
            let component = this.homeResponse.find((data) => data == component_name);

            if (component) {
                return (this.show_shimmer = false);
            }
        },
    },
};
</script>
