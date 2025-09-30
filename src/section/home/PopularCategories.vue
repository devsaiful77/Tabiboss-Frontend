<template>
    <!-- Categories Section Start -->
    <section class="categories-section py-30">
        <div class="container" v-if="lengthCounter(countCategories) > 0">
            <!-- Section Title Start -->
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <div class="wrap">
                            <h2 class="title">
                                {{ lang.popular_categories }}
                            </h2>
                        </div>
                        <div class="section-btn">
                            <a
                                :href="getUrl('categories')"
                                @click.prevent="
                                    routerNavigator('categories', null)
                                "
                                class="solid-btn"
                                >{{ lang.browse_all_categories }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Section Title End -->

            <div class="row">
                <div class="col-12">
                    <div class="categories-wrapper position-relative">
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
                                el: '.custom-pagination',
                                clickable: true,
                            }"
                            :navigation="{
                                nextEl: '.product-button-next',
                                prevEl: '.product-button-prev',
                            }"
                            :scrollbar="false"
                            :breakpoints="{
                                575: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetween: 16,
                                },
                                991: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                    spaceBetween: 16,
                                },
                                1199: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 4,
                                    spaceBetween: 16,
                                },
                            }"
                        >
                            <swiper-slide
                                v-for="(category, index) in popular_categories"
                                :key="index"
                            >
                                <!-- categories Item Start -->
                                <div class="categoriesItem p-3">
                                    <CategoryItem :category="category" />
                                </div>
                                <!-- categories Item End -->
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
                    </div>
                </div>
            </div>
        </div>

        <!-- with shimmer -->
        <div class="container" v-else-if="show_shimmer">
            <!-- Section Title Start -->
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <shimmer class="mb-3" :height="50"></shimmer>
                    </div>
                </div>
            </div>
            <!-- Section Title End -->

            <div class="row">
                <div class="col-12">
                    <div class="categories-wrapper">
                        <div class="row">
                            <div
                                v-for="(campaign, index) in 4"
                                :key="index"
                                class="col-md-3"
                            >
                                <div class="categoriesItem p-3">
                                    <a href="javascript:void(0)">
                                        <shimmer
                                            class="mb-3"
                                            :height="200"
                                        ></shimmer>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Categories Section End -->
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
import CategoryItem from "@/components/CategoryWithSubCategory.vue";
import Shimmer from "@/components/Shimmer.vue";
export default {
    props: ["popular_categories"],
    components: { CategoryItem, Shimmer },
    data() {
        return {
            show_shimmer: false,
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
        this.checkHomeComponent("popular_category");
    },

    watch: {
        homeResponse() {
            this.checkHomeComponent("popular_category");
        },
    },
    computed: {
        countCategories() {
            if (this.popular_categories && this.popular_categories.length > 0) {
                return this.popular_categories;
            } else {
                return [];
            }
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
};
</script>
