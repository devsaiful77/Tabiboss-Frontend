<template>
  <!-- Brands Section Start -->
  <section class="brands-section py-30" v-if="countBrand > 0">
    <div class="container">
      <!-- Section Title Start -->
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <div class="wrap">
              <h2 class="title">{{ lang.popular_brand }}</h2>
            </div>
            <div class="section-btn">
              <router-link
                :to="{ name : 'brands' }"
                class="solid-btn"
                >{{ lang.browse_all_brands }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Section Title End -->

      <div class="row">
        <div class="col-12">
          <div class="product-wrapper position-relative">
            <swiper
              :modules="modules"
              :space-between="24"
              :slides-per-view="'auto'"
              :autoplay="{ delay: 3000, disableOnInteraction: false }"
              :effect="''"
              :navigation="{ nextEl: '.brand-next', prevEl: '.brand-prev' }"
              :scrollbar="false"
              :breakpoints="{
                200: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
                479: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 },
                767: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 30 },
                1199: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 30 },
                1439: { slidesPerView: 7, slidesPerGroup: 7, spaceBetween: 40 },
              }"
            >
              <!-- Loop through the products and render the ProductItem component -->
              <swiper-slide v-if="countBrand > 0" v-for="(brand,index) in brands" :key="index">
                <!-- Brand Item Start -->
                <!-- <router-link :class="['brandItem', loading ? 'skeleton' : '']" :to="{ name: 'brandDetails' }"> -->
                <a :class="['brandItem']" :href="getUrl('brand/'+brand.slug)" @click.prevent="routerNavigator('product.by.brand',brand.slug)">
                  <div class="brandItem-thumb">
                    <img :src="brand.image_130x93" :alt="brand.title">
                  </div>
                  <div class="brandItem-content">
                    <h4 class="title">{{ brand.title }}</h4>
                  </div>
                </a>
                <!-- Brand Item End -->
              </swiper-slide>
            </swiper>
            <!-- Custom Navigation Start -->
            <div class="custom-navigation">
              <div class="brand-prev swiper-button-prev">
                <i class="ri-arrow-left-s-line"></i>
              </div>
              <div class="brand-next swiper-button-next">
                <i class="ri-arrow-right-s-line"></i>
              </div>
            </div>
            <!-- Custom Navigation End -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Brands Section Start -->

  <section class="brands-section py-30" v-else-if="show_shimmer">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex">
            <div v-for="(attr, i) in 6" :key="'static' + i">
              <a href="#">
                <shimmer :height="100"></shimmer>
              </a>
            </div>
          </div>
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
import Shimmer from "@/components/Shimmer.vue";

export default {
  components: { Shimmer },
  props: ["brands"],
  data() {
    return {
      modules: [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y],
      show_shimmer: true,
    };
  },

  mounted() {
    this.checkHomeComponent("popular_brands");
  },
  watch: {
    homeResponse() {
      this.checkHomeComponent("popular_brands");
    },
  },
  computed: {
    countBrand() {
      return this.lengthCounter(this.brands);
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
