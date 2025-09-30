<template lang="html">
    <div class="cart-form">
        <div class="cart-header">
            <h4 class="store-title">{{ lengthCounter(sellers) == 0 ? lang.no_seller_founds : lang.all_seller }}</h4>
        </div>
        <div class="cuponCard-wrapper p-4">
            <div class="row">
                <div
                    v-if="lengthCounter(sellers) == 0"
                    class="empty-status text-center"
                >
                    <div class="thumb">
                        <img
                            :src="static_image_url + 'shop-empty.svg'"
                            alt="voucher"
                        />
                    </div>
                    <h4 class="text-capitalize mb-20">
                        {{lang.no_seller_founds}}
                    </h4>
                    <router-link
                        class="btn text-primary p-0"
                        :to="{ name: 'dashboard' }"
                        >{{ lang.dashboard }} <i class="ri-arrow-right-line"></i
                    ></router-link>
                </div>
                <div
                    v-else
                    class="col-lg-4 col-md-6"
                    v-for="(shop, index) in sellers"
                    :key="index"
                >
                    <VendorItem :shop="shop" />
                </div>



                <!--
                v-for="(shop, index) in sellers"
                    :key="index"
                >


                 -->
            </div>
        </div>
    </div>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import VendorItem from "@/components/Store.vue";

export default {
    data() {
        return {
            static_image_url: this.getUrl("frontends/images/"),
            current: "followed_shop",
            page: 1,
            loading: false,
            next_page_url: false,
            is_shimmer: false,
        };
    },
    mounted() {
        if (this.lengthCounter(this.sellers) == 0) {
            this.$store.dispatch("FollowedSellers");
        }

        if (this.lengthCounter(this.allFollowedSellers) > 0) {
            this.is_shimmer = true;
        }
    },
    components: {
        Shimmer,
        VendorItem,
    },
    watch: {
        sellers(newValue, oldValue) {
            this.is_shimmer = true;
        },
    },
    computed: {
        shimmer() {
            return this.$store.state.module.shimmer;
        },
        sellers() {
            return this.$store.getters.getFollowedSellers.filter(
                (seller) => seller.id > 0
            );
        },
        allFollowedSellers() {
            return this.$store.getters.getFollowedSellers;
        },
        userShop() {
            return this.$store.getters.getShopFollwer;
        },
    },
    methods: {
        loadSellers() {
            let url = this.getUrl("user/followed-sellers?page=" + this.page);
            this.$progress.start();
            axios.get(url).then((response) => {
                if (response.data.error) {
                    toastr.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.$store.commit(
                        "setFollowedSellers",
                        response.data.sellers.data
                    );
                    this.next_page_url = response.data.sellers.next_page_url;
                    this.page++;
                    this.$progress.finish();
                }
            });
        },
    },
};
</script>
