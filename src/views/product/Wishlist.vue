<template lang="html">
    <div>
        <!-- Breadcrumb Section Start -->
        <section class="breadcrumb-section bg-color py-10">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="breadcrumb-area">
                            <ul class="list">
                                <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
                                <li v-if="lengthCounter(wishlists.data)>0">{{ lang.my_wishlist }}</li>
                                <li v-else-if="is_shimmer">{{ lang.no_wishlist_found }}</li>
                                <li v-else>{{ lang.loading }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- Wishlist Section Start -->
        <section class="wishlist-section pt-60 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="wishlist-wrapper" v-if="is_shimmer">
                            <div class="cart-form">
                                <div class="cart-header text-center">
                                    <h4 class="store-title" v-if="lengthCounter(wishlists.data)>0">{{ lang.my_wishlist }}</h4>
                                    <h4 class="store-title" v-else-if="is_shimmer">{{ lang.no_wishlist_found }}</h4>
                                    <h4 class="store-title" v-else>{{ lang.loading }}</h4>
                                </div>
                                <div class="table-responsive">
                                    <div v-if="wishlists.data.length === 0">
                                        <p class="text-center mb-3 mt-3">{{ lang.your_wishlist_is_empty }}</p>
                                    </div>
                                    <table v-else>
                                        <thead>
                                            <tr>
                                                <th class="cart-pd-number">#</th>
                                                <th scope="cart-pd-thumb">{{ lang.product }}</th>
                                                <th scope="cart-pd-status">{{ lang.status }}</th>
                                                <th scope="cart-pd-addCart">{{ lang.date }}</th>
                                                <th scope="cart-pd-price">{{ lang.total }}</th>
                                                <th scope="cart-pd-action">{{ lang.action }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(product,i) in wishlists.data" :key="i">
                                                <td class="cart-pd-number">{{ i+1 }}</td>
                                                <td class="cart-pd-thumb">
                                                    <div class="product-card--inline">
                                                        <router-link :to="{name: 'product.details', params: {slug:product.slug}}" class="product-image">
                                                            <img :src="product.image_72x72" :alt="product.product_name">
                                                        </router-link>
                                                        <div class="product-content">
                                                            <div class="product-title text-start">{{ product.product_name }}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="cart-pd-status text-nowrap" data-title="Status">
                                                    <div class="complete" v-if="product.current_stock > 0">
                                                        <span>{{ lang.in_stock }}</span>
                                                    </div>
                                                    <div class="cancel" v-else>
                                                        <span>{{ lang.out_of_stock }}</span>
                                                    </div>
                                                </td>
                                                <td class="cart-pd-price" data-title="Date">{{ product.date }}</td>

                                                <td class="cart-pd-price" data-title="Price">
                                                    <span class="price ">
                                                            <del class="cmr-3" v-if="product.special_discount_check > 0">{{ priceFormat(product.price)}}</del>
                                                            <span class="cmr-3" v-if="product.special_discount_check > 0">{{
                                                                    priceFormat(product.discount_percentage)
                                                                }}</span>
                                                            <span v-else>{{ priceFormat(product.price) }}</span>
                                                    </span>
                                                </td>

                                                <td class="cart-pd-addCart" data-title="Action">
                                                    <button class="btn btn-sm btn-primary text-nowrap" v-if="product.status == 'published'" @click="cartBtn(product.product)">{{ lang.add_to_cart }}</button>
                                                    <button class="btn btn-sm btn-danger text-nowrap" @click="removeProduct(product.product,i)">{{ lang.remove }}</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="show-more-button text-center mt-5" v-if="next_page_url">
                            <loading_button v-if="loading" :class_name="'btn btn-primary'"></loading_button>
                            <a href="javascript:void(0)" v-else @click="loadMoreData()"
                                class="btn btn-primary">{{ lang.show_more }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Wishlist Section End -->



    </div>
</template>
<script>
import Shimmer from '@/components/Shimmer.vue';
export default {
    data() {
        return {
            current: 'wishlist',
            url: "",
            show_load_more: true,
            page: 2,
            next_page_url: false,
            active_modal: '',
            is_shimmer: false,
            loading: false,
        }
    },
    components: {
        Shimmer
    },

    computed: {
        wishlists() {
            return this.$store.getters.getAllWishlists;
        },
        shimmer() {
            return this.$store.state.module.shimmer
        },
    },
    mounted() {

        if (this.lengthCounter(this.wishlists.data) == 0) {
            this.allWishlists();
        }
        if (this.lengthCounter(this.wishlists.data) > 0) {
            this.is_shimmer = true
        }
    },
    methods: {
        loadMoreData() {
            let data = {
                page: this.page,
            };
            this.loading = true;
            this.url = this.getUrl('user/wishlists?page=' + data.page);
            axios.get(this.url).then((response) => {
                this.loading = false;
                if (response.data.error) {
                    this.$toast.error(response.data.error, this.lang.Error + ' !!');
                } else {
                    let products = response.data.wishlist.data;

                    if (products.length > 0) {
                        for (let i = 0; i < products.length; i++) {
                            this.wishlists.data.push(products[i]);
                        }
                    }
                    this.page++;
                    this.next_page_url = response.data.wishlist.next_page_url;
                }
            }).catch((error) => {
                this.is_shimmer = true
                if (error.response && error.response.status == 422) {
                    this.$toast.error('Something Went Wrong', this.lang.Error + ' !!');
                }
            });
        },
        removeProduct(product, i) {
            let url = this.getUrl('user/remove-wishlist-product/' + product.id);
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(response.data.error, this.lang.Error + ' !!');
                } else {
                    this.$toast.success(response.data.success, this.lang.Success + ' !!');
                    this.$store.dispatch('wishlists', response.data.totalWishlist);
                    this.$store.commit('getRemoveWishlist', response.data.wishlist);
                    this.wishlists.data[i].id = '';
                    this.wishlists.data.splice(i, 1);

                }
            });
        },
        allWishlists() {
            this.url = this.getUrl('user/wishlists')
            axios.get(this.url).then((response) => {
                this.is_shimmer = true
                if (response.data.error) {
                    this.$toast.error(response.data.error, this.lang.Error + ' !!');
                } else {
                    this.next_page_url = response.data.wishlist.next_page_url;
                    this.$store.commit('getWishlists', response.data.wishlist);
                    this.$store.commit('setShimmer', 0);

                }
            }).catch((error) => {
                this.is_shimmer = true
                if (error.response && error.response.status == 422) {
                    this.$toast.error('Somthing Went Wrong', this.lang.Error + ' !!');
                }
            });
        },
    }
}
</script>

<style scoped>
.cmr-3 {
    margin-right: 11px;
    display: inline-block;
}
</style>
