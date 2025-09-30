<template lang="html">
    <!-- Breadcrumb Section Start -->
    <section class="breadcrumb-section bg-color py-10">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb-area">
                        <ul class="list">
                            <li @click="globNavigate('/')" class="linked">
                                Home
                            </li>
                            <li>{{ lang.flash_sale }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Breadcrumb Section End -->

    <section class="sale-section pt-30 pb-60" v-if="is_shimmer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- Section Title Start -->
                    <div class="section-title countdown">
                        <div class="wrap">
                            <h2 class="title">
                                <img
                                    :src="static_image_url + 'flash.svg'"
                                    alt="Flash Sale"
                                />
                                {{ lang.flash_sale }}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <FlashProduct :products="products" />

            <div class="col-md-12 text-center show-more" v-show="loading">
                <loading_button
                    :class_name="'btn btn-primary'"
                ></loading_button>
            </div>
        </div>
    </section>

    <section class="sale-section pt-30 pb-60" v-else-if="shimmer">
        <div class="container">
            <div class="row">
                <div class="col-6" v-for="(product, index) in 2" :key="index">
                    <a href="javaScript:void(0)">
                        <shimmer :height="252"></shimmer>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import FlashProduct from "@/components/Product/FlashProduct.vue";

export default {
  components: { Shimmer, FlashProduct },

  data() {
    return {
      static_image_url: this.getUrl("frontends/images/"),
      page: 1,
      products: [],
      show_load_more: true,
      total_product: 0,
      currentUrl: "",
      activeClass: "",
      is_shimmer: false,
      next_page_url: false,
      loading: false,
    };
  },
  mounted() {
    this.loadMoreData();
  },
  computed: {
    baseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },
  methods: {
    loadMoreData() {
      let data = {
        slug: this.$route.params.slug,
        name: this.$route.name,
        page: this.page,
      };
      this.currentUrl =
        this.baseUrl + "/home/flash-sale-products?page=" + data.page;
      axios.get(this.currentUrl).then((response) => {
        this.is_shimmer = true;
        if (response.data.error) {
          toastr.error(response.data.error, this.lang.Error + " !!");
        } else {
          let products = response.data.products;
          if (products.data.length > 0) {
            for (let i = 0; i < products.data.length; i++) {
              this.products.push(products.data[i]);
            }
          }
          this.next_page_url = response.data.products.next_page_url;
          this.total_product = response.data.products.total;
          this.page++;
        }
      });
    },
    nextPageData() {
      this.loading = true;
      axios.get(this.next_page_url).then((response) => {
        this.loading = false;
        if (response.data.error) {
          toastr.error(response.data.error, this.lang.Error + " !!");
        } else {
          let products = response.data.products;
          if (products.data.length > 0) {
            for (let i = 0; i < products.data.length; i++) {
              this.products.push(products.data[i]);
            }
          }
          this.next_page_url = response.data.products.next_page_url;
          this.total_product = response.data.products.total;
          this.page++;
        }
      });
    },
  },
};
</script>
