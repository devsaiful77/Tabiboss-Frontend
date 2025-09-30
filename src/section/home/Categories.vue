<template>
  <!-- Categories Section Start -->
  <section class="categories-section py-30">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <SectionTitle :item="sectionTitleData" />
        </div>
      </div>
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
                v-for="(item, index) in CategoriesLoop"
                :key="index"
              >
                <CategoriesItem :item="item" />
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
  </section>
  <!-- Categories Section End -->
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
import CategoriesItem from "@/components/CategoriesItem.vue";
import SectionTitle from "@/components/SectionTitle.vue";

// Categories Data here
const CategoriesData = ref([
  {
    main_title: "Gaming accessories",
    show_btnTxt: "Show All",

    CategoriesItemData: [
      {
        cata_thumb: "categories/gaming-cata-01.png",
        cata_title: "Game",
        cata_link: "#",
      },
      {
        cata_thumb: "categories/gaming-cata-02.png",
        cata_title: "Headphone",
        cata_link: "#",
      },
      {
        cata_thumb: "categories/gaming-cata-03.png",
        cata_title: "Game Remote",
        cata_link: "#",
      },
      {
        cata_thumb: "categories/gaming-cata-04.png",
        cata_title: "Virtual",
        cata_link: "#",
      },
    ],
  },
  {
    main_title: "Shop deals in Fashion",
    show_btnTxt: "Show All",

    CategoriesItemData: [
      {
        cata_thumb: "categories/fashion-cata-01.png",
        cata_title: "T-shirt",
        cata_link: "#",
      },
      {
        cata_thumb: "categories/fashion-cata-02.png",
        cata_title: "Ladies Hand Bag",
        cata_link: "#",
      },
      {
        cata_thumb: "categories/fashion-cata-03.png",
        cata_title: "Face Cream",
        cata_link: "#",
      },
      {
        cata_thumb: "categories/fashion-cata-04.png",
        cata_title: "Hand Bag",
        cata_link: "#",
      },
    ],
  },
]);

// Section Title Data
const sectionTitleData = ref({
  sec_title: "Popular Categories",
  sec_subtitle: "",
  sec_buttonTxt: "Show All",
  sec_buttonLink: "categories",
});

// Define a reactive variable to hold the loop data
const CategoriesLoop = CategoriesData;

// Swiper Modules
const modules = [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y];
</script>
