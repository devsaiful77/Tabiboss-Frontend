<template>
  <!-- Deals Section Start -->
  <section class="deals-section pt-60 pb-30">
    <div class="container">
      <!-- Section Title Start -->
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <div class="wrap">
              <h2 class="title">
                {{ lang.latest_products }}
              </h2>
            </div>
            <div class="section-btn">
              <a
                :href="getUrl('best-selling/products')"
                @click.prevent="navigator"
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
        <!-- {{ latest_products[0] }} -->
          <div class="deals-wrapper" v-if="lengthCounter(products) > 0">
            <template v-for="(product, index) in latest_products" :key="index">
              <ProductItem
                :product="product"
                :number="12"
                :grid_class="'grid-6'"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Deals Section End -->
</template>

<script>
import ProductItem from "@/components/Product/Item.vue";

export default {
  components: { ProductItem },
  props: ["latest_products"],

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    products() {
      if (this.latest_products && this.latest_products.length > 0) {
        return this.latest_products;
      } else {
        return [];
      }
    },
  },

  methods: {
    navigator() {
      this.$router.push({ name: "product" });
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
      this.checkHomeComponent("latest_product");
    },
  },

  mounted() {
    this.checkHomeComponent("latest_product");
  },
};
</script>
