<template>
    <div>
        <!-- Store Item Start -->
        <div v-if="!productDetailsPage">
            <a
                :class="['storeItem text-center']"
                :href="getUrl('shop/' + shop.slug)"
                @click.prevent="routerNavigator('shop', shop.slug)"
            >
                <div class="storeItem-thumb">
                    <img
                        :src="shop.image_297x203"
                        :alt="shop.shop_name"
                        class="main-thumb"
                        loading="lazy"
                    />
                    <div class="storeLogo">
                        <img
                            :src="shop.image_82x82"
                            :alt="shop.image_82x82"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div class="favorite-icon" v-if="authUser">
                    <a
                        href="javascript:void(0)"
                        :class="{ disable_btn: btn_disabled }"
                        @click.stop="removeFollowed(shop.id)"
                        v-if="shop.is_followed"
                        ><span class="mdi mdi-name mdi-heart"></span
                    ></a>
                    <a
                        href="javascript:void(0)"
                        @click.stop="follow(shop.id)"
                        :class="{ disable_btn: btn_disabled }"
                        v-else
                        ><span class="mdi mdi-name mdi-heart-outline"></span
                    ></a>
                </div>

                <div class="storeItem-content">
                    <h4 class="title">{{ shop.shop_name }}</h4>
                    <div class="avarage-rating">
                        <StarRating :rating="shop.rating_count" />
                        ({{ shop.reviews_count }} {{ lang.ratings }})
                    </div>

                    <div class="storeItem-meta">
                        <div class="product-count">
                            {{ lang.products }}:
                            <span>{{ shop.total_products }}</span>
                        </div>
                        <div class="date-count">
                            {{ lang.joined }}: <span>{{ shop.join_date }}</span>
                        </div>
                    </div>
                </div>
            </a>

            <a
                @click.prevent="divToggler"
                class="store-btn chat-with-seller-button"
                v-if="productDetailsPage && addons.includes('chat_system')"
            >
                <span
                    data-v-e4caeaf8=""
                    class="mdi mdi-message-processing-outline"
                ></span>
                {{ lang.chat_with_seller }}</a
            >
        </div>

        <div class="product-store-wrapper" v-if="productDetailsPage">
            <div class="product-store-info">
                <div class="icon">
                    <img
                        :src="shop.image_82x82"
                        :alt="shop.image_82x82"
                        loading="lazy"
                    />
                </div>
                <div class="content">
                    <h5 class="title">
                        <span>{{ shop.shop_name }}</span>
                    </h5>
                    <h5 class="title">
                        {{ lang.products }}:
                        <span>{{ shop.total_products }}</span>
                    </h5>
                    <h5 class="title">
                        {{ lang.ratings }} :
                        <div class="avarage-rating">
                            <StarRating :rating="shop.rating_count" />
                            ({{ shop.reviews_count }} {{ lang.ratings }})
                        </div>
                    </h5>
                    <div class="visit-btn">
                        <a
                            :href="getUrl('shop/' + shop.slug)"
                            @click.prevent="routerNavigator('shop', shop.slug)"
                            >{{ lang.visit_store }}</a
                        >
                    </div>
                </div>
            </div>
            <a
                @click.prevent="divToggler"
                v-if="productDetailsPage && addons.includes('chat_system')"
                class="chat-seller"
            >
                {{ lang.chat_with_seller }}
                <img :src="static_image_url + 'message.svg'" alt="message" />
            </a>
        </div>
        <!-- Store Item End -->
    </div>
</template>

<script>
import StarRating from "@/components/StarRating.vue";

export default {
    name: "single_seller",
    props: {
        shop: Object,
        productDetailsPage: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        StarRating,
    },
    data() {
        return {
            btn_disabled: false,
            static_image_url: this.getUrl("frontends/images/"),
        };
    },
    computed: {
        homeResults() {
            return this.$store.getters.getHomeResults;
        },
        sellers() {
            return this.$store.getters.getAllSellers;
        },
        allFollowedSellers() {
            return this.$store.getters.getFollowedSellers;
        },
        shops() {
            return this.$store.getters.getCampaignShops;
        },
        productDetails() {
            return this.$store.getters.getProductDetails;
        },
    },
    methods: {
        follow(id) {
            let requestData = {
                id: id,
            };
            this.btn_disabled = true;
            let url = this.getUrl("user/follow-shop");
            axios
                .get(url, { params: requestData })
                .then((response) => {
                    this.btn_disabled = false;
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        // this.shop.is_followed = true;
                        if (this.homeResults.length > 0) {
                            this.homeResults.forEach((homeResult) => {
                                if (
                                    homeResult.key == "top_sellers" ||
                                    homeResult.key == "featured_sellers" ||
                                    homeResult.key == "best_sellers" ||
                                    homeResult.key == "express_sellers"
                                ) {
                                    homeResult.data.forEach((shop) => {
                                        if (shop.id == id) {
                                            shop.is_followed = true;
                                        }
                                    });
                                }
                            });
                        }

                        if (this.sellers.length > 0) {
                            this.sellers.forEach((shop) => {
                                if (shop.id == id) {
                                    shop.is_followed = true;
                                }
                            });
                        }
                        if (this.shops.length > 0) {
                            this.shops.forEach((row) => {
                                row.shops.data.forEach((shop) => {
                                    if (shop.id == id) {
                                        shop.is_followed = true;
                                    }
                                });
                            });
                        }
                        if (this.productDetails.length > 0) {
                            this.productDetails.forEach((row) => {
                                let shop = row.product.seller;
                                if (shop.id == id) {
                                    shop.is_followed = true;
                                }
                            });
                        }
                    }
                    this.$store.commit("setFollowedSellers", 1);
                    this.$store.dispatch("FollowedSellers");
                })
                .catch((error) => {
                    this.btn_disabled = false;
                    if (error.response && error.response.status == 422) {
                        this.$toast.error(
                            error.response.statusText,
                            this.lang.Error + " !!"
                        );
                    }
                });
        },
        divToggler() {
            let selector = $(".user-chatbox-show");
            selector.toggleClass("chatbox-hide");
            $(".title-right").toggleClass("chatbox-hide");
            $(".message-box").toggleClass("chatbox-width");
            this.chat_active = !selector.hasClass("chatbox-hide");
            this.updateCurrentSellerId(this.shop.id);
        },
        updateCurrentSellerId(id) {
            this.$store.commit("setCurrentSellerId", id);
        },
        removeFollowed(id) {
            this.checkListing = false;
            let requestData = {
                id: id,
            };
            this.btn_disabled = true;
            let url = this.getUrl("user/remove-followed");
            axios
                .get(url, { params: requestData })
                .then((response) => {
                    this.btn_disabled = false;
                    if (response.data.error) {
                        
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        // this.shop.is_followed = false;
                        if (this.homeResults.length > 0) {
                            this.homeResults.forEach((homeResult) => {
                                if (
                                    homeResult.key == "top_sellers" ||
                                    homeResult.key == "featured_sellers" ||
                                    homeResult.key == "best_sellers" ||
                                    homeResult.key == "express_sellers"
                                ) {
                                    homeResult.data.forEach((shop) => {
                                        if (shop.id == id) {
                                            shop.is_followed = false;
                                        }
                                    });
                                }
                            });
                        }
                        if (this.sellers.length > 0) {
                            this.sellers.forEach((shop) => {
                                if (shop.id == id) {
                                    shop.is_followed = false;
                                }
                            });
                        }
                        let length = this.allFollowedSellers.length;
                        if (length > 0) {
                            for (let i = 0; i < length; i++) {
                                let shop = this.allFollowedSellers[i];
                                if (shop.id == id) {
                                    this.$store.commit(
                                        "removeFollowedSellers",
                                        i
                                    );
                                }
                            }
                        }

                        if (this.shops.length > 0) {
                            this.shops.forEach((row) => {
                                row.shops.data.forEach((shop) => {
                                    if (shop.id == id) {
                                        shop.is_followed = false;
                                    }
                                });
                            });
                        }

                        if (this.productDetails.length > 0) {
                            this.productDetails.forEach((row) => {
                                let shop = row.product.seller;
                                if (shop.id == id) {
                                    shop.is_followed = false;
                                }
                            });
                        }
                    }
                })
                .catch((error) => {
                    this.btn_disabled = false;
                    if (error.response && error.response.status == 422) {
                        this.$toast.error(
                            error.data.error,
                            this.lang.Error + " !!"
                        );
                    }
                });
        },
    },
};
</script>
