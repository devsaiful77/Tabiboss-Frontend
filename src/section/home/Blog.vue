<template>
  <!-- Blog Section Start -->
  <section class="blog-section py-30" v-if="lengthCounter(countBlog) > 0">
    <div class="container">
      <!-- Section Title Start -->
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <div class="wrap">
              <h2 class="title">{{ lang.blog_news }}</h2>
            </div>
            <div class="section-btn">
              <router-link :to="{ name: 'blogs' }" class="solid-btn"
                >{{ lang.more }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Section Title End -->

      <div class="row">
        <div class="col-12">
          <!-- if exist blog -->
          <div class="blog-wrapper position-relative">
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
                el: '.blog-pagination',
                clickable: true,
              }"
              :navigation="{
                nextEl: '.blog-button-next',
                prevEl: '.blog-button-prev',
              }"
              :scrollbar="false"
              :breakpoints="{
                479: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 20,
                },
                767: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 20,
                },
              }"
            >
              <!-- Loop through the blog posts and render the BlogItem component -->
              <swiper-slide v-for="(blog, index) in blogs" :key="index">
                <!-- Blog Item Start -->
                <div :class="['blogPost-item']">
                  <!-- <div :class="['blogPost-item', loading ? 'skeleton' : '']"> -->
                  <div class="blog-figure">
                    <img :src="blog.thumbnail" :alt="blog.title" />
                    <!-- <div class="post-date">11/2/2025</div> -->
                  </div>
                  <div class="blog-content">
                    <h4 class="title">
                      <router-link
                        :to="{
                          name: 'blog.details',
                          params: { slug: blog.slug },
                        }"
                        >{{ blog.title }}</router-link
                      >
                    </h4>
                    <!-- <div class="blog-meta">
                      <span
                        v-for="(category, index) in item.blog_categories"
                        :key="index"
                      >
                        <a href="#">{{ category }}</a>
                      </span>
                    </div> -->
                    <div class="blog-btn">
                      <a
                        class="btn btn-primary"
                        :href="getUrl('blog/' + blog.slug)"
                        @click.prevent="
                          routerNavigator('blog.details', blog.slug)
                        "
                      >
                        {{ lang.read_more }}
                      </a>
                      <!-- <a href="#" class="admin"
                        ><i class="ri-user-line"></i>{{ item.blog_author }}</a
                      > -->
                    </div>
                  </div>
                </div>
                <!-- Blog Item End -->
              </swiper-slide>
            </swiper>
            <!-- Custom Navigation Start -->
            <div class="custom-navigation">
              <div class="blog-button-prev swiper-button-prev">
                <i class="ri-arrow-left-s-line"></i>
              </div>
              <div class="blog-button-next swiper-button-next">
                <i class="ri-arrow-right-s-line"></i>
              </div>
            </div>
            <!-- Custom Navigation End -->

            <!-- Custom Pagination Outside -->
            <div class="blog-pagination"></div>
            <!-- Custom Pagination Outside End -->
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- if not exist blog -->
  <section class="blog-section py-30" v-else>
    <div class="container">
      <!-- Section Title Start -->
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <Shimmer :height="38" />
          </div>
        </div>
      </div>
      <!-- Section Title End -->

      <div class="row">
        <div class="col-md-6 col-lg-3" v-for="(count, index) in 4" :key="index">
          <shimmer :height="424"></shimmer>
        </div>
      </div>
    </div>
  </section>
  <!-- Blog Section End -->
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
  components: {
    Shimmer,
  },

  props: ["blogs"],

  data() {
    return {
      show_shimmer: true,
      modules: [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y],
    };
  },

  mounted() {
    this.checkHomeComponent("latest_product");
  },
  watch: {
    homeResponse() {
      this.checkHomeComponent("latest_product");
    },
  },
  computed: {
    countBlog() {
      if (this.blogs && this.blogs.length > 0) {
        return this.blogs;
      } else {
        return [];
      }
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
