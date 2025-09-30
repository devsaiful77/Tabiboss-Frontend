<template lang="html">
    <section class="campain-details pt-40 pb-100">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="productFilter-ads mt-60">
                        <a
                            href="javascript:void(0)"
                            class="ads-thumb"
                            v-if="lengthCounter(productList) > 0"
                        >
                            <div class="campaign-details-thumb">
                                <img
                                    :src="campaign.image_1920x412"
                                    alt="Campaign"
                                />

                            </div>
                        </a>
                        <a
                            href="javascript:void(0)"
                            class="ads-thumb"
                            v-else-if="shimmer"
                        >
                            <Shimmer :height="412" />
                        </a>
                    </div>
                </div>
            </div>

            <!-- row -->
            <div class="row">
                <div class="col-12">
                    <div class="tabs customTabs-wrapper pt-60">
                        <!-- Tab Headers -->
                        <ul class="tabList-item" v-if="lengthCounter(productList) > 0 && productList[0] != 'id'">
                            <li
                                :class="{ active: activeTab === 'products' }"
                                @click="campaignProducts"
                            >
                                {{ lang.products }}
                            </li>

                            <li
                                :class="{ active: activeTab === 'brands' }"
                                @click="brandActive"
                            >
                                {{ lang.brands }}
                            </li>

                            <li
                                :class="{ active: activeTab === 'shops' }"
                                @click="shopActive"
                            >
                                {{ lang.shops }}
                            </li>
                        </ul>

                        <!-- Tab Content -->
                        <div class="tab-body">
                            <div class="tab-content">
                                <div class="tab-body">
                                    <!-- product tab -->
                                    <div
                                        v-if="'products' === activeTab"
                                        class="product-desc-table"
                                    >
                                        <div class="row" v-if="lengthCounter(productList) > 0">
                                            <div class="col-lg-12">
                                                <div
                                                    class="productFilter-item"
                                                    v-if="
                                                        lengthCounter(
                                                            productList
                                                        ) > 0
                                                    "
                                                >
                                                    <!-- product Filter Title -->
                                                    <div
                                                        class="productFilter-title"
                                                    >
                                                        <div class="title-wrap">
                                                            <h4 class="title">
                                                                {{ lang.all_products }}
                                                            </h4>
                                                            <div
                                                                class="showItem"
                                                            >
                                                                {{ lang.Showing }} {{ productList.length }}
                                                            </div>
                                                        </div>
                                                        <!-- product Filter  List Grid View -->
                                                        <div
                                                            class="listGrid-view"
                                                        >
                                                            <div
                                                                class="grid"
                                                                :class="{
                                                                    active: isGrid,
                                                                }"
                                                                @click="
                                                                    isGrid = true
                                                                "
                                                            >
                                                                <GridSVG />
                                                            </div>
                                                            <div
                                                                class="list"
                                                                :class="{
                                                                    active: !isGrid,
                                                                }"
                                                                @click="
                                                                    isGrid = false
                                                                "
                                                            >
                                                                <ListSVG />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Product Filter Here -->
                                                    <div
                                                        class="productFilter-inner mt-30"
                                                    >
                                                        <div
                                                            class="row"
                                                            v-if="isGrid"
                                                        >
                                                            <div
                                                                class="grid-5 mb-20"
                                                            >
                                                                <!-- <ProductItem v-for="items in products" :key="items.id" :item="items" /> -->
                                                                <template
                                                                    v-for="(
                                                                        item,
                                                                        index
                                                                    ) in productList"
                                                                    :key="index"
                                                                >
                                                                    <ProductItem
                                                                        :product="
                                                                            item
                                                                        "
                                                                        :number="
                                                                            8
                                                                        "
                                                                        :grid_class="'grid-4'"
                                                                    />
                                                                </template>
                                                            </div>
                                                        </div>
                                                        <div class="row" v-else>
                                                            <div
                                                                class="col-md-12 col-sm-12"
                                                                v-for="(
                                                                    item, index
                                                                ) in productList"
                                                                :key="index"
                                                            >
                                                                <ProductListItem
                                                                    :product="
                                                                        item
                                                                    "
                                                                    :number="8"
                                                                    :grid_class="'grid-4'"
                                                                />
                                                            </div>
                                                        </div>

                                                        <!-- show more -->
                                                        <div
                                                            class="show-more text-center"
                                                            v-if="
                                                                product_next_page_url &&
                                                                !loading
                                                            "
                                                        >
                                                            <a
                                                                href="javaScript:void(0)"
                                                                @click="
                                                                    loadMoreData(
                                                                        product_next_page_url
                                                                    )
                                                                "
                                                                class="btn btn-primary"
                                                                >{{
                                                                    lang.show_more
                                                                }}</a
                                                            >
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- with shimmer -->
                                                <div
                                                    class="productFilter-item"
                                                    v-else-if="shimmer"
                                                >
                                                    <!-- product Filter Title -->
                                                    <div
                                                        class="productFilter-title"
                                                    >
                                                        <Shimmer :height="50" />
                                                    </div>
                                                    <!-- Product Filter Here -->
                                                    <div
                                                        class="productFilter-inner mt-30"
                                                    >
                                                        <div class="row">
                                                            <div
                                                                class="grid-5 mb-20"
                                                            >
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    v-for="(
                                                                        product,
                                                                        index
                                                                    ) in 15"
                                                                >
                                                                    <shimmer
                                                                        :height="
                                                                            300
                                                                        "
                                                                    ></shimmer>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- brand tab -->
                                    <div v-if="'brands' === activeTab">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="productFilter-item">
                                                    <!-- product Filter Title -->
                                                    <div
                                                        class="productFilter-title"
                                                    >
                                                        <div
                                                            class="title-wrap"
                                                            v-if="
                                                                responseCheck &&
                                                                brands.data &&
                                                                brands.data
                                                                    .length == 0
                                                            "
                                                        >
                                                            <h4 class="title">
                                                                {{
                                                                    lang.no_data_found
                                                                }}
                                                            </h4>
                                                        </div>

                                                        <div
                                                            class="title-wrap"
                                                            v-if="
                                                                responseCheck &&
                                                                brands.data &&
                                                                brands.data.length >
                                                                    0
                                                            "
                                                        >
                                                            <h4 class="title">
                                                                {{
                                                                    lang.pos_all_brands
                                                                }}
                                                            </h4>
                                                            <div
                                                                class="showItem"
                                                            >
                                                                {{ brands.data.length}}

                                                                {{lang.Brands}}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Product Filter Here -->
                                                    <div
                                                        class="productFilter-inner mt-30"
                                                        v-if="
                                                            responseCheck &&
                                                            brands.data &&
                                                            brands.data.length >
                                                                0
                                                        "
                                                    >
                                                        <div class="row">
                                                            <div
                                                                class="col-lg-2 col-md-3 col-sm-4"
                                                                v-for="(
                                                                    brand, i
                                                                ) in brands.data"
                                                                :key="
                                                                    'brands' + i
                                                                "
                                                            >
                                                                <!-- Brand Item Start -->
                                                                <a
                                                                    class="brandItem"
                                                                    :href="
                                                                        getUrl(
                                                                            'brand/' +
                                                                                brand.slug
                                                                        )
                                                                    "
                                                                    @click.prevent="
                                                                        routerNavigator(
                                                                            'product.by.brand',
                                                                            brand.slug
                                                                        )
                                                                    "
                                                                >
                                                                    <div
                                                                        class="brandItem-thumb"
                                                                    >
                                                                        <img
                                                                            loading="lazy"
                                                                            :src="
                                                                                brand.image_130x93
                                                                            "
                                                                            :alt="
                                                                                brand.title
                                                                            "
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        class="brandItem-content"
                                                                    >
                                                                        <h4
                                                                            class="title"
                                                                        >
                                                                            {{
                                                                                brand.title
                                                                            }}
                                                                        </h4>
                                                                    </div>
                                                                </a>
                                                                <!-- Brand Item End -->
                                                            </div>
                                                        </div>

                                                        <!-- show more -->
                                                        <div
                                                            class="show-more text-center"
                                                            v-if="
                                                                brand_next_page_url &&
                                                                !loading
                                                            "
                                                        >
                                                            <a
                                                                href="javaScript:void(0)"
                                                                @click="
                                                                    loadMoreData(
                                                                        brand_next_page_url
                                                                    )
                                                                "
                                                                class="btn btn-primary"
                                                                >{{
                                                                    lang.show_more
                                                                }}</a
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- shops -->
                                    <div v-if="'shops' === activeTab">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="productFilter-item">
                                                    <!-- product Filter Title -->
                                                    <div
                                                        class="productFilter-title"
                                                    >
                                                        <div
                                                            class="title-wrap"
                                                            v-if="
                                                                responseCheck &&
                                                                shops.data &&
                                                                shops.data
                                                                    .length == 0
                                                            "
                                                        >
                                                            <h4 class="title">
                                                                {{
                                                                    lang.no_data_found
                                                                }}
                                                            </h4>
                                                        </div>

                                                        <div
                                                            class="title-wrap"
                                                            v-if="
                                                                responseCheck &&
                                                                shops.data &&
                                                                shops.data
                                                                    .length > 0
                                                            "
                                                        >
                                                            <h4 class="title">
                                                                {{
                                                                    lang.all_seller
                                                                }}
                                                            </h4>
                                                            <div
                                                                class="showItem"
                                                            >
                                                                {{
                                                                    shops.data
                                                                        .length
                                                                }}
                                                                +
                                                                {{
                                                                    lang.Sellers
                                                                }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Product Filter Here -->
                                                    <div
                                                        class="productFilter-inner mt-30"
                                                    >
                                                        <div class="row">
                                                            <template
                                                                v-if="
                                                                    is_shimmer
                                                                "
                                                            >
                                                                <div
                                                                    class="col-xl-3 col-lg-4 col-md-4 col-sm-6"
                                                                    v-for="(
                                                                        shop,
                                                                        index
                                                                    ) in shops.data"
                                                                    :key="index"
                                                                >
                                                                    <VendorItem
                                                                        :shop="shop"
                                                                    />
                                                                </div>
                                                            </template>

                                                            <template v-else>
                                                                <div
                                                                    class="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-4"
                                                                    v-for="(
                                                                        product,
                                                                        index
                                                                    ) in 8"
                                                                    :key="index"
                                                                >
                                                                    <Shimmer
                                                                        :height="
                                                                            300
                                                                        "
                                                                    />
                                                                </div>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- row -->
        </div>
    </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import ProductListItem from "@/components/Product/ListItem.vue";
import ProductItem from "@/components/Product/Item.vue";
import VendorItem from "@/components/Store.vue";
import VueSelect from "vue3-select-component";
import ListSVG from "@/svg/ListSVG.vue";
import GridSVG from "@/svg/GridSVG.vue";

export default {
    components: {
        Shimmer,
        ProductListItem,
        VendorItem,
        ProductItem,
        VueSelect,
        ListSVG,
        GridSVG,
    },

    data() {
        return {
            isGrid: true,
            activeTab: "products",
            activeClass: "",
            skip: 1,
            show_load_more: true,
            active: 0,
            loading: false,
            page: 1,
            product_next_page_url: false,
            brand_next_page_url: false,
            shop_next_page_url: false,
            url: "",
            fetched_campaign: "",
            checkListing: true,
            is_shimmer: false,
        };
    },
    mounted() {
        this.campaignProducts();
        if (this.lengthCounter(this.shops) > 0) {
            this.is_shimmer = true;
        }
    },
    computed: {
        baseUrl() {
            return this.$store.getters.getBaseUrl;
        },
        products() {
            let products = this.$store.getters.getCampaignProducts;
            for (let i = 0; i < products.length; i++) {
                if (products[i].slug == this.$route.params.slug) {
                    return products[i].products;
                }
            }
            return [];
        },
        brands() {
            let brands = this.$store.getters.getCampaignBrands;
            for (let i = 0; i < brands.length; i++) {
                if (brands[i].slug == this.$route.params.slug) {
                    return brands[i].brands;
                }
            }
            return [];
        },
        shops() {
            let shops = this.$store.getters.getCampaignShops;
            for (let i = 0; i < shops.length; i++) {
                if (shops[i].slug == this.$route.params.slug) {
                    return shops[i].shops;
                }
            }
            return [];
        },
        campaign() {
            return this.fetched_campaign;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },
        productList() {
            if (
                this.products &&
                this.products.data &&
                this.products.data.length == 0
            ) {
                return ["id"];
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
        campaignProducts() {
            let requestData = {
                slug: this.$route.params.slug,
            };
            this.activeTab = "products";

            let url = this.baseUrl + "/home/campaign-products";

            if (this.lengthCounter(this.products) > 0) {
                this.product_next_page_url = this.products.next_page_url;
                let found = this.$store.getters.getCampaignStore.filter(
                    (val) => val.slug == this.$route.params.slug
                );
                if (found) {
                    this.fetched_campaign = found[0];
                }
                return this.products;
            }

            axios.get(url, { params: requestData }).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                }
                this.fetched_campaign = response.data.campaign;
                this.$store.commit("setCampaignStore", response.data.campaign);

                this.product_next_page_url =
                    response.data.products.next_page_url;
                let data = {
                    slug: this.$route.params.slug,
                    products: response.data.products,
                };
                this.$store.commit("getCampaignProducts", data);
            });
        },
        loadMoreData(url, type) {
            let requestData = {
                slug: this.$route.params.slug,
                type: type,
            };
            this.loading = true;
            axios.get(url, { params: requestData }).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.loading = false;
                    if (response.data.products) {
                        this.product_next_page_url =
                            response.data.products.next_page_url;
                        let data = {
                            slug: this.$route.params.slug,
                            products: response.data.products,
                        };
                        this.$store.commit("getCampaignProducts", data);
                    } else if (response.data.brands) {
                        let data = {
                            slug: this.$route.params.slug,
                            brands: response.data.brands,
                        };
                        this.brand_next_page_url =
                            response.data.brands.next_page_url;
                        this.$store.commit("getCampaignBrands", data);
                    } else if (response.data.shops) {
                        let data = {
                            slug: this.$route.params.slug,
                            shops: response.data.shops,
                        };
                        this.shop_next_page_url =
                            response.data.shops.next_page_url;
                        this.$store.commit("getCampaignShops", data);
                    }
                }
            });
        },
        brandActive() {
            this.activeTab = "brands";
            if (this.lengthCounter(this.brands) != 0) {
                this.brand_next_page_url = this.brands.next_page_url;
                return this.brands;
            }
            let url = this.baseUrl + "/home/campaign-brands";
            this.loading = true;
            let requestData = {
                slug: this.$route.params.slug,
                type: "brand",
            };
            axios.get(url, { params: requestData }).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                }
                this.loading = false;
                this.$store.commit("setResponseCheck", true);
                let data = {
                    slug: this.$route.params.slug,
                    brands: response.data.brands,
                };
                this.brand_next_page_url = response.data.brands.next_page_url;
                this.next_page_url = this.brand_next_page_url;
                this.$store.commit("getCampaignBrands", data);
            });
        },
        shopActive() {
            this.activeTab = "shops";
            if (this.lengthCounter(this.shops) != 0) {
                this.shop_next_page_url = this.shops.next_page_url;
                return this.shops;
            }
            let url = this.baseUrl + "/home/campaign-brands";
            this.loading = true;
            let requestData = {
                slug: this.$route.params.slug,
                type: "shop",
            };
            axios.get(url, { params: requestData }).then((response) => {
                this.is_shimmer = true;
                this.loading = false;
                this.$store.commit("setResponseCheck", true);
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    let data = {
                        slug: this.$route.params.slug,
                        shops: response.data.shops,
                    };
                    this.shop_next_page_url = response.data.shops.next_page_url;
                    this.$store.commit("getCampaignShops", data);
                }
            });
        },
    },
};
</script>
