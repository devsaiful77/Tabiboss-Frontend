<template lang="html">
    <!-- Banner Section Start -->
    <section class="banner-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="banner-wrapper">
                        <!-- Slider start -->
                        <div class="banner__card position-relative">
                            <swiper
                                v-if="sliders.length > 0"
                                :modules="modules"
                                :space-between="50"
                                :slides-per-view="1"
                                :slidesPerGroup="1"
                                :autoplay="{
                                    enabled: false, // Turn off default autoplay
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }"
                                :effect="'slide'"
                                :speed="900"
                                :parallax="true"
                                :navigation="{
                                    nextEl: '.banner-button-next',
                                    prevEl: '.banner-button-prev',
                                }"
                                :scrollbar="false"
                            >
                                <!-- Slide 1 -->

                                <swiper-slide
                                    v-for="(slider, i) in sliders"
                                    :key="i"
                                >
                                    <div
                                        class="hero-text"
                                        :style="{
                                            backgroundImage: `url(${slider.slider_bg_image})`,
                                        }"
                                    >
                                        <div class="hero-content">
                                            <h4 class="subtitle">
                                                {{ slider.tag }}
                                            </h4>
                                            <h1 class="title">
                                                {{ slider.title }}
                                            </h1>
                                            <p class="desc">
                                                {{ slider.sub_title }}
                                            </p>

                                            <div
                                                class="banner-btn"
                                                v-if="urlCheck(slider.link)"
                                            >
                                                <a
                                                    :href="slider.link"
                                                    class="btn btn-primary"
                                                    >{{ slider.btn_text }}</a
                                                >
                                            </div>

                                            <div class="banner-btn" v-else>
                                                <a
                                                    href="javascript:void(0)"
                                                    class="btn btn-primary"
                                                    >{{ slider.btn_text }}</a
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </swiper-slide>
                            </swiper>
                            <div class="custom-navigation">
                                <div
                                    class="banner-button-prev swiper-button-prev"
                                >
                                    <i class="ri-arrow-left-s-line"></i>
                                </div>
                                <div
                                    class="banner-button-next swiper-button-next"
                                >
                                    <i class="ri-arrow-right-s-line"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Slider end -->

                        <div class="heroAds-wrapper">
                            <template
                                v-for="(banner, index) in selectedBanners"
                                :key="index"
                            >
                                <div
                                    :class="[
                                        'heroAds-single',
                                        loading ? 'skeleton' : '',
                                    ]"
                                    :style="{
                                        backgroundImage: `url(${banner.image})`,
                                    }"
                                >
                                    <div class="heroAds-single-item">
                                        <span class="subtitle">{{
                                            banner.sub_title
                                        }}</span>
                                        <h4 class="title">
                                            {{ banner.title }}
                                        </h4>
                                        <div class="shop-btn">
                                            <a
                                                class="btn btn-primary"
                                                v-if="urlCheck(banner.link)"
                                                :href="banner.link"
                                                >Show Now</a
                                            >
                                            <router-link
                                                class="btn btn-primary"
                                                v-else
                                                :to="banner.link"
                                                >Shop Now</router-link
                                            >
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Banner Section End -->
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

    data() {
        return {
            dir: "ltr", // or 'rtl'
            selectedBanners: [],
            modules: [
                Autoplay,
                Navigation,
                Pagination,
                Scrollbar,
                EffectFade,
                A11y,
            ],
            loading: false,
        };
    },

    computed: {
        sliders() {
            return this.$store.getters.getSliders;
        },
        banners() {
            return this.$store.getters.getSliderBanners;
        },
    },

    watch: {
        banners: {
            immediate: true,
            handler(newBanners) {
                if (newBanners && newBanners.length > 0) {
                    const shuffled = [...newBanners].sort(
                        () => 0.5 - Math.random()
                    );
                    this.selectedBanners = shuffled.slice(0, 2);
                }
            },
        },
    },
};
</script>
