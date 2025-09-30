<template>
    <!-- Vendor Section Start -->
    <section class="vendor-section py-30">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <SectionTitle :item="sectionTitleData" />
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
                                el: '.custom-pagination',
                                clickable: true,
                            }"
                            :navigation="{
                                nextEl: '.vendor-button-next',
                                prevEl: '.vendor-button-prev',
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
                                v-for="(item, index) in VendorLoop"
                                :key="index"
                            >
                                <VendorItem :items="item" />
                            </swiper-slide>
                        </swiper>
                        <!-- Custom Navigation Start -->
                        <div class="custom-navigation">
                            <div class="vendor-button-prev swiper-button-prev">
                                <i class="ri-arrow-left-s-line"></i>
                            </div>
                            <div class="vendor-button-next swiper-button-next">
                                <i class="ri-arrow-right-s-line"></i>
                            </div>
                        </div>
                        <!-- Custom Navigation End -->

                        <!-- Custom Pagination Outside -->
                        <div class="custom-pagination"></div>
                        <!-- Custom Pagination Outside End -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Vendor Section End -->
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
import VendorItem from "@/components/VendorItem.vue";
import SectionTitle from "@/components/SectionTitle.vue";

// Sample Vendor Data
const VendorData = ref([
    {
        vendor_title: "Apple Gadget",
        vendor_item: "4 Products",
        vendor_thumb: "vendor/vendor-01.jpg",

        VendorSingleData: [
            {
                vendor_thumb: "vendor/vendor-gadget-01.jpg",
                vendor_link: "#",
            },
            {
                vendor_thumb: "vendor/vendor-gadget-02.jpg",
                vendor_link: "#",
            },
            {
                vendor_thumb: "vendor/vendor-gadget-03.jpg",
                vendor_link: "#",
            },
            {
                vendor_thumb: "vendor/vendor-gadget-04.jpg",
                vendor_link: "#",
            },
        ],
    },
    {
        vendor_title: "Grocery Shop BD",
        vendor_item: "4 Products",
        vendor_thumb: "vendor/vendor-02.jpg",

        VendorSingleData: [
            {
                vendor_thumb: "vendor/vendor-grocery-01.jpg",
                vendor_link: "#",
            },
            {
                vendor_thumb: "vendor/vendor-grocery-02.jpg",
                vendor_link: "#",
            },
            {
                vendor_thumb: "vendor/vendor-grocery-03.jpg",
                vendor_link: "#",
            },
            {
                vendor_thumb: "vendor/vendor-grocery-04.jpg",
                vendor_link: "#",
            },
        ],
    },
]);

// Section Title Data
const sectionTitleData = ref({
    sec_title: "Weekly Top Vendor",
    sec_subtitle: "",
    sec_buttonTxt: "",
    sec_buttonLink: "",
});

// Define a reactive variable to hold the loop data
const VendorLoop = VendorData;

// Swiper Modules
const modules = [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y];
</script>
