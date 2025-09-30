<template lang="html">
  <!-- Breadcrumb Section Start -->
  <section class="breadcrumb-section bg-color py-10">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-area">
            <ul class="list">
              <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
              <li @click="globNavigate('/categories')" class="linked" v-if="slug">{{ slug }}</li>
              <li>{{ lang.all_subcategory }}</li>
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
                  <h2 class="title" v-if="!is_shimmer">
                    {{ lang.all_subcategory }}
                  </h2>
                  <h2 class="title" v-else>{{ lang.content_loading }}</h2>
                </div>
              </div>
              <!-- Section Title End -->
            </div>
          </div>

          <div class="row" v-if="is_shimmer == false">
            <div
              class="col-lg-4 col-md-6 col-sm-6 col-xs-6"
              v-for="(category, index) in sub_categories"
              :key="index"
            >
              <!-- All categories Item Start -->
              <div class="allCategories-item">
                <div class="allCategories-inner">
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
                      </li>
                    </ul>

                    <ul v-else>
                      <li class="text-white no-before"></li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- Global categories Item End -->
            </div>
          </div>

          <div class="row" v-else-if="is_shimmer">
            <div
              class="col-lg-4 col-md-6 col-sm-6 col-xs-6"
              v-for="(category, index) in 6"
              :key="index"
            >
              <Shimmer :height="238" class="mb-3" />
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
      is_shimmer: false,
      slug: this.$route.params.slug,
      sub_categories: [],
    };
  },
  mounted() {
    this.getSubCategory();
  },


  methods: {
    getSubCategory(){
        this.is_shimmer = true;
        let url = this.getUrl("home/category-wise/subcategory/" + this.slug);
        axios.get(url)
        .then((response) => {
            if (response.data.error) {
                this.$toast.error(response.data.error, this.lang.Error + " !!");
            } else {
                this.sub_categories = response.data.subcategories
            }
            this.is_shimmer = false;
        })
        .catch((error) => {
            this.is_shimmer = false;
            console.log(error)
        });
    },

  },
};
</script>
