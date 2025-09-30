<template>
  <!-- Deals Section Start -->
  <section class="deals-section pt-60 pb-30" v-if="lengthCounter(products) > 0">
    <div class="container">
      <!-- Section Title Start -->
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <div class="wrap">
              <h2 class="title">
                {{ lang.today_deals }}
              </h2>
            </div>
            <div class="section-btn">
              <a
                :href="getUrl('daily-deals')"
                @click.prevent="routerNavigator('daily.deals')"
                class="solid-btn"
                >{{ lang.more_products }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Section Title End -->

      <div class="row">
        <div class="col-lg-12">
          <div class="product-wrapper position-relative" :dir="dir">
            <swiper
              :modules="modules"
              :space-between="24"
              :slides-per-view="'auto'"
              :rtl="dir === 'rtl'"
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
              <!-- Loop through the products and render the ProductItem component today_deals -->
              <swiper-slide v-for="item in today_deals" :key="item.id">
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

            <div class="sale-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Deals Section End -->

  <section v-else-if="lengthCounter(products) == 0"></section>

  <section class="deals-section pt-60 pb-30" v-else-if="show_shimmer">
    <div class="container">
      <!-- Section Title Start -->
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <Shimmer :height="50" />
          </div>
        </div>
      </div>
      <!-- Section Title End -->

      <div class="row">
        <div class="grid-5">
          <a href="javascript:void(0)" v-for="(product, index) in 5">
            <shimmer :height="364"></shimmer>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from "@/components/Product/Item.vue";
import Shimmer from "@/components/Shimmer.vue";

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
  components: { ProductItem, Shimmer },
  props: ["today_deals"],

  data() {
    return {
      dir: "ltr", // or 'rtl'
      show_shimmer: true,
      modules: [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y],
    };
  },

  computed: {
    products() {
      if (this.today_deals && this.today_deals.length > 0) {
        return this.today_deals;
      } else {
        return [];
      }
    },

    paddedTodayDeals() {
      const minCount = 10;
      const realDeals = this.today_deals || [];
      const padded = [];

      let i = 0;
      while (padded.length < minCount) {
        const deal = realDeals[i % realDeals.length];
        padded.push({
          ...deal,
          isRepeated: i >= realDeals.length, // optional flag
        });
        i++;
      }

      return padded;
    },
  },

  methods: {
    navigator() {
      if (this.$route.name == "shop") {
        window.scroll(0, 500);
        this.$store.commit("setActiveTab", "product");
      } else {
        this.$router.push({ name: "product.by.selling" });
      }
    },
    checkHomeComponent(component_name) {
      let component = this.homeResponse.find((data) => data == component_name);

      if (component) {
        return (this.show_shimmer = false);
      }
    },
  },

  watch: {
    homeResponse() {
      this.checkHomeComponent("todays_deal");
    },
  },

  mounted() {
    this.checkHomeComponent("todays_deal");
  },
};
</script>
