<template>
    <div class="productThumb-wrapper">
        <CountdownItem
            :days="localDays"
            :hours="localHours"
            :minutes="localMinutes"
            :seconds="localSeconds"
            v-if="discountCheck > 0"
        />
        <!-- wishlist -->
        <div class="product-actions" v-if="authUser">
            <a
                v-if="user_wishlist"
                @click="removeWishlist"
                href="javascript:void(0)"
                class="action-btn wishlist"
                ><i class="ri-heart-3-fill"></i>
            </a>
            <a
                v-else="!user_wishlist"
                href="javascript:void(0)"
                @click="addToWishlist"
                class="action-btn wishlist"
                ><i class="ri-heart-3-line"></i
            ></a>
        </div>
        <!-- end wishlist -->
        <swiper
            :loop="true"
            :spaceBetween="10"
            :navigation="true"
            :grabCursor="true"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            :class="['swiperSlide', loading ? 'skeleton' : '']"
        >
            <swiper-slide
                v-for="(image, index) in thumbnail.large"
                :key="index"
                @click="openLightbox(index)"
            >
                <div
                    class="sliderContent"
                    :class="{ quick_product: type === 'popup' }"
                >
                    <img
                        :src="image"
                        style="cursor: pointer"
                        :alt="product_name"
                    />
                </div>
            </swiper-slide>
        </swiper>

        <!-- Lightbox for Viewing Images -->
        <vue-easy-lightbox
            :visible="showImage"
            :imgs="thumbnail.large"
            :index="currentIndex"
            @hide="closeLightbox"
        />

        <swiper
            @swiper="onThumbSwiperInit"
            :loop="true"
            :spaceBetween="10"
            :grabCursor="true"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            :navigation="false"
            class="swiperThumb"
            :breakpoints="{
                320: { slidesPerView: 4, direction: 'horizontal' },
                1200: { slidesPerView: 4, direction: 'vertical' },
                1439: { slidesPerView: 4, direction: 'vertical' },
            }"
        >
            <swiper-slide
                v-for="(image, index) in thumbnail.small"
                :key="index"
            >
                <div :class="['product-thumb', loading ? 'skeleton' : '']">
                    <img :src="image" :alt="product_name" />
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import CountdownItem from "./CountdownItem.vue";
import {
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
    EffectFade,
    Thumbs,
    A11y,
} from "swiper/modules";

export default {
    components: { CountdownItem },
    props: [
        "thumbnail",
        "product_name",
        "discountCheck",
        "user_wishlist",
        "product_id",
        "days",
        "hours",
        "minutes",
        "seconds",
        "type",
    ],
    data() {
        return {
            showImage: false,
            currentIndex: 0,
            thumbsSwiper: null,
            loading: false,
            modules: [
                Autoplay,
                Navigation,
                Pagination,
                Scrollbar,
                EffectFade,
                Thumbs,
                A11y,
            ],
            disable: false,

            localDays: 0,
            localHours: 0,
            localMinutes: 0,
            localSeconds: 0,

            timer: null,
            targetDate: 0,
        };
    },

    methods: {
        updateTimer() {
            const now = new Date().getTime();
            const distance = this.targetDate - now;

            if (distance <= 0) {
                clearInterval(this.timer);
                this.localDays = 0;
                this.localHours = 0;
                this.localMinutes = 0;
                this.localSeconds = 0;
                return;
            }

            this.localDays = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.localHours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            this.localMinutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            this.localSeconds = Math.floor((distance % (1000 * 60)) / 1000);
        },

        openLightbox(index) {
            this.currentIndex = index;
            this.showImage = true;
        },
        closeLightbox() {
            this.showImage = false;
        },
        onThumbSwiperInit(swiper) {
            this.thumbsSwiper = swiper;
        },

        removeWishlist() {
            if (this.disable) {
                return false;
            }
            this.disable = true;
            let url = this.getUrl(
                "user/remove-wishlist-product/" + this.product_id
            );
            axios.get(url).then((response) => {
                this.disable = false;
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.user_wishlist = null;
                    this.$store.commit(
                        "getRemoveWishlist",
                        response.data.wishlist
                    );
                    this.$store.dispatch(
                        "wishlists",
                        response.data.totalWishlist
                    );
                }
            });
        },

        addToWishlist() {
            if (this.disable) {
                return false;
            }
            this.disable = true;
            let url = this.getUrl("user/add-to-wishlist/" + this.product_id);
            axios.get(url).then((response) => {
                this.disable = false;
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.$store.dispatch("wishlists", response.data.wishlists);
                    this.user_wishlist = response.data.wishlist;
                }
            });
        },
    },

    mounted() {
        this.targetDate =
            new Date().getTime() +
            (this.days || 0) * 24 * 60 * 60 * 1000 +
            (this.hours || 0) * 60 * 60 * 1000 +
            (this.minutes || 0) * 60 * 1000 +
            (this.seconds || 0) * 1000;

        this.updateTimer();
        this.timer = setInterval(this.updateTimer, 1000);
    },

    unmounted() {
        clearInterval(this.timer);
    },
};
</script>
