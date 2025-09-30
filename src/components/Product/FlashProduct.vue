<template lang="html">
    <div>
        <div class="row">
            <div
                class="col-md-6"
                v-for="(product, index) in products"
                :key="index"
            >
                <div :class="['flashSale-item']">
                    <div class="flash-header">
                        <div
                            class="badge"
                            v-if="product.special_discount_check > 0"
                        >
                            {{
                                product.special_discount_type == "flat"
                                    ? priceFormat(
                                          product.special_discount_check
                                      ) +
                                      " " +
                                      lang.off
                                    : product.special_discount_check +
                                      "% " +
                                      lang.off
                            }}
                        </div>

                        <!-- <span class="base reword-badge" v-if="addons.includes('reward') && product.reward > 0">{{ lang.reward_point }}: {{ product.reward }}</span> -->
                        <FlashCountDown :deadline="formatDeadline(product.end_date)" />
                    </div>
                    <div class="flashSale-inner">
                        <div class="flashSaleThumb">
                            <a
                                :href="getUrl('product/' + product.slug)"
                                @click.prevent="
                                    routerNavigator(
                                        'product.details',
                                        product.slug
                                    )
                                "
                            >
                                <img
                                    :src="product.image_190x230"
                                    :alt="product.product_name"
                                />
                            </a>
                        </div>
                        <div class="flashSale-content">
                            <Rating
                                v-if="product.rating > 0"
                                :rating="product.rating"
                            />

                            <h3 class="title">
                                <a
                                    :href="getUrl('product/' + product.slug)"
                                    @click.prevent="
                                        routerNavigator(
                                            'product.details',
                                            product.slug
                                        )
                                    "
                                >
                                    {{ product.product_name }}
                                </a>
                            </h3>
                            <p class="desc">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Quasi, repellendus.
                            </p>
                            <div class="price">
                                <span
                                    class="current-price"
                                    v-if="product.special_discount_check > 0"
                                    >{{ priceFormat(product.price) }}</span
                                >
                                <span
                                    class="original-price"
                                    v-if="product.special_discount_check > 0"
                                >
                                    {{
                                        priceFormat(product.discount_percentage)
                                    }}
                                </span>

                                <span class="original-price" v-else>
                                    {{ priceFormat(product.price) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Flash Sale Item End -->
    </div>
</template>
<script>
import FlashCountDown from "@/components/FlashCountDown.vue";
import Rating from "@/components/Product/Rating.vue";
import Shimmer from "@/components/Shimmer.vue";

export default {
    components: { FlashCountDown, Rating, Shimmer },
    props: ["products"],

    data() {
        return {
            checkListing: true,
            showModal: false,
            modal_height: 600,
            modal_width: 990,
            is_disabled: false,
        };
    },

    mounted() {
        if (this.authUser) {
            this.pushWishlists();
        }
        this.compareList();
    },
    computed: {
        activeCurrency() {
            return this.$store.getters.getActiveCurrency;
        },
        wishlists() {
            return this.$store.getters.getUserWishlist;
        },
        compareLists() {
            return this.$store.getters.getUserCompare;
        },
        count_compare() {
            return this.$store.getters.getCountCompare;
        },

        productDetails() {
            let products = this.$store.getters.getProductDetails;
            for (let i = 0; i < products.length; i++) {
                if (products[i].slug == this.active_modal) {
                    return products[i].product;
                }
            }
            return false;
        },
        productList() {
            if (
                this.products &&
                this.products.data &&
                this.products.data.length == 0
            ) {
                return (this.products.data = ["id"]);
            } else if (
                this.products &&
                this.products.data &&
                this.products.data.length > 0
            ) {
                return this.products.data;
            } else {
                return [];
            }
        },
    },

    methods: {

        formatDeadline(endDate) {
            if (!endDate) return null;
            const deadlineDate = new Date(endDate);
            deadlineDate.setHours(23, 59, 59);
            return deadlineDate.toISOString().slice(0, 19).replace("T", " ");
        },

        addToWishlist(id) {
            this.is_disabled = true;
            this.$store.commit("addNewWishlistId", id);

            let url = this.getUrl("user/add-to-wishlist/" + id);
            axios.get(url).then((response) => {
                this.is_disabled = false;
                if (response.data.error) {
                    this.$Progress.error();
                    toastr.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.$store.dispatch(
                        "userWishlistProduct",
                        response.data.wishlist
                    );
                    this.$store.dispatch("wishlists", response.data.wishlists);
                    toastr.success(
                        response.data.success,
                        this.lang.Success + " !!"
                    );
                }
            });
        },
        // checkWishlist(product) {
        // 	if (this.checkListing) {
        // 		let length = Object.keys(this.wishlists).length;
        //
        // 		for (let i = 0; i < length; i++) {
        // 			if (this.wishlists[i] && product.id == this.wishlists[i].product_id) {
        // 				return true;
        // 			}
        // 		}
        // 		return false;
        // 	}
        // },
        compareCheck(product) {
            let length = Object.keys(this.compareLists).length;

            for (let i = 0; i < length; i++) {
                if (product.id == this.compareLists[i].id) {
                    return true;
                }
            }
            return false;
        },
        removeWishlist(id) {
            this.checkListing = false;
            this.$store.commit("removeFromWishlistID", id);

            let url = this.getUrl("user/remove-wishlist-product/" + id);
            axios.get(url).then((response) => {
                if (response.data.error) {
                    
                    toastr.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.checkListing = true;
                    this.$store.commit(
                        "getRemoveWishlist",
                        response.data.wishlist
                    );
                    this.$store.dispatch(
                        "wishlists",
                        response.data.totalWishlist
                    );
                    toastr.success(
                        response.data.success,
                        this.lang.Success + " !!"
                    );
                }
            });
        },
        pushWishlists() {
            if (this.wishlists.length > 0) {
                let length = Object.keys(this.wishlists).length;

                if (length == 0) {
                    let product_length = this.products.length;
                    for (let i = 0; i < product_length; i++) {
                        let wishlist = this.products[i].user_wishlist;
                        if (wishlist) {
                            this.$store.dispatch(
                                "userWishlistProduct",
                                wishlist
                            );
                        }
                    }
                }
            }
        },
        compareList() {
            let length = this.compareLists.length;
            let flag = this.count_compare;

            if (length == 0 && flag) {
                this.$store.commit("getCountCompare", false);
                let url = this.getUrl("home/compare-list");
                axios.get(url).then((response) => {
                    if (response.data.error) {
                        toastr.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        let products = response.data.products;
                        // console.log(products);
                        for (let i = 0; i < products.length; i++) {
                            let compare = products[i];
                            if (compare) {
                                this.$store.dispatch(
                                    "userCompareProduct",
                                    compare
                                );
                            }
                        }
                        // this.pushCompare();
                    }
                });
            }
        },
        addToCompare(product) {
            this.is_disabled = true;
            let url = this.getUrl("home/add-to-compare/" + product.id);
            axios.get(url).then((response) => {
                this.is_disabled = false;
                if (response.data.error) {
                    toastr.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.$store.commit("getUserCompare", response.data.product);
                    this.$store.dispatch(
                        "compareList",
                        response.data.compare_list
                    );
                }
            });
        },
        removeCompare(id) {
            let url = this.getUrl("home/remove-compare_product/" + id);
            axios.get(url).then((response) => {
                if (response.data.error) {
                    toastr.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.$store.commit(
                        "getRemoveCompare",
                        response.data.product
                    );
                    this.$store.dispatch(
                        "compareList",
                        response.data.compare_list
                    );
                }
            });
        },
    },
};
</script>
