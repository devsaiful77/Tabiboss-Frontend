<template>
    <!-- recently View Section Start -->
    <section class="recentView-section py-30">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- Section Title Start -->
                    <div class="section-title">
                        <div class="wrap">
                            <h2 class="title" v-if="sectionTitleData.sec_title">
                                {{ sectionTitleData.sec_title }}
                            </h2>
                            <h4
                                class="subtitle"
                                v-if="sectionTitleData.sec_subtitle"
                                v-html="sectionTitleData.sec_subtitle"
                            ></h4>
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
                                v-for="(item, index) in RecentViewLoop"
                                :key="index"
                            >
                                <RecentViewItem :item="item" />
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- recently View Section End -->
</template>

<script setup>
import { ref } from "vue";
// Import Swiper core and required modules
import {
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
    EffectFade,
    A11y,
} from "swiper/modules";

// Import Own components
import RecentViewItem from "@/components/RecentViewItem.vue";

// Sample Recent View Data
const RecentViewData = ref([
    {
        title: "Foyshal Ahmed",
        price: 40.0,
        discount: 79.99,
        ratingTxt: "Reviews",
        totalRating: 2,
        thumb: "recent-view/recent-01.png",
    },
    {
        title: "Foyshal Ahmed",
        price: 40.0,
        discount: 79.99,
        ratingTxt: "Reviews",
        totalRating: 2,
        thumb: "recent-view/recent-02.png",
    },
    {
        title: "Foyshal Ahmed",
        price: 40.0,
        discount: 79.99,
        ratingTxt: "Reviews",
        totalRating: 2,
        thumb: "recent-view/recent-03.png",
    },
]);

// Section Title Data
const sectionTitleData = ref({
    sec_title: "Recently Viewed",
    sec_subtitle: "",
    sec_buttonTxt: "",
    sec_buttonLink: "",
});

// Define a reactive variable to hold the loop data
const RecentViewLoop = RecentViewData;

// Swiper Modules
const modules = [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y];
</script>
