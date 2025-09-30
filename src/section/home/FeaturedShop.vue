<template>
  <!-- Vendor Section Start -->
  <section class="vendor-section py-30" v-if="lengthCounter(countShop) > 0">
    <div class="container">
      <!-- Section Title Start -->
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <div class="wrap">
              <h2 class="title">{{ lang.featured_shops }}</h2>
            </div>
          </div>
        </div>
      </div>
      <!-- Section Title End -->
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
                v-for="(shop, i) in featured_shop"
                :key="i"
                :shop="shop"
              >
                <VendorItem :shop="shop" />
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

  <section class="vendor-section py-30" v-else-if="show_shimmer">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-3" v-for="(shop, i) in 4">
          <shimmer :height="225"></shimmer>
        </div>
      </div>
    </div>
  </section>
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

import VendorItem from "@/components/Store.vue";
import Shimmer from "@/components/Shimmer.vue";

export default {
  components: {
    VendorItem,
    Shimmer,
  },

  props: ["featured_shop"],

  data() {
    return {
      show_shimmer: true,
      list_class: "",
      // Swiper Modules
      modules: [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y],
    };
  },

  watch: {
    homeResponse() {
      let component = this.homeResponse.find(
        (data) => data == "featured_sellers"
      );
      if (component) {
        this.show_shimmer = false;
      }
    },
  },

  computed: {
    countShop() {
      if (this.featured_shop && this.featured_shop.length > 0) {
        return this.featured_shop;
      } else {
        return [];
      }
    },
  },
  mounted() {
    let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width > 480) {
      this.list_class = "list-view-tab";
    }
  },
};
</script>
