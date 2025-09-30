<template lang="html">
    <vue3-progress />
    <router-view></router-view>
</template>

<script>
export default {
    props: [
        "languages",
        "flags",
        "currencies",
        "user",
        "user_wishlists",
        "active_language",
        "active_currency",
        "wishlists",
        "carts",
        "categories",
        "sliders",
        "services",
        "settings_data",
        "viewed_products",
        "pages",
        "compare_list",
        "default_currency",
        "home_components",
        "default_assets",
        "add_ons",
        "shop_follower",
        "lang_keywords",
        "banners",
        "product_sold"
    ],

    data() {
        return {
            form: {
                email: "",
            },
            popup: false,
            dont_show: 0,
            modal_height: 450,
            modal_width: 900,
        };
    },

    mounted() {
        this.$progress.finish();
        let element = document.getElementById("37142846");
        if (!element) {
            alert(
                "Something went wrong with your Script, Please contact to the script author"
            );
        }
        setTimeout(() => {
            if (!this.addons.includes("ishopet")) {
                this.changeCurrency(this.active_currency);
            }
            this.showModal();
            this.viewedProducts();
        }, 10000);

        this.$store.dispatch("languages", this.languages);
        this.$store.dispatch("product_sold", this.product_sold);
        this.$store.dispatch("currencies", this.currencies);
        this.$store.dispatch("user", this.user);
        this.$store.dispatch("activeLanguage", this.active_language);
        this.$store.dispatch("activeCurrency", this.active_currency);
        this.$store.dispatch("wishlists", this.wishlists);
        this.$store.dispatch("getUserWishlists", this.user_wishlists);
        this.$store.dispatch("carts", this.carts);
        this.$store.dispatch("categories", this.categories);
        this.$store.dispatch("sliders", this.sliders);
        this.$store.dispatch("services", this.services);
        this.$store.dispatch("settings", this.settings_data);
        this.$store.dispatch("pages", this.pages);
        this.$store.dispatch("compareList", this.compare_list);
        this.$store.dispatch("defaultCurrency", this.default_currency);
        this.$store.dispatch("homeComponents", this.home_components);
        this.$store.dispatch("defaultAssets", this.default_assets);
        this.$store.commit("setSliderBanner", this.banners);
        this.$store.commit("getAddons", this.add_ons);
        for (let i = 0; i < this.shop_follower.length; i++) {
            this.$store.commit("getShopFollower", this.shop_follower[i]);
        }
        if (this.settings?.demo_mode) {
            this.colorChanger();
        }
    },
    created() {
        this.$progress.start();

        this.$router.beforeEach((to, from, next) => {
            this.$progress.start();
            next();
        });

        this.$router.afterEach((to, from) => {
            this.$progress.finish();
        });

        if (this.settings?.pushar_activated) {
            this.listenForChanges();
        }
    },

    methods: {
        showModal() {
            
        },
        removeModal() {
            
        },
        listenForChanges() {
            
        },
        colorChanger() {
            
        },

        viewedProducts() {
          
        },
        changeCurrency(currency) {
        },
    },
};
</script>