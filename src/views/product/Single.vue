<template lang="html">
  <div>
    <!-- Breadcrumb Section Start -->
    <section class="breadcrumb-section bg-color py-10">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="breadcrumb-area">
              <ul class="list">
                <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
                <li @click="globNavigate('/products')" class="linked">{{ lang.products }}</li>
                <li>{{ truncateName(productDetails.product_name, 50) }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcrumb Section End -->

    <!-- details view -->
    <DetailsView :productDetails="productDetails" />

    <!-- Recent products -->
    <SliderProduct v-if="productDetails.sidebar_products && productDetails.sidebar_products.length > 0" :slider_products="productDetails.sidebar_products" :title="lang.recent_products" />


    <!-- related products -->
    <SliderProduct v-if="productDetails.related_products && productDetails.related_products.length > 0" :slider_products="productDetails.related_products" :title="lang.related_products" />


  </div>
</template>

<script>
import DetailsView from '@/components/Product/DetailsView.vue';
import SliderProduct from '@/section/product/SliderProduct.vue';
export default {
  components: {
    DetailsView,
    SliderProduct
  },
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      slug: {
        product_slug: this.$route.params.slug,
      },
    };
  },

  watch: {
    $route() {
      let set_params = {
        slug: this.$route.params.slug,
        referral_code: this.$route.query.referral_code,
        trx_id: this.carts && this.carts.length > 0 ? this.carts[0].trx_id : "",
      };
      if (!this.productDetails) {
        this.$store.dispatch("productDetails", set_params);
      }
    },
  },

  mounted() {
    let set_params = {
      slug: this.$route.params.slug,
      referral_code: this.$route.query.referral_code,
      trx_id: this.carts && this.carts.length > 0 ? this.carts[0].trx_id : "",
    };

    this.$store.dispatch("productView", this.slug);
    if (!this.productDetails) {
      this.$store.dispatch("productDetails", set_params);
    }
  },

  computed: {
    productDetails() {
      let products = this.$store.getters.getProductDetails;
      for (let i = 0; i < products.length; i++) {
        if (products[i].slug == this.$route.params.slug) {
          if (products[i].product.status != "published") {
            this.$toast.warning(
              products[i].product.product_name +
                this.lang.is_unavailable_at_this_moment,
              this.lang.Warning + " !!"
            );

            return this.$router.go(-1);
          }
          return products[i].product;
        }
      }

      return false;
    },
    carts() {
      return this.$store.getters.getCarts;
    },
  },
  methods: {
    truncateName(name, limit) {
      if (!name) return '';
      return name.length > limit ? name.slice(0, limit) + '...' : name;
    },

    // required
    navigate(link) {
      this.$router.push(link);
    },

    countDownTimer() {
      const now = new Date().getTime();
      // let startOfDay = new Date(now - (now % 86400000)).toUTCString();
      let end_time = new Date(now - (now % 86400000) + 86400000); //2022-12-25 09:33:00
      let final_end_time = "";
      final_end_time += end_time.getFullYear() + "-";
      final_end_time += end_time.getMonth() + 1 + "-";
      final_end_time += end_time.getDate() - 1 + " ";
      final_end_time += "23:";
      final_end_time += "59:";
      final_end_time += "59";
      return final_end_time;
    },
  },
};
</script>
