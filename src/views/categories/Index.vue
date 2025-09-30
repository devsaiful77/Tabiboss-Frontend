<template lang="html">
  <!-- Breadcrumb Section Start -->
  <section class="breadcrumb-section bg-color py-10">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-area">
            <ul class="list">
              <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
              <li>{{ lang.all_categories }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Breadcrumb Section End -->

  <section class="all-categories-section pt-40 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- Section Title Start -->
          <div class="section-title">
            <div class="wrap">
              <h2 class="title" v-if="is_shimmer">
                {{
                  lengthCounter(categories) > 0
                    ? lang.all_categories
                    : lang.no_category_founds
                }}
              </h2>
              <h2 class="title" v-else>{{ lang.content_loading }}</h2>
            </div>
          </div>
          <!-- Section Title End -->
        </div>
      </div>

      <div class="row" v-if="is_shimmer">
        <div
          class="col-lg-4 col-md-6 col-sm-6 col-xs-6"
          v-for="(category, index) in categories"
          :key="index"
        >
          <!-- All categories Item Start -->
          <div class="allCategories-item">
            <div :class="['allCategories-inner']">
              <a
                :href="getUrl('category/' + category.slug)"
                @click.prevent="
                  routerNavigator('product.by.category', category.slug)
                "
                class="thumb"
              >
                <img
                  loading="lazy"
                  :src="category.all_popular_image"
                  :alt="category.title"
                />
              </a>
              <div class="allCategories-list">
                <h4 class="title">
                  <a
                    :href="getUrl('category/' + category.slug)"
                    @click.prevent="
                      routerNavigator('product.by.category', category.slug)
                    "
                    >{{ category.title }}</a
                  >
                </h4>
                <ul
                  class="global-list"
                  v-if="
                    category.child_categories &&
                    category.child_categories.length > 0
                  "
                >
                  <li
                    v-for="(
                      child_category, child_index
                    ) in category.child_categories.slice(0, 5)"
                    :key="child_index"
                    :class="{
                      'has-baby': child_category.categories.length > 0,
                    }"
                  >
                    <a
                      :href="getUrl('category/' + child_category.slug)"
                      @click.prevent="
                        routerNavigator(
                          'product.by.category',
                          child_category.slug
                        )
                      "
                      >{{ child_category.title }}</a
                    >
                    <!-- Submenu -->
                    <ul
                      v-if="child_category.categories.length > 0"
                      class="submenu"
                    >
                      <li
                        v-for="(category, index) in child_category.categories"
                        :key="'child_category' + index"
                      >
                        <a
                          :href="getUrl('category/' + category.slug)"
                          @click.prevent="
                            routerNavigator(
                              'product.by.category',
                              category.slug
                            )
                          "
                          >{{ category.title }}</a
                        >
                      </li>
                    </ul>
                  </li>
                    <div v-if="category.child_categories.length > 5" class="show-btn">
                        <a class="solid-btn" :href="getUrl('sub-categories/' + category.slug)"
                          @click.prevent="
                            routerNavigator(
                              'sub.categories',
                              category.slug
                            )
                          ">{{ lang.view_more }}</a>
                    </div>

                </ul>

                <ul v-else>
                  <li class="text-white no-before"></li>
                </ul>
                <!-- <div v-if="item.CategoriesItemData.length >= 5 && item.show_btnTxt" class="show-btn">
                            <router-link class="solid-btn" :to="{ name: 'product' }">{{ item.show_btnTxt }}</router-link>
                        </div> -->
              </div>
            </div>
          </div>
          <!-- Global categories Item End -->
        </div>
      </div>

      <div class="row" v-else-if="shimmer">
        <div
          class="col-lg-4 col-md-6 col-sm-6 col-xs-6"
          v-for="(category, index) in 6"
          :key="index"
        >
          <shimmer :height="238" class="mb-3"></shimmer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";

export default {
  components: { Shimmer },
  data() {
    return {
      next_page_url: false,
      is_shimmer: false,
    };
  },
  mounted() {
    if (this.lengthCounter(this.categories) == 0) {
      this.loadCategories();
    }
    if (this.lengthCounter(this.categories) > 0) {
      this.is_shimmer = true;
    }
  },
  computed: {
    baseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
    categories() {
      return this.$store.getters.getAllCategories;
    },
  },
  methods: {
    loadCategories() {
      let url = this.baseUrl + "/home/categories";
      if (this.page != 1) {
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
            if (this.page != 1) {
              this.loading = false;
            }
            this.$store.commit("getAllCategories", response.data.categories);
            this.next_page_url = response.data.categories.next_page_url;
            this.page++;
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
