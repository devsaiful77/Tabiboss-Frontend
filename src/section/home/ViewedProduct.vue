<template>
    <!-- recently View Section Start -->
    <!-- {{ products }} -->

    <section
        class="recentView-section py-30"
        v-if="lengthCounter(products) > 0"
    >
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- Section Title Start -->
                    <div class="section-title">
                        <div class="wrap">
                            <h2 class="title">
                                {{ lang.recently_viewed }}
                            </h2>
                        </div>
                        <!-- Custom Pagination Outside -->
                        <div class="recent-pagination"></div>
                        <!-- Custom Pagination Outside End -->
                    </div>
                    <!-- Section Title End -->
                </div>
            </div>



            <div class="row">
                <div class="col-12">
                    <div class="vendor-wrapper position-relative">
                        <swiper
                            :modules="modules"
                            :space-between="16"
                            :slides-per-view="'auto'"
                            :autoplay="{
                                delay: 3000,
                                disableOnInteraction: false,
                                 pauseOnMouseEnter: true,
                            }"
                            :effect="''"
                            :pagination="{
                                el: '.recent-pagination',
                                clickable: true,
                            }"
                            :scrollbar="false"
                            :breakpoints="{
                                479: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetween: 16,
                                },
                                767: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetween: 16,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                    spaceBetween: 16,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 4,
                                    spaceBetween: 16,
                                },
                            }"
                        >
                            <!-- Loop through the products and render the component -->
                            <swiper-slide
                                v-for="(product, index) in products"
                                :key="index"
                            >
                                <div
                                    class="recentViewItem"
                                >
                                    <div class="recentViewItem-thumb">
                                        <a :href="getUrl('product/'+product.slug)" @click.prevent="routerNavigator('product.details',product.slug)" class="thumb-inner">
                                            <img
                                                :src="product.image_72x72" :alt="product.product_name"
                                            />
                                        </a>
                                    </div>
                                    <div class="recentViewItem-content">
                                        <Rating :rating="product.rating" rating_type="view_product" />
                                        <span class="price">
                                            <del v-if="product.special_discount_check > 0"
                                                >{{ priceFormat(product.price) }}
                                            </del>

                                            <span v-if="product.special_discount_check > 0">
                                                {{ priceFormat(product.discount_percentage) }}
                                            </span>
                                            <span v-else>{{ priceFormat(product.price) }}</span>
                                        </span>
                                        <h5 class="title ">
                                            <a class=" text-ellips-2" href="#">{{ product.product_name }}</a>
                                        </h5>
                                    </div>
                                </div>
                                <!-- Recent View Item -->
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- recently View Section End -->
</template>

<script>
import {
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
    EffectFade,
    A11y,
} from "swiper/modules";

import RecentViewItem from "@/components/RecentViewItem.vue";
import Rating from "@/components/product/Rating.vue";

export default {
    components: {
        RecentViewItem,
        Rating
    },

    data() {
        return {
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

    computed: {
        products() {
            return this.$store.getters.getViewedProducts;
        },
    },
};
</script>
