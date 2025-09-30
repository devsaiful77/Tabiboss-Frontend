<template>
    <!-- Blog Section Start -->
    <section class="blog-section py-30">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <SectionTitle :item="sectionTitleData" />
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="blog-wrapper position-relative">
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
                                el: '.blog-pagination',
                                clickable: true,
                            }"
                            :navigation="{
                                nextEl: '.blog-button-next',
                                prevEl: '.blog-button-prev',
                            }"
                            :scrollbar="false"
                            :breakpoints="{
                                479: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetween: 20,
                                },
                                767: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                    spaceBetween: 20,
                                },
                                1200: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                    spaceBetween: 20,
                                },
                            }"
                        >
                            <!-- Loop through the blog posts and render the BlogItem component -->
                            <swiper-slide
                                v-for="(item, index) in blogPostLoop"
                                :key="index"
                            >
                                <BlogItem :blog="item" />
                            </swiper-slide>
                        </swiper>
                        <!-- Custom Navigation Start -->
                        <div class="custom-navigation">
                            <div class="blog-button-prev swiper-button-prev">
                                <i class="ri-arrow-left-s-line"></i>
                            </div>
                            <div class="blog-button-next swiper-button-next">
                                <i class="ri-arrow-right-s-line"></i>
                            </div>
                        </div>
                        <!-- Custom Navigation End -->

                        <!-- Custom Pagination Outside -->
                        <div class="blog-pagination"></div>
                        <!-- Custom Pagination Outside End -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Blog Section End -->
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

// Import components
import BlogItem from "@/components/BlogItem.vue";
import SectionTitle from "@/components/SectionTitle.vue";

// Blog Post Data Here
const blogPostData = ref([
    {
        blog_title:
            "The US government is sending its first high level delegation to China since a",
        blog_thumb: "blog/blog-01.jpg",
        blog_date: "24 Oct 2024",
        blog_author: "Joseph",
        blog_BtnText: "Read More",
        blog_Btnlink: "#",
        blog_categories: ["Cosmetic", "Fashion"],
    },
    {
        blog_title:
            "The US government is sending its first high level delegation to China since a",
        blog_thumb: "blog/blog-02.jpg",
        blog_date: "24 Oct 2024",
        blog_author: "Joseph",
        blog_BtnText: "Read More",
        blog_Btnlink: "#",
        blog_categories: ["Cosmetic", "Fashion"],
    },
]);

// Section Title Data
const sectionTitleData = ref({
    sec_title: "Our Blog",
    sec_subtitle: "",
    sec_buttonTxt: "See All",
    sec_buttonLink: "blog",
});

// Define a reactive variable to hold the loop data
const blogPostLoop = blogPostData;

// Swiper Modules
const modules = [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y];
</script>
