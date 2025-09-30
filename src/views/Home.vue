<template lang="html">
    <div>
        <slider />

        <services v-if="settings.show_service_info_section == 1" />

        <div v-for="(componentName, index) in supportedComponents" :key="index">
            <component
                :is="componentName"
                :popular_categories="
                    componentName == 'popular_categories' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :top_categories="
                    componentName == 'top_categories' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :today_deals="
                    componentName == 'today_deals' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :banners="
                    componentName == 'banner' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :flash_products="
                    componentName == 'flash_products' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :gadget_product="
                    componentName == 'gadget_product' &&
                    homeResults[index] &&
                    homeResults[index].data.products &&
                    homeResults[index].data.products.length > 0
                        ? homeResults[index].data
                        : []
                "
                :best_selling_product="
                    componentName == 'best_selling_product' &&
                    homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :offer_ending_products="
                    componentName == 'offer_ending' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :custom_products="
                    componentName == 'custom_products' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :blogs="
                    componentName == 'blog' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :brands="
                    componentName == 'brands' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :sellers="
                    componentName == 'top_shop' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :best_shop="
                    componentName == 'best_shop' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :featured_shop="
                    componentName == 'featured_shop' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :express_shop="
                    componentName == 'express_shop' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :download_section="
                    componentName == 'download_section' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :category_sec_banner="
                    componentName == 'gadget_product' && homeResults[index]
                        ? homeResults[index].banner
                        : null
                "
                :category_sec_banner_url="
                    componentName == 'gadget_product' && homeResults[index]
                        ? homeResults[index].banner_url
                        : null
                "
                :offer_ending_banner="
                    componentName == 'offer_ending' && homeResults[index]
                        ? homeResults[index].banner
                        : null
                "
                :offer_ending_banner_url="
                    componentName == 'offer_ending' && homeResults[index]
                        ? homeResults[index].banner_url
                        : null
                "
                :offer_ending_banner_2="
                    componentName == 'offer_ending' && homeResults[index]
                        ? homeResults[index].banner_2
                        : null
                "
                :offer_ending_banner_url_2="
                    componentName == 'offer_ending' && homeResults[index]
                        ? homeResults[index].banner_url_2
                        : null
                "
                :campaigns="
                    componentName == 'campaign' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :latest_products="
                    componentName == 'latest_products' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :business_idea="
                    componentName == 'business_idea' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :gift_idea="
                    componentName == 'gift_idea' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :video_shopping="
                    addons.includes('video_shopping') &&
                    componentName == 'video_shopping' &&
                    homeResults[index]
                        ? homeResults[index].data
                        : []
                "
                :marquee_section="
                    componentName == 'marquee_section' && homeResults[index]
                        ? homeResults[index].data
                        : []
                "



                :products="componentName == 'all_products' && homeResults[index]
                        ? homeResults[index].data
                        : []"
            >
            </component>
        </div>


        <viewed_product v-if="settings.recent_viewed == 1" />
        <!-- <subscribe
            v-if="
                settings.subscription_section &&
                settings.subscription_section == 1
            "
        /> -->
        <deal
            v-if="settings.article_section && settings.article_section == 1"
        />

    </div>
</template>
<script>
import Banner from "@/section/home/Banner.vue";
import Featured from "@/section/home/Featured.vue";

import campaign from "@/section/Campain.vue";
import popular_categories from "@/section/home/PopularCategories.vue";
import top_categories from "@/section/home/TopCategories.vue";
import today_deals from "@/section/home/TodayDeals.vue";
import addBanner from "@/section/home/AddBanner.vue";
import flash_products from "@/section/home/FlashProducts.vue";
import custom_products from "@/section/home/CustomProduct.vue";
import gadget_product from "@/section/home/GadgetProduct.vue";
import best_selling_product from "@/section/home/BestSellingProduct.vue";
import offer_ending from "@/section/home/OfferEnding.vue";
import blog from "@/section/home/Blog.vue";
import viewed_product from "@/section/home/ViewedProduct.vue";
import subscribe from "@/section/home/Subscribe.vue";
import deal from "@/section/home/Article.vue";
import brand from "@/section/home/Brand.vue";
import top_shop from "@/section/home/TopShop.vue";
import best_shop from "@/section/home/BestShop.vue";
import featured_shop from "@/section/home/FeaturedShop.vue";
import express_shop from "@/section/home/ExpressShop.vue";
import download_section from "@/section/home/DownloadSection.vue";
import latest_products from "@/section/home/LatestProduct.vue";
import business_idea from "@/section/home/BusinessIdea.vue";
import gift_idea from "@/section/home/GiftIdea.vue";
import video_shop from "@/section/home/VideoShop.vue";
import all_products from "@/section/home/AllProduct.vue";
import marquee_section from "@/section/home/Marquee.vue";

export default {
    components: {
        slider: Banner,
        services: Featured,

        banner: addBanner,
        campaign: campaign,
        popular_categories: popular_categories,
        top_categories: top_categories,
        today_deals: today_deals,
        flash_products: flash_products,
        latest_products: latest_products,
        business_idea: business_idea,
        gift_idea: gift_idea,
        gadget_product: gadget_product,
        best_selling_product: best_selling_product,
        offer_ending: offer_ending,
        blog: blog,
        custom_products: custom_products,
        viewed_product: viewed_product,
        subscribe: subscribe,
        deal: deal,
        brands: brand,
        top_shop: top_shop,
        best_shop: best_shop,
        express_shop: express_shop,
        featured_shop: featured_shop,
        download_section: download_section,
        video_shopping: video_shop,
        all_products: all_products,
        marquee_section: marquee_section,
    },

    data() {
        return {
            scroll_continue: true,
            scroller_key: 0,
            supportedComponents: [],
            results: [],
            video_shops: [],
            paginate: 1,
        };
    },

    mounted() {
        // show toast message
        // const msg = sessionStorage.getItem("toast");
        // if (msg) {
        //     this.$toast.success(msg, this.lang.Success + " !!");
        //     sessionStorage.removeItem("toast");
        // }

        this.loadComponents();

        if (this.homeResponse) {
            this.$store.commit("setShimmer", 0);
        }
    },
    computed: {
        homeComponents() {
            return this.$store.getters.getHomeComponents;
        },
        homeResults() {
            return this.$store.getters.getHomeResults;
        },
        homeScroller() {
            return this.$store.getters.getHomeScroller;
        },
    },
    watch: {
        homeComponents() {
            this.loadComponents();
        },
        homeResponse() {
            this.$store.commit("setShimmer", 0);
        },
    },
    methods: {

        getComponentData(name) {
            const idx = this.supportedComponents.findIndex((c) => c === name);
            return idx !== -1 && this.homeResults[idx]
                ? this.homeResults[idx].data
                : [];
        },

        submit() {
            let url = this.getUrl("home/subscribers");
            axios
                .post(url, this.form)
                .then((response) => {
                    if (response.data.success) {
                        // $("#pop_up").modal("hide");
                        this.$toast.success(
                            response.data.success,
                            this.lang.Success + " !!"
                        );
                        this.form.email = "";
                    } else {
                        if (response.data.error) {
                            this.$toast.error(
                                response.data.error,
                                this.lang.Error + " !!"
                            );
                        }
                    }
                })
                .catch((error) => {
                    if (error.response.status == 422) {
                        let errors = Object.keys(error.response.data.errors);
                        for (let i = 0; i <= errors.length; i++) {
                            this.$toast.error(
                                error.response.data.errors[errors[i]][0],
                                this.lang.Error + " !!"
                            );
                        }
                    }
                });
        },
        loadComponents() {
            let keys = this.homeComponents;

            if (keys.length > 0) {
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] == "popular_category") {
                        this.results.push({
                            key: "popular_categories",
                            data: {},
                        });
                        this.supportedComponents.push("popular_categories");
                    }

                    // console.log(keys[i]);

                    if (keys[i] == "all_products") {
                        this.results.push({ key: "all_products", data: {} });
                        this.supportedComponents.push("all_products");
                    }

                    if (keys[i] == "marquee_section") {
                        this.results.push({ key: "marquee_section", data: {} });
                        this.supportedComponents.push("marquee_section");
                    }

                    if (keys[i] == "top_category") {
                        this.results.push({ key: "top_categories", data: {} });
                        this.supportedComponents.push("top_categories");
                    }
                    if (keys[i] == "todays_deal") {
                        this.results.push({ key: "today_deals", data: {} });
                        this.supportedComponents.push("today_deals");
                    }
                    if (keys[i] == "banner") {
                        this.results.push({ key: "banner", data: {} });
                        this.supportedComponents.push("banner");
                    }
                    if (keys[i] == "flash_deal") {
                        this.results.push({ key: "flash_products", data: {} });
                        this.supportedComponents.push("flash_products");
                    }
                    if (keys[i] == "latest_product") {
                        this.results.push({ key: "latest_products", data: {} });
                        this.supportedComponents.push("latest_products");
                    }
                    if (keys[i] == "business_idea") {
                        this.results.push({ key: "business_idea", data: {} });
                        this.supportedComponents.push("business_idea");
                    }
                    if (keys[i] == "gift_idea") {
                        this.results.push({ key: "gift_idea", data: {} });
                        this.supportedComponents.push("gift_idea");
                    }
                    if (keys[i] == "category_section") {
                        this.results.push({
                            key: "gadget_product",
                            data: {},
                            banner: null,
                            banner_url: null,
                        });
                        this.supportedComponents.push("gadget_product");
                    }
                    if (keys[i] == "best_selling_products") {
                        this.results.push({
                            key: "best_selling_product",
                            data: {},
                        });
                        this.supportedComponents.push("best_selling_product");
                    }
                    if (keys[i] == "offer_ending_soon") {
                        this.results.push({
                            key: "offer_ending",
                            data: {},
                            banner: null,
                            banner_url: null,
                        });
                        this.supportedComponents.push("offer_ending");
                    }

                    if (keys[i] == "latest_news") {
                        this.results.push({ key: "blog", data: {} });
                        this.supportedComponents.push("blog");
                    }
                    if (keys[i] == "popular_brands") {
                        this.results.push({ key: "brands", data: {} });
                        this.supportedComponents.push("brands");
                    }
                    if (keys[i] == "top_sellers") {
                        this.results.push({ key: "top_sellers", data: {} });
                        this.supportedComponents.push("top_shop");
                    }
                    if (keys[i] == "best_sellers") {
                        this.results.push({ key: "best_sellers", data: {} });
                        this.supportedComponents.push("best_shop");
                    }
                    if (keys[i] == "featured_sellers") {
                        this.results.push({
                            key: "featured_sellers",
                            data: {},
                        });
                        this.supportedComponents.push("featured_shop");
                    }
                    if (keys[i] == "express_sellers") {
                        this.results.push({ key: "express_sellers", data: {} });
                        this.supportedComponents.push("express_shop");
                    }
                    if (keys[i] == "download_section") {
                        this.results.push({
                            key: "download_section",
                            data: {},
                        });
                        this.supportedComponents.push("download_section");
                    }
                    if (keys[i] == "campaign") {
                        this.results.push({ key: "campaign", data: {} });
                        this.supportedComponents.push("campaign");
                    }
                    if (keys[i] == "video_shopping") {
                        this.results.push({ key: "video_shopping", data: {} });
                        this.supportedComponents.push("video_shopping");
                    }
                    if (keys[i] == "custom_products") {
                        this.results.push({ key: "custom_products", data: {} });
                        this.supportedComponents.push("custom_products");
                    }
                }
                this.scrollData();
            }
        },

        // scroll Another Data
        scrollData() {
            let url = this.getUrl("home/page?page=" + this.paginate);
            this.scroll_continue = false;

            if (this.homeScroller) {
                axios.get(url).then((response) => {
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                        
                    } else {
                        let fetch_components = response.data.component_names;
                        let data = this.homeResponse;
                        for (let i = 0; i < fetch_components.length; i++) {
                            data.push(fetch_components[i]);
                        }
                        this.paginate++;
                        this.$store.commit("setResponseDone", data);
                        this.componentAppend(response.data.components);
                        this.$store.commit(
                            "setHomeScroller",
                            response.data.has_more_data
                        );
                        if (this.homeScroller && fetch_components.length > 0) {
                            this.scrollData();
                        }
                    }
                });
            }
        },

        componentAppend(home_component) {
            let components = Object.keys(home_component);

            for (let i = 0; i < components.length; i++) {
                let component = components[i].split("-");

                if (component[0] == "banners") {
                    this.dataReplace("banner", home_component[components[i]]);
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "campaigns") {
                    this.dataReplace("campaign", home_component[components[i]]);
                    this.scroll_continue = true;
                    this.scroller_key++;
                }

                if (component[0] == "all_products") {
                    this.dataReplace(
                        "all_products",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }

                if (component[0] == "marquee_section") {
                    this.dataReplace(
                        "marquee_section",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }

                if (component[0] == "popular_categories") {
                    this.dataReplace(
                        "popular_categories",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "best_selling_product") {
                    this.dataReplace(
                        "best_selling_product",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "top_categories") {
                    this.dataReplace(
                        "top_categories",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "today_deals") {
                    this.dataReplace(
                        "today_deals",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "flash_products") {
                    this.dataReplace(
                        "flash_products",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "latest_products") {
                    this.dataReplace(
                        "latest_products",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "business_idea") {
                    this.dataReplace(
                        "business_idea",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "gift_idea") {
                    this.dataReplace(
                        "gift_idea",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "gadget_product") {
                    this.dataReplace("gadget_product", home_component);
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "offer_ending") {
                    this.dataReplace("offer_ending", home_component);
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "blog") {
                    this.dataReplace("blog", home_component[components[i]]);
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "brands") {
                    this.dataReplace("brands", home_component[components[i]]);
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "sellers") {
                    this.dataReplace("sellers", home_component[components[i]]);
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "best_sellers") {
                    this.dataReplace(
                        "best_sellers",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "featured_sellers") {
                    this.dataReplace(
                        "featured_sellers",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "express_sellers") {
                    this.dataReplace(
                        "express_sellers",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "download_section") {
                    this.dataReplace(
                        "download_section",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "video_shopping") {
                    this.dataReplace(
                        "video_shopping",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
                if (component[0] == "custom_products") {
                    this.dataReplace(
                        "custom_products",
                        home_component[components[i]]
                    );
                    this.scroll_continue = true;
                    this.scroller_key++;
                }
            }
            this.$store.commit("getHomeResults", this.results);
        },
        dataReplace(key, data) {
            if (key == "offer_ending") {
                this.results[this.scroller_key] = {
                    key: "offer_ending",
                    data: data["offer_ending-" + this.scroller_key],

                    banner: data["offer_ending_banner-" + this.scroller_key],
                    banner_url:
                        data["offer_ending_banner_url" + this.scroller_key],

                    banner_2:
                        data["offer_ending_banner_2-" + this.scroller_key],
                    banner_url_2:
                        data["offer_ending_banner_url_2" + this.scroller_key],
                };
            } else if (key == "gadget_product") {
                this.results[this.scroller_key] = {
                    key: "gadget_product",
                    data: data["gadget_product-" + this.scroller_key],
                    banner: data["category_sec_banner-" + this.scroller_key],
                    banner_url:
                        data["category_sec_banner_url-" + this.scroller_key],
                };
            } else {
                this.results[this.scroller_key].data = data;
            }
        },
    },
};
</script>
