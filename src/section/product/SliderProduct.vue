<template>
  <!-- Deals Section Start -->
  <section
    class="deals-section pt-60 pb-30"
    v-if="slider_products && slider_products.length > 0"
  >
    <div class="container">
      <!-- Section Title Start -->
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <div class="wrap">
              <h2 class="title">
                {{ title }}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <!-- Section Title End -->

      <div class="row">
        <div class="col-lg-12">
          <div
            class="product-wrapper position-relative"
            v-if="lengthCounter(products) > 0"
          >
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
              <swiper-slide v-for="item in slider_products" :key="item.id">
                <ProductItem
                  :product="item"
                  :number="12"
                  :grid_class="'grid-6'"
                />
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
  <!-- Deals Section End -->
</template>

<script>
import ProductItem from "@/components/Product/Item.vue";
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
  components: { ProductItem },
  props: ["slider_products", "title"],

  data() {
    return {
      loading: false,
      modules: [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y],
    };
  },

  computed: {
    products() {
      if (this.slider_products && this.slider_products.length > 0) {
        return this.slider_products;
      } else {
        return [];
      }
    },
  },
};
</script>
