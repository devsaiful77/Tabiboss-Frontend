<template lang="html">
    <!-- Breadcrumb Section Start -->
    <section class="breadcrumb-section bg-color py-10">
        <div class="container">
            <div class="row">
            <div class="col-12">
                <div class="breadcrumb-area">
                <ul class="list">
                    <li @click="globNavigate('/')" class="linked">Home</li>
                    <li v-if="is_shimmer">
                    {{
                        lengthCounter(brands) > 0 ? lang.brands : lang.no_brands_found
                    }}
                    </li>
                    <li v-else>{{ lang.content_loading }}</li>
                </ul>
                </div>
            </div>
            </div>
        </div>
    </section>
    <!-- Breadcrumb Section End -->

    <!-- Brands Section Start -->
    <section class="brands-section py-40">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- Section Title Start -->
                    <div class="section-title">
                        <div class="wrap">
                            <h2 class="title" v-if="is_shimmer">
                                {{
                                    lengthCounter(brands) > 0 ? lang.brands : lang.no_brands_found
                                }}
                            </h2>

                            <h2 class="title" v-else>{{ lang.content_loading }}</h2>
                        </div>
                    </div>
                    <!-- Section Title End -->
                </div>
            </div>

            <div class="row" v-if="is_shimmer">
                <div class="col-lg-2 col-md-3 col-sm-4 mb-5" v-for="(brand,index) in brands" :key="index">

                    <!-- Brand Item Start -->
                    <a :class="['brandItem']" :href="getUrl('brand/'+brand.slug)" @click.prevent="routerNavigator('product.by.brand',brand.slug)">
                        <div class="brandItem-thumb">
                            <img loading="lazy" :src="brand.image_130x93" :alt="brand.title">
                        </div>
                        <div class="brandItem-content">
                            <h4 class="title">{{ brand.title }}</h4>
                        </div>
                    </a>
                    <!-- Brand Item End -->

                </div>
            </div>

            <div class="row" v-else-if="shimmer">
                <div class="col-6 col-sm-4 col-md-3 col-lg-2" v-for="(attr,i) in 12">
                    <shimmer class="mb-3" :height="155"></shimmer>

                </div>
            </div>

            <div class="row">
                <div class="col-md-12 text-center show-more" v-if="paginate && !loading">
                    <a href="javascript:void(0)" @click="loadBrands()" class="btn btn-primary">{{ lang.show_more }}</a>
                </div>
                <div class="col-md-12 text-center show-more" v-show="loading">
                    <loading_button :class_name="'btn btn-primary'"></loading_button>
                </div>
            </div>

        </div>
     </section>
    <!-- Brands Section Start -->


</template>
<script>
import Shimmer from "@/components/Shimmer.vue"
export default {
  data() {
    return {
      loading: false,
      next_page_url: false,
      is_shimmer: false,
    };
  },
  components: {
    Shimmer,
  },

  mounted() {
    if (this.lengthCounter(this.brands) == 0) {
      this.loadBrands();
    }
    if (this.lengthCounter(this.brands) > 0) {
      this.is_shimmer = true;
    }
  },
  computed: {
    brands() {
      return this.$store.getters.getAllBrands;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
    paginate() {
      return this.$store.state.module.brand_paginate_url;
    },

    baseUrl() {
      return this.$store.getters.getBaseUrl;
    },
  },
  methods: {
    loadBrands() {
      let url =
        this.baseUrl +
        "/home/brands?page=" +
        this.$store.state.module.brand_paginate_page;
      if (this.$store.state.module.brand_paginate_page != 1) {
        this.loading = true;
      }
      this.$progress.start();
      axios
        .get(url)
        .then((response) => {
          this.is_shimmer = true;
          if (response.data.error) {
            
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            if (this.$store.state.module.brand_paginate_page != 1) {
              this.loading = false;
            }
            this.$store.commit("getAllBrands", response.data.brands);
            this.$progress.finish();
          }
        })
        .catch((error) => {
          this.loading = false;
          this.is_shimmer = true;
          

          if (error.response && error.response.status == 422) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          }
        });
    },
  },
};
</script>
