<template>
  <!-- Flash Sale Section Start -->

  <section class="sale-section pt-30 pb-60" v-if="lengthCounter(products) > 0">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- Section Title Start -->
          <div class="section-title countdown">
            <div class="wrap">
              <h2 class="title">
                <img :src="static_image_url + 'flash.svg'" alt="Flash Sale" />
                {{ lang.flash_sale }}
              </h2>
              <h4 class="subtitle">Limited time</h4>
              <CountDown :deadline="firstProductDeadline" />
            </div>
            <div class="section-btn">
              <a
                :href="getUrl('flash-sale')"
                @click.prevent="routerNavigator('flash.sale')"
                class="solid-btn"
                >{{ lang.more_products }}</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- products -->
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
              :navigation="{
                nextEl: '.product-button-next',
                prevEl: '.product-button-prev',
              }"
              :scrollbar="false"
              :breakpoints="{
                479: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
                767: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
                1200: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 },
              }"
            >
              <swiper-slide v-for="item in products" :key="item.id">
                <ProductItem
                  :product="item"
                  :number="12"
                  :grid_class="'grid-6'"
                />
              </swiper-slide>
            </swiper>
            <div class="custom-navigation">
              <div class="product-button-prev swiper-button-prev">
                <i class="ri-arrow-left-s-line"></i>
              </div>
              <div class="product-button-next swiper-button-next">
                <i class="ri-arrow-right-s-line"></i>
              </div>
            </div>

            <div class="sale-pagination"></div>
          </div>
        </div>
      </div>
      <!-- products -->
    </div>
  </section>
  <!-- Flash Sale Section Start -->
</template>

<script>
import CountDown from "@/components/CountDown.vue";
import ProductItem from "@/components/Product/Item.vue";

import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  EffectFade,
  A11y,
} from "swiper/modules";

export default {
  props: ["flash_products"],
  components: { CountDown, ProductItem },

  data() {
    return {
      dir: "ltr", // or 'rtl'
      loading: true,
      show_shimmer: true,
      static_image_url: this.getUrl("frontends/images/"),
      modules: [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y],
    };
  },
  mounted() {
    this.checkHomeComponent("flash_deal");
  },
  watch: {
    homeResponse() {
      this.checkHomeComponent("flash_deal");
    },
  },
  computed: {
    products() {
      if (this.flash_products && this.flash_products.length > 0) {
        return this.flash_products;
      } else {
        return [];
      }
    },

    // formattedDeadline() {
    //     const deadlineDate = new Date(this.flash_products[0].end_date);
    //     deadlineDate.setHours(23, 59, 59);
    //     return deadlineDate.toISOString().slice(0, 19).replace("T", " ");
    // },

    firstProductDeadline() {
      if (!this.flash_products || !this.flash_products.length) return null;
      const deadlineDate = new Date(this.flash_products[0].end_date);
      deadlineDate.setHours(23, 59, 59);
      return deadlineDate.toISOString().slice(0, 19).replace("T", " ");
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
