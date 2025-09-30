<template lang="html">
    <div>
        <!-- Breadcrumb Section Start -->
        <section class="breadcrumb-section bg-color py-10" v-if="is_shimmer && video">
            <div class="container">
                <div class="row">
                <div class="col-12">
                    <div class="breadcrumb-area">
                    <ul class="list">
                        <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
                        <li @click="globNavigate('/video-shopping')" class="linked">{{ lang.video_shopping }}</li>
                        <li>{{ video.title }}</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Section End -->

        <section class="brands-section py-40" v-if="is_shimmer && video">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Section Title Start -->
                        <div class="section-title">
                            <div class="wrap">
                                <h2 class="title"> {{ video.title }} </h2>
                            </div>
                        </div>
                        <!-- Section Title End -->
                    </div>
                </div>

                <!-- {{ video.products.length }} -->

                <!-- {{ video }} -->

                <div class="row">
                    <div :class="video.products.length > 0 && video.products.length == 1  ? 'col-md-6' : 'col-md-12'">
                        <VideoSection :video="video" />
                    </div>

                    <div v-if="video.products && video.products.length > 0 && video.products.length == 1 " class="col-md-6">
                        <div class="small-title"><h2>{{ lang.recommended_products }}</h2></div>
                        <template v-for="(item, index) in video.products" :key="index">
                            <Product
                                :product="item"
                                :number="8"
                                :grid_class="'grid-4'"
                            />
                        </template>
                    </div>

                </div>

                <div class="row py-40" v-if="video.products && video.products.length > 1">
                    <div class="col-md-12 mb-3">
                        <div class="small-title">
                            <h2>{{ lang.recommended_products }}</h2>
                        </div>
                    </div>
                    <div class="col-md-3" v-for="(item, index) in video.products" :key="index">
                        <ProductItem :product="item" :number="12" :grid_class="'grid-6'" />
                    </div>
                </div>


                <!-- related Product -->
                <div class="row py-40" v-if="video.related_products.length > 0">
                    <div class="col-lg-12">
                        <div class="small-title">
                            <h2>{{ lang.related_products }}</h2>
                        </div>
                        <div class="product-wrapper position-relative">
                            <swiper
                                :modules="modules"
                                :space-between="24"
                                :slides-per-view="'auto'"
                                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                                :effect="''"
                                :pagination="{ el: '.sale-pagination', clickable: true }"
                                :navigation="{ nextEl: '.product-button-next', prevEl: '.product-button-prev' }"
                                :scrollbar="false"

                                :breakpoints="{
                                    479: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
                                    767: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 },
                                    1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
                                    1200: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 }
                                }"
                            >
                                <swiper-slide v-for="item in video.related_products" :key="item.id">
                                    <ProductItem :product="item" :number="12" :grid_class="'grid-6'" />
                                </swiper-slide>
                            </swiper>
                            <!-- Custom Navigation Start -->
                            <div class="custom-navigation">
                                <div class="product-button-prev swiper-button-prev"><i class="ri-arrow-left-s-line"></i></div>
                                <div class="product-button-next swiper-button-next"><i class="ri-arrow-right-s-line"></i></div>
                            </div>
                            <!-- Custom Navigation End -->

                            <!-- Custom Pagination Outside -->
                            <div class="sale-pagination "></div>
                            <!-- Custom Pagination Outside End -->
                        </div>
                    </div>
                </div>



                <!-- popular video -->
                <div class="row py-40" v-if="video && video.popular_videos.length > 0">
                    <div class="small-title">
                        <h2>{{ lang.popular_videos }}</h2>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-3" v-for="(video,index) in video.popular_videos" :key="index">
                        <VideoItem :video="video" />
                    </div>
                </div>



            </div>
        </section>

        <!-- without shimmer -->
        <section class="brands-section py-40" v-if="!is_shimmer">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <Shimmer :height="50" class="mb-3" />
                    </div>
                </div>

                <!-- {{ video.products.length }} -->

                <!-- {{ video }} -->

                <div class="row">
                    <div class="col-md-6">
                        <Shimmer :height="450" class="mb-3" />
                    </div>

                    <div class="col-md-6">
                        <Shimmer :height="15" class="mb-3" />
                        <Shimmer :height="430" class="mb-3" />
                    </div>

                </div>

                <!-- related Product -->
                <div class="row py-40">
                    <div class="col-lg-12">
                        <Shimmer :height="30" class="mb-3" />

                        <div class="row">
                            <div class="col-md-3" v-for="(item,index) in 4">
                                <Shimmer :height="350" class="mb-3" />
                            </div>
                        </div>

                    </div>
                </div>



                <!-- popular video -->
                <div class="row py-40">
                    <div class="col-lg-12">
                        <Shimmer :height="30" class="mb-3" />

                        <div class="row">
                            <div class="col-md-3" v-for="(item,index) in 4">
                                <Shimmer :height="450" class="mb-3" />
                            </div>
                        </div>

                    </div>
                </div>



            </div>
        </section>

    </div>


</template>

<script>
import VideoSection from "./VideoSection.vue";
import Shimmer from "@/components/Shimmer.vue";
import Product from "./Product.vue";
import VideoItem from "@/components/VideoItem.vue";
import ProductItem from "@/components/Product/Item.vue";
import { Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y } from 'swiper/modules';

export default {
  components: {
    VideoSection,
    Shimmer,
    Product,
    VideoItem,
    ProductItem
  },
  data() {
    return {
      is_shimmer: false,
      modules: [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y],
    };
  },
  computed: {
    video() {
      const videos = this.$store.getters.getVideoDetails;
      if (!videos || !Array.isArray(videos)) return null;

      const index = videos.findIndex(
        (video) => video.slug == this.$route.params.slug
      );
      return index > -1 ? videos[index] : null;
    },
  },


  watch: {
    '$route.params.slug': {
      immediate: true,
      handler() {
        this.is_shimmer = false;
        this.videoDetails();
      }
    }
  },


  mounted() {
    this.videoDetails();
  },


  methods: {
    videoDetails() {
      this.$progress.start();
      const url = this.getUrl(
        "get/video-shops-details/" + this.$route.params.slug
      );
      axios
        .get(url)
        .then((response) => {
          if (response.data.error) {
            
            toastr.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.$store.commit("setVideoDetails", response.data.video);
            this.is_shimmer = true;
            this.$progress.finish();
          }
        })
        .catch((error) => {
          
          this.is_shimmer = true;
        });
    },


    // popularVideos(slug) {
    //   this.$progress.start();
    //   this.is_shimmer = false;

    //   // Push route and wait until navigation is finished
    //   this.$router
    //     .push({ name: "video.shopping.details", params: { slug } })
    //     .then(() => {
    //       this.videoDetails(); // fetch new video details after route change
    //     });
    // },
  },
};
</script>



<style scoped>
    .small-title h2 {
        font-size: 20px;
    }
</style>
